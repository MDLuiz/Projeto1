import React, { useState } from "react";

interface Colaborador {
  id: number;
  nome: string;
  matricula: string;
  setor?: string;
}

function AdicionarColaborador() {
  const [nome, setNome] = useState("");
  const [matricula, setMatricula] = useState("");
  const [setor, setSetor] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nome.trim() || !matricula.trim()) {
      alert("Por favor, preencha o nome e a matrícula.");
      return;
    }

    if (matricula.length > 8) {
      alert("A matrícula deve ter no máximo 8 caracteres.");
      return;
    }

    const novoColaborador: Colaborador = {
      id: Date.now(),
      nome: nome.trim(),
      matricula: matricula.trim(),
      setor: setor.trim(),
    };

    const dadosSalvos = localStorage.getItem("colaboradores");
    const colaboradoresExistentes: Colaborador[] = dadosSalvos
      ? JSON.parse(dadosSalvos)
      : [];

    const matriculaExiste = colaboradoresExistentes.some(
      (c) => c.matricula === novoColaborador.matricula
    );

    if (matriculaExiste) {
      alert("Já existe um colaborador com essa matrícula.");
      return;
    }

    colaboradoresExistentes.push(novoColaborador);
    localStorage.setItem("colaboradores", JSON.stringify(colaboradoresExistentes));

    alert(`Colaborador "${nome}" cadastrado com sucesso!`);

    // Limpar campos
    setNome("");
    setMatricula("");
    setSetor("");
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Adicionar Colaborador</h1>

      <form onSubmit={handleSubmit} style={{ maxWidth: "400px" }}>
        {/* Nome */}
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Nome:</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Ex: Luiz Francisco"
            style={{ width: "100%", padding: "8px" }}
            required
          />
        </div>

        {/* Matrícula */}
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Matrícula (máx. 8 caracteres):</label>
          <input
            type="text"
            value={matricula}
            onChange={(e) => {
              if (e.target.value.length <= 8) {
                setMatricula(e.target.value);
              }
            }}
            placeholder="Ex: 12345678"
            style={{ width: "100%", padding: "8px" }}
            required
          />
        </div>

        {/* Setor */}
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Setor:</label>
          <input
            type="text"
            value={setor}
            onChange={(e) => setSetor(e.target.value)}
            placeholder="Ex: Logística"
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        {/* Botão */}
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            width: "100%",
          }}
        >
          Salvar Colaborador
        </button>
      </form>
    </div>
  );
}

export default AdicionarColaborador;
