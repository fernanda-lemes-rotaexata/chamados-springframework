export type StatusChamado = 'ABERTO' | 'EM_ATENDIMENTO' | 'AGUARDANDO_CLIENTE' | 'FECHADO'
export type Prioridade = 'BAIXA' | 'MEDIA' | 'ALTA' | 'CRITICA'
export type Perfil = 'ADMIN' | 'TECNICO'

export const STATUS: StatusChamado[] = ['ABERTO', 'EM_ATENDIMENTO', 'AGUARDANDO_CLIENTE', 'FECHADO']
export const PRIORIDADES: Prioridade[] = ['BAIXA', 'MEDIA', 'ALTA', 'CRITICA']
export const PERFIS: Perfil[] = ['ADMIN', 'TECNICO']

export interface Cliente {
  id: number
  nome: string
  email: string
  telefone: string
}

export interface Categoria {
  id: number
  nome: string
  descricao: string
}

export interface Tecnico {
  id: number
  nome: string
  email: string
  perfil: Perfil
}

export interface Comentario {
  id: number
  texto: string
  data: string
  autor: string
}

export interface Chamado {
  id: number
  titulo: string
  descricao: string
  dataAbertura: string
  dataFechamento: string | null
  prioridade: Prioridade
  status: StatusChamado
  clienteId: number
  categoriaId: number
  tecnicoId: number | null
  comentarios: Comentario[]
}

export interface Pagina<T> {
  content: T[]
}

async function requisicao<T>(caminho: string, metodo = 'GET', corpo?: unknown): Promise<T> {
  const resposta = await fetch('/api' + caminho, {
    method: metodo,
    headers: corpo === undefined ? {} : { 'Content-Type': 'application/json' },
    body: corpo === undefined ? undefined : JSON.stringify(corpo),
  })
  if (!resposta.ok) {
    const erro = await resposta.json().catch(() => null)
    const detalhes = erro?.detalhes?.length ? ': ' + erro.detalhes.join(', ') : ''
    throw new Error((erro?.erro ?? 'Erro ' + resposta.status) + detalhes)
  }
  if (resposta.status === 204) return undefined as T
  return resposta.json()
}

export const api = {
  listarClientes: () => requisicao<Cliente[]>('/clientes'),
  buscarCliente: (id: number) => requisicao<Cliente>('/clientes/' + id),
  salvarCliente: (dados: Omit<Cliente, 'id'>, id?: number) =>
    id ? requisicao<Cliente>('/clientes/' + id, 'PUT', dados) : requisicao<Cliente>('/clientes', 'POST', dados),
  chamadosDoCliente: (id: number) => requisicao<Pagina<Chamado>>('/clientes/' + id + '/chamados'),

  listarCategorias: () => requisicao<Categoria[]>('/categorias'),
  criarCategoria: (dados: Omit<Categoria, 'id'>) => requisicao<Categoria>('/categorias', 'POST', dados),

  listarTecnicos: () => requisicao<Tecnico[]>('/tecnicos'),
  criarTecnico: (dados: Omit<Tecnico, 'id'>) => requisicao<Tecnico>('/tecnicos', 'POST', dados),

  listarChamados: (filtros: { status?: string; prioridade?: string; clienteId?: string }) => {
    const params = new URLSearchParams({ size: '100' })
    Object.entries(filtros).forEach(([chave, valor]) => {
      if (valor) params.set(chave, valor)
    })
    return requisicao<Pagina<Chamado>>('/chamados?' + params.toString())
  },
  buscarChamado: (id: number) => requisicao<Chamado>('/chamados/' + id),
  criarChamado: (dados: {
    titulo: string
    descricao: string
    prioridade: Prioridade
    clienteId: number
    categoriaId: number
    tecnicoId: number | null
  }) => requisicao<Chamado>('/chamados', 'POST', dados),
  alterarStatus: (id: number, status: StatusChamado) =>
    requisicao<Chamado>('/chamados/' + id + '/status', 'PATCH', { status }),
  atribuirTecnico: (id: number, tecnicoId: number) =>
    requisicao<Chamado>('/chamados/' + id + '/atribuir', 'PATCH', { tecnicoId }),
  comentar: (id: number, texto: string, autor: string) =>
    requisicao<Comentario>('/chamados/' + id + '/comentarios', 'POST', { texto, autor }),
}
