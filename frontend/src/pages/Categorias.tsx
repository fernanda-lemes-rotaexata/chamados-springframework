import { useEffect, useState, type FormEvent } from 'react'
import { api, type Categoria } from '../api'

export default function Categorias() {
  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [nome, setNome] = useState('')
  const [descricao, setDescricao] = useState('')
  const [erro, setErro] = useState('')

  function carregar() {
    api.listarCategorias().then(setCategorias).catch((e) => setErro(e.message))
  }

  useEffect(carregar, [])

  function cadastrar(evento: FormEvent) {
    evento.preventDefault()
    setErro('')
    api.criarCategoria({ nome, descricao })
      .then(() => {
        setNome('')
        setDescricao('')
        carregar()
      })
      .catch((e) => setErro(e.message))
  }

  return (
    <section>
      <h1>Categorias</h1>
      {erro && <p className="erro">{erro}</p>}
      <form onSubmit={cadastrar}>
        <label>Nome <input value={nome} onChange={(e) => setNome(e.target.value)} /></label>
        <label>Descrição <input value={descricao} onChange={(e) => setDescricao(e.target.value)} /></label>
        <button type="submit">Cadastrar</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Descrição</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.nome}</td>
              <td>{c.descricao}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
