import { useEffect, useState } from 'react'
import { api, type Cliente } from '../api'
import type { Navegar } from '../App'

export default function Clientes({ navegar }: { navegar: Navegar }) {
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [erro, setErro] = useState('')

  useEffect(() => {
    api.listarClientes().then(setClientes).catch((e) => setErro(e.message))
  }, [])

  return (
    <section>
      <h1>Clientes</h1>
      <button onClick={() => navegar({ nome: 'clienteForm' })}>Novo cliente</button>
      {erro && <p className="erro">{erro}</p>}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Telefone</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.nome}</td>
              <td>{c.email}</td>
              <td>{c.telefone}</td>
              <td>
                <button onClick={() => navegar({ nome: 'clienteDetalhe', id: c.id })}>Detalhe</button>
                <button onClick={() => navegar({ nome: 'clienteForm', id: c.id })}>Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
