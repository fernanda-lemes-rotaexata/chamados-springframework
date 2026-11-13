import { useEffect, useState } from 'react'
import { api, PRIORIDADES, STATUS, type Chamado } from '../api'

export default function Dashboard() {
  const [chamados, setChamados] = useState<Chamado[]>([])
  const [erro, setErro] = useState('')

  useEffect(() => {
    api.listarChamados({})
      .then((pagina) => setChamados(pagina.content))
      .catch((e) => setErro(e.message))
  }, [])

  return (
    <section>
      <h1>Dashboard</h1>
      {erro && <p className="erro">{erro}</p>}
      <p>Total de chamados: {chamados.length}</p>

      <h2>Por status</h2>
      <table>
        <tbody>
          {STATUS.map((s) => (
            <tr key={s}>
              <td>{s}</td>
              <td>{chamados.filter((c) => c.status === s).length}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Por prioridade</h2>
      <table>
        <tbody>
          {PRIORIDADES.map((p) => (
            <tr key={p}>
              <td>{p}</td>
              <td>{chamados.filter((c) => c.prioridade === p).length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
