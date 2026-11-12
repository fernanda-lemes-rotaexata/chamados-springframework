import { useEffect, useState, type FormEvent } from 'react'
import { api, PERFIS, type Perfil, type Tecnico } from '../api'

export default function Tecnicos() {
  const [tecnicos, setTecnicos] = useState<Tecnico[]>([])
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [perfil, setPerfil] = useState<Perfil>('TECNICO')
  const [erro, setErro] = useState('')

  function carregar() {
    api.listarTecnicos().then(setTecnicos).catch((e) => setErro(e.message))
  }

  useEffect(carregar, [])

  function cadastrar(evento: FormEvent) {
    evento.preventDefault()
    setErro('')
    api.criarTecnico({ nome, email, perfil })
      .then(() => {
        setNome('')
        setEmail('')
        carregar()
      })
      .catch((e) => setErro(e.message))
  }

  return (
    <section>
      <h1>Técnicos</h1>
      {erro && <p className="erro">{erro}</p>}
      <form onSubmit={cadastrar}>
        <label>Nome <input value={nome} onChange={(e) => setNome(e.target.value)} /></label>
        <label>E-mail <input value={email} onChange={(e) => setEmail(e.target.value)} /></label>
        <label>
          Perfil
          <select value={perfil} onChange={(e) => setPerfil(e.target.value as Perfil)}>
            {PERFIS.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </label>
        <button type="submit">Cadastrar</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Perfil</th>
          </tr>
        </thead>
        <tbody>
          {tecnicos.map((t) => (
            <tr key={t.id}>
              <td>{t.id}</td>
              <td>{t.nome}</td>
              <td>{t.email}</td>
              <td>{t.perfil}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
