import { Routes, Route, Link, Navigate, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import Home from "./home";
import Management from "./Management";
import Database from "./database";
import AdicionarColaborador from "./adicionarColaborador";
import ListarColaboradores from "./ListarColaboradores";
import EditarColaborador from "./EditarColaborador";
import AdicionarSample from "./AdicionarSample";
import ListarSamples from "./ListarSamples";
import Login from "./login";
import Cadastro from "./Cadastro";
import PrivateRoute from "./components/PrivateRouter";
import './App.css';

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [usuarioLogado, setUsuarioLogado] = useState<string | null>(null);

  // Atualiza usuário ao trocar de rota ou recarregar
  useEffect(() => {
    const usuario = localStorage.getItem("usuarioLogado");
    setUsuarioLogado(usuario);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("usuarioLogado");
    setUsuarioLogado(null);
    navigate("/login");
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/home">SP-SEDA(AM)</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup"
            aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav me-auto">
              <Link className="nav-link" to="/home">Home</Link>
              <Link className="nav-link" to="/Management">Management</Link>
              <Link className="nav-link" to="/database">Database</Link>
            </div>

            <div className="d-flex align-items-center gap-3">
              {usuarioLogado ? (
                <>
                  <span className="nav-link disabled" style={{ fontWeight: 'bold' }}>
                    👤 {usuarioLogado}
                  </span>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={handleLogout}
                  >
                    Sair
                  </button>
                </>
              ) : (
                <Link className="btn btn-outline-primary btn-sm" to="/cadastro">
                  📝 Sign up
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Área de rotas */}
      <div className="container mt-5 pt-5">
        <Routes>
          {/* Redirecionamento padrão */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />

          {/* Rotas protegidas */}
          <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/Management" element={<PrivateRoute><Management /></PrivateRoute>} />
          <Route path="/database" element={<PrivateRoute><Database /></PrivateRoute>} />
          <Route path="/adicionarColaborador" element={<PrivateRoute><AdicionarColaborador /></PrivateRoute>} />
          <Route path="/listar-colaboradores" element={<PrivateRoute><ListarColaboradores /></PrivateRoute>} />
          <Route path="/editar-colaborador/:id" element={<PrivateRoute><EditarColaborador /></PrivateRoute>} />
          <Route path="/AdicionarSample" element={<PrivateRoute><AdicionarSample /></PrivateRoute>} />
          <Route path="/ListarSamples" element={<PrivateRoute><ListarSamples /></PrivateRoute>} />

          {/* Rota fallback */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
