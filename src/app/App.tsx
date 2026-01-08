import { BrowserRouter } from 'react-router-dom'

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-bg text-text">
        <main>
          <h1 className="text-4xl font-bold text-center p-8">Belton IT Nexus</h1>
          <p className="text-center text-text-secondary">Vite + React + TypeScript</p>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
