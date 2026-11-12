import { useEffect, useState, type FormEvent } from 'react'
import { api } from '../api'
import type { Navegar } from '../App'

export default function ClienteForm({ id, navegar }: { id?: number; navegar: Navegar }) {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [telefone, setTelefone] = useState('')
  const [erro, setErro] = useState('')

  useEffect(() => {
    if (id) {
      api.buscarCliente(id)
        .then((c) => {
          setNome(c.nome)
          setEmail(c.email)
          setTelefone(c.telefone ?? '')
        })
        .catch((e) => setErro(e.message))
    }
  }, [id])

  function salvar(evento: FormEvent) {
    evento.preventDefault()
    api.salvarCliente({ nome, email, telefone }, id)
      .then(() => navegar({ nome: 'clientes' }))
      .catch((e) => setErro(e.message))
  }

  return (
    <section>
      <h1>{id ? 'Editar cliente' : 'Novo cliente'}</h1>
      {erro && <p className="erro">{erro}</p>}
      <form onSubmit={salvar}>
        <label>Nome <input value={nome} onChange={(e) => setNome(e.target.value)} /></label>
        <label>E-mail <input value={email} onChange={(e) => setEmail(e.target.value)} /></label>
        <label>Telefone <input value={telefone} onChange={(e) => setTelefone(e.target.value)} /></label>
        <button type="submit">Salvar</button>
        <button type="button" onClick={() => navegar({ nome: 'clientes' })}>Cancelar</button>
      </form>
    </section>
  )
}
