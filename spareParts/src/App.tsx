import { Routes, Route, Link } from "react-router-dom";
import Home from "./home";
import Management from "./Management";
import Database from "./database";
import Adicionar from "./adicionar";
import AdicionarColaborador from "./adicionarColaborador";
import ListarColaboradores from "./ListarColaboradores";
import EditarColaborador from "./EditarColaborador";
import AdicionarSample from "./AdicionarSample";
import ListarSamples from "./ListarSamples";
import './App.css';

function App() {
  return (
    <>
      {/* Navbar Bootstrap */}
      <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">SP-SEDA(AM)</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" 
                  data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" 
                  aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link className="nav-link active" to="/">Home</Link>
              <Link className="nav-link" to="/Management">Management</Link>
              <Link className="nav-link" to="/database">Database</Link>
              <span className="nav-link disabled">Disabled</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Área de rotas */}
      <div className="container mt-5 pt-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Management" element={<Management />} />
          <Route path="/database" element={<Database />} />
          <Route path="/adicionar" element={<Adicionar />} />
          <Route path="/adicionarColaborador" element={<AdicionarColaborador />} />
          <Route path="/listar-colaboradores" element={<ListarColaboradores />} />
          <Route path="/editar-colaborador/:id" element={<EditarColaborador />} />
          <Route path="/AdicionarSample" element={<AdicionarSample />} />
          <Route path="/ListarSamples" element={<ListarSamples />} />
        </Routes>
      </div>
    </>
  )
}

export default App;
