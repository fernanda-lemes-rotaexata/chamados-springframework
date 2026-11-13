import { useEffect, useState, type FormEvent } from 'react'
import { api, PRIORIDADES, type Categoria, type Cliente, type Prioridade, type Tecnico } from '../api'
import type { Navegar } from '../App'

export default function ChamadoForm({ navegar }: { navegar: Navegar }) {
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [tecnicos, setTecnicos] = useState<Tecnico[]>([])
  const [titulo, setTitulo] = useState('')
  const [descricao, setDescricao] = useState('')
  const [prioridade, setPrioridade] = useState<Prioridade>('MEDIA')
  const [clienteId, setClienteId] = useState('')
  const [categoriaId, setCategoriaId] = useState('')
  const [tecnicoId, setTecnicoId] = useState('')
  const [erro, setErro] = useState('')

  useEffect(() => {
    api.listarClientes().then(setClientes).catch((e) => setErro(e.message))
    api.listarCategorias().then(setCategorias).catch((e) => setErro(e.message))
    api.listarTecnicos().then(setTecnicos).catch((e) => setErro(e.message))
  }, [])

  function salvar(evento: FormEvent) {
    evento.preventDefault()
    api.criarChamado({
      titulo,
      descricao,
      prioridade,
      clienteId: Number(clienteId),
      categoriaId: Number(categoriaId),
      tecnicoId: tecnicoId ? Number(tecnicoId) : null,
    })
      .then((criado) => navegar({ nome: 'chamadoDetalhe', id: criado.id }))
      .catch((e) => setErro(e.message))
  }

  return (
    <section>
      <h1>Novo chamado</h1>
      {erro && <p className="erro">{erro}</p>}
      <form onSubmit={salvar}>
        <label>Título <input value={titulo} onChange={(e) => setTitulo(e.target.value)} /></label>
        <label>Descrição <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} /></label>
        <label>
          Prioridade
          <select value={prioridade} onChange={(e) => setPrioridade(e.target.value as Prioridade)}>
            {PRIORIDADES.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </label>
        <label>
          Cliente
          <select value={clienteId} onChange={(e) => setClienteId(e.target.value)}>
            <option value="">Selecione</option>
            {clientes.map((c) => <option key={c.id} value={c.id}>{c.nome}</option>)}
          </select>
        </label>
        <label>
          Categoria
          <select value={categoriaId} onChange={(e) => setCategoriaId(e.target.value)}>
            <option value="">Selecione</option>
            {categorias.map((c) => <option key={c.id} value={c.id}>{c.nome}</option>)}
          </select>
        </label>
        <label>
          Técnico
          <select value={tecnicoId} onChange={(e) => setTecnicoId(e.target.value)}>
            <option value="">Nenhum</option>
            {tecnicos.map((t) => <option key={t.id} value={t.id}>{t.nome}</option>)}
          </select>
        </label>
        <button type="submit">Salvar</button>
        <button type="button" onClick={() => navegar({ nome: 'chamados' })}>Cancelar</button>
      </form>
    </section>
  )
}
