import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Cadastro() {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [chaveSecreta, setChaveSecreta] = useState("");

  const navigate = useNavigate();

  const CHAVE_SECRETA_CORRETA = "SPSEDA123"; // ← só o desenvolvedor deve saber

  const handleCadastro = (e: React.FormEvent) => {
    e.preventDefault();

    if (!usuario || !senha || !confirmarSenha || !chaveSecreta) {
      alert("Preencha todos os campos!");
      return;
    }

    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    if (chaveSecreta !== CHAVE_SECRETA_CORRETA) {
      alert("Chave secreta incorreta! Cadastro não autorizado.");
      return;
    }

    const novoUsuario = { usuario, senha };
    localStorage.setItem("usuarioCadastrado", JSON.stringify(novoUsuario));

    alert("Usuário cadastrado com sucesso!");
    navigate("/login");
  };

  return (
    <div style={{ maxWidth: 400, margin: "100px auto", fontFamily: "Arial, sans-serif" }}>
      <h2>Cadastro</h2>
      <form onSubmit={handleCadastro}>
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

        <div style={{ marginBottom: 15 }}>
          <label>Confirmar Senha:</label>
          <input
            type="password"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            required
            style={{ width: "100%", padding: 8 }}
          />
        </div>

        <div style={{ marginBottom: 15 }}>
          <label>Chave secreta:</label>
          <input
            type="password"
            value={chaveSecreta}
            onChange={(e) => setChaveSecreta(e.target.value)}
            required
            style={{ width: "100%", padding: 8 }}
          />
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: 10,
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          Cadastrar
        </button>
      </form>

      <p style={{ marginTop: 10 }}>
        Já tem uma conta? <Link to="/login">Fazer login</Link>
      </p>
    </div>
  );
}

export default Cadastro;
