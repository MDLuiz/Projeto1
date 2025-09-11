import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const dadosSalvos = localStorage.getItem("usuarioCadastrado");

    if (!dadosSalvos) {
      alert("Nenhum usuário cadastrado. Cadastre-se primeiro!");
      return;
    }

    const { usuario: usuarioSalvo, senha: senhaSalva } = JSON.parse(dadosSalvos);

    if (usuario === usuarioSalvo && senha === senhaSalva) {
      localStorage.setItem("usuarioLogado", usuario); // Marca como logado
      navigate("/home"); // Redireciona para Home
    } else {
      alert("Usuário ou senha incorretos!");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "100px auto", fontFamily: "Arial, sans-serif" }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 15 }}>
          <label>Usuário:</label>
          <input
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
            style={{ width: "100%", padding: 8 }}
          />
        </div>
        <div style={{ marginBottom: 15 }}>
          <label>Senha:</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            style={{ width: "100%", padding: 8 }}
          />
        </div>
        <button
          type="submit"
          style={{
            width: "100%",
            padding: 10,
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          Entrar
        </button>
      </form>

      <p style={{ marginTop: 10 }}>
        Ainda não tem conta? <Link to="/cadastro">Cadastre-se</Link>
      </p>
    </div>
  );
}

export default Login;
