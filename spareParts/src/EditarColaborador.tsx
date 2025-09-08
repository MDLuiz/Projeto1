import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface Colaborador {
  id: number;
  nome: string;
  matricula: string;
  setor?: string;
}

function EditarColaborador() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [colaborador, setColaborador] = useState<Colaborador | null>(null);

  useEffect(() => {
    const dados = localStorage.getItem("colaboradores");
    if (dados) {
      const lista: Colaborador[] = JSON.parse(dados);
      const encontrado = lista.find((c) => c.id === Number(id));
      if (encontrado) {
        setColaborador(encontrado);
      } else {
        alert("Colaborador não encontrado.");
        navigate("/listar-colaboradores");
      }
    }
  }, [id, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!colaborador) return;

    if (!colaborador.nome.trim() || !colaborador.matricula.trim()) {
      alert("Nome e matrícula são obrigatórios.");
      return;
    }

    if (colaborador.matricula.length > 8) {
      alert("A matrícula deve ter no máximo 8 caracteres.");
      return;
    }

    const dados = localStorage.getItem("colaboradores");
    if (dados) {
      let lista: Colaborador[] = JSON.parse(dados);

      // Verificar se existe outra matrícula igual
      const existeMatriculaDuplicada = lista.some(
        (c) =>
          c.id !== colaborador.id &&
          c.matricula.trim().toLowerCase() === colaborador.matricula.trim().toLowerCase()
      );

      if (existeMatriculaDuplicada) {
        alert("Já existe outro colaborador com essa matrícula.");
        return;
      }

      // Atualiza o colaborador
      lista = lista.map((c) => (c.id === colaborador.id ? colaborador : c));
      localStorage.setItem("colaboradores", JSON.stringify(lista));
      alert("Colaborador atualizado com sucesso!");
      navigate("/listar-colaboradores");
    }
  };

  if (!colaborador) return <p>Carregando colaborador...</p>;

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif", maxWidth: "500px" }}>
      <h1>Editar Colaborador</h1>

      <form onSubmit={handleSubmit}>
        {/* Nome */}
        <div style={{ marginBottom: "15px" }}>
          <label>Nome:</label>
          <input
            type="text"
            value={colaborador.nome}
            onChange={(e) => setColaborador({ ...colaborador, nome: e.target.value })}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        {/* Matrícula */}
        <div style={{ marginBottom: "15px" }}>
          <label>Matrícula (máx. 8 caracteres):</label>
          <input
            type="text"
            value={colaborador.matricula}
            onChange={(e) => {
              if (e.target.value.length <= 8) {
                setColaborador({ ...colaborador, matricula: e.target.value });
              }
            }}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        {/* Setor */}
        <div style={{ marginBottom: "15px" }}>
          <label>Setor:</label>
          <input
            type="text"
            value={colaborador.setor || ""}
            onChange={(e) => setColaborador({ ...colaborador, setor: e.target.value })}
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
          }}
        >
          Salvar Alterações
        </button>
      </form>
    </div>
  );
}

export default EditarColaborador;
