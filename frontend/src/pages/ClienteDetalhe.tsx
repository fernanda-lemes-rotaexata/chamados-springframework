import { useEffect, useState } from 'react'
import { api, type Chamado, type Cliente } from '../api'
import type { Navegar } from '../App'

export default function ClienteDetalhe({ id, navegar }: { id: number; navegar: Navegar }) {
  const [cliente, setCliente] = useState<Cliente | null>(null)
  const [chamados, setChamados] = useState<Chamado[]>([])
  const [erro, setErro] = useState('')

  useEffect(() => {
    api.buscarCliente(id).then(setCliente).catch((e) => setErro(e.message))
    api.chamadosDoCliente(id).then((pagina) => setChamados(pagina.content)).catch((e) => setErro(e.message))
  }, [id])

  return (
    <section>
      <h1>Detalhe do cliente</h1>
      {erro && <p className="erro">{erro}</p>}
      {cliente && (
        <p>
          <strong>{cliente.nome}</strong> — {cliente.email} — {cliente.telefone}
        </p>
      )}

      <h2>Chamados do cliente</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Status</th>
            <th>Prioridade</th>
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
