import { Routes, Route, Link } from "react-router-dom";
import Home from "./home";
import Features from "./features";
import Pricing from "./pricing";
import './App.css';

function App() {
  return (
    <>
      {/* Navbar Bootstrap */}
      <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Navbar</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" 
                  data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" 
                  aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link className="nav-link active" to="/">Home</Link>
              <Link className="nav-link" to="/features">Features</Link>
              <Link className="nav-link" to="/pricing">Pricing</Link>
              <span className="nav-link disabled">Disabled</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Área de rotas */}
      <div className="container mt-5 pt-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<Features />} />
          <Route path="/pricing" element={<Pricing />} />
        </Routes>
      </div>
    </>
  )
}

export default App;
