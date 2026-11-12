import { useEffect, useState, type FormEvent } from 'react'
import { api, STATUS, type Chamado, type StatusChamado, type Tecnico } from '../api'

export default function ChamadoDetalhe({ id }: { id: number }) {
  const [chamado, setChamado] = useState<Chamado | null>(null)
  const [tecnicos, setTecnicos] = useState<Tecnico[]>([])
  const [novoStatus, setNovoStatus] = useState<StatusChamado>('EM_ATENDIMENTO')
  const [tecnicoId, setTecnicoId] = useState('')
  const [texto, setTexto] = useState('')
  const [autor, setAutor] = useState('')
  const [erro, setErro] = useState('')

  function carregar() {
    api.buscarChamado(id).then(setChamado).catch((e) => setErro(e.message))
  }

  useEffect(() => {
    carregar()
    api.listarTecnicos().then(setTecnicos).catch((e) => setErro(e.message))
  }, [id])

  function alterarStatus() {
    setErro('')
    api.alterarStatus(id, novoStatus).then(setChamado).catch((e) => setErro(e.message))
  }

  function atribuir() {
    setErro('')
    api.atribuirTecnico(id, Number(tecnicoId)).then(setChamado).catch((e) => setErro(e.message))
  }

  function comentar(evento: FormEvent) {
    evento.preventDefault()
    setErro('')
    api.comentar(id, texto, autor)
      .then(() => {
        setTexto('')
        carregar()
      })
      .catch((e) => setErro(e.message))
  }

  if (!chamado) return <section>{erro && <p className="erro">{erro}</p>}</section>

  const tecnico = tecnicos.find((t) => t.id === chamado.tecnicoId)

  return (
    <section>
      <h1>Chamado #{chamado.id} — {chamado.titulo}</h1>
      {erro && <p className="erro">{erro}</p>}
      <p>{chamado.descricao}</p>
      <p>Status: <strong>{chamado.status}</strong> | Prioridade: <strong>{chamado.prioridade}</strong></p>
      <p>Abertura: {new Date(chamado.dataAbertura).toLocaleString('pt-BR')}</p>
      {chamado.dataFechamento && <p>Fechamento: {new Date(chamado.dataFechamento).toLocaleString('pt-BR')}</p>}
      <p>Técnico: {tecnico ? tecnico.nome : 'não atribuído'}</p>

      <h2>Status</h2>
      <select value={novoStatus} onChange={(e) => setNovoStatus(e.target.value as StatusChamado)}>
        {STATUS.map((s) => <option key={s} value={s}>{s}</option>)}
      </select>
      <button onClick={alterarStatus}>Alterar status</button>

      <h2>Técnico</h2>
      <select value={tecnicoId} onChange={(e) => setTecnicoId(e.target.value)}>
        <option value="">Selecione</option>
        {tecnicos.map((t) => <option key={t.id} value={t.id}>{t.nome}</option>)}
      </select>
      <button onClick={atribuir} disabled={!tecnicoId}>Atribuir técnico</button>

      <h2>Comentários</h2>
      <ul>
        {chamado.comentarios.map((c) => (
          <li key={c.id}>
            <strong>{c.autor}</strong> ({new Date(c.data).toLocaleString('pt-BR')}): {c.texto}
          </li>
        ))}
      </ul>
      <form onSubmit={comentar}>
        <label>Autor <input value={autor} onChange={(e) => setAutor(e.target.value)} /></label>
        <label>Comentário <textarea value={texto} onChange={(e) => setTexto(e.target.value)} /></label>
        <button type="submit">Comentar</button>
      </form>
    </section>
  )
}
