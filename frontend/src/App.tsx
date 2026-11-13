import { useState } from 'react'
import Dashboard from './pages/Dashboard'
import Clientes from './pages/Clientes'
import ClienteForm from './pages/ClienteForm'
import ClienteDetalhe from './pages/ClienteDetalhe'
import Categorias from './pages/Categorias'
import Tecnicos from './pages/Tecnicos'
import Chamados from './pages/Chamados'
import ChamadoForm from './pages/ChamadoForm'
import ChamadoDetalhe from './pages/ChamadoDetalhe'

export type Tela =
  | { nome: 'dashboard' }
  | { nome: 'clientes' }
  | { nome: 'clienteForm'; id?: number }
  | { nome: 'clienteDetalhe'; id: number }
  | { nome: 'categorias' }
  | { nome: 'tecnicos' }
  | { nome: 'chamados' }
  | { nome: 'chamadoForm' }
  | { nome: 'chamadoDetalhe'; id: number }

export type Navegar = (tela: Tela) => void

export default function App() {
  const [tela, setTela] = useState<Tela>({ nome: 'dashboard' })

  return (
    <>
      <nav>
        <strong>Sistema de Chamados</strong>
        <button onClick={() => setTela({ nome: 'dashboard' })}>Dashboard</button>
        <button onClick={() => setTela({ nome: 'chamados' })}>Chamados</button>
        <button onClick={() => setTela({ nome: 'clientes' })}>Clientes</button>
        <button onClick={() => setTela({ nome: 'categorias' })}>Categorias</button>
        <button onClick={() => setTela({ nome: 'tecnicos' })}>Técnicos</button>
      </nav>
      <main>
        {tela.nome === 'dashboard' && <Dashboard />}
        {tela.nome === 'clientes' && <Clientes navegar={setTela} />}
        {tela.nome === 'clienteForm' && <ClienteForm id={tela.id} navegar={setTela} />}
        {tela.nome === 'clienteDetalhe' && <ClienteDetalhe id={tela.id} navegar={setTela} />}
        {tela.nome === 'categorias' && <Categorias />}
        {tela.nome === 'tecnicos' && <Tecnicos />}
        {tela.nome === 'chamados' && <Chamados navegar={setTela} />}
        {tela.nome === 'chamadoForm' && <ChamadoForm navegar={setTela} />}
        {tela.nome === 'chamadoDetalhe' && <ChamadoDetalhe id={tela.id} />}
      </main>
    </>
  )
}
