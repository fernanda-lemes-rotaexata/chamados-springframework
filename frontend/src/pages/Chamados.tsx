import { useEffect, useState } from 'react'
import { api, PRIORIDADES, STATUS, type Chamado, type Cliente } from '../api'
import type { Navegar } from '../App'

export default function Chamados({ navegar }: { navegar: Navegar }) {
  const [chamados, setChamados] = useState<Chamado[]>([])
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [status, setStatus] = useState('')
  const [prioridade, setPrioridade] = useState('')
  const [clienteId, setClienteId] = useState('')
  const [erro, setErro] = useState('')

  useEffect(() => {
    api.listarClientes().then(setClientes).catch((e) => setErro(e.message))
  }, [])

  useEffect(() => {
    api.listarChamados({ status, prioridade, clienteId })
      .then((pagina) => setChamados(pagina.content))
      .catch((e) => setErro(e.message))
  }, [status, prioridade, clienteId])

  return (
    <section>
      <h1>Chamados</h1>
      <button onClick={() => navegar({ nome: 'chamadoForm' })}>Novo chamado</button>
      {erro && <p className="erro">{erro}</p>}

      <div className="filtros">
        <label>
          Status
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">Todos</option>
            {STATUS.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </label>
        <label>
          Prioridade
          <select value={prioridade} onChange={(e) => setPrioridade(e.target.value)}>
            <option value="">Todas</option>
            {PRIORIDADES.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </label>
        <label>
          Cliente
          <select value={clienteId} onChange={(e) => setClienteId(e.target.value)}>
            <option value="">Todos</option>
            {clientes.map((c) => <option key={c.id} value={c.id}>{c.nome}</option>)}
          </select>
        </label>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Status</th>
            <th>Prioridade</th>
            <th>Abertura</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {chamados.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.titulo}</td>
              <td>{c.status}</td>
              <td>{c.prioridade}</td>
              <td>{new Date(c.dataAbertura).toLocaleString('pt-BR')}</td>
              <td>
                <button onClick={() => navegar({ nome: 'chamadoDetalhe', id: c.id })}>Abrir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
