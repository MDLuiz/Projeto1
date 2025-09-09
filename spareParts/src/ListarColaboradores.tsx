import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Colaborador {
  id: number;
  nome: string;
  matricula: string;
  setor?: string;
}

function ListarColaboradores() {
  const [colaboradores, setColaboradores] = useState<Colaborador[]>([]);
  const [filtro, setFiltro] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    carregarColaboradores();
  }, []);

  const carregarColaboradores = () => {
    const dados = localStorage.getItem("colaboradores");
    if (dados) {
      setColaboradores(JSON.parse(dados));
    }
  };

  const excluirColaborador = (id: number) => {
    const confirmar = window.confirm("Tem certeza que deseja excluir este colaborador?");
    if (!confirmar) return;

    const atualizados = colaboradores.filter((c) => c.id !== id);
    localStorage.setItem("colaboradores", JSON.stringify(atualizados));
    setColaboradores(atualizados);
  };

  const colaboradoresFiltrados = colaboradores.filter(
    (c) =>
      c.nome.toLowerCase().includes(filtro.toLowerCase()) ||
      c.matricula.includes(filtro)
  );

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Lista de Colaboradores</h1>

      <input
        type="text"
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
        placeholder="Buscar por nome ou matrícula"
        style={{
          padding: "8px",
          width: "100%",
          maxWidth: "400px",
          marginBottom: "20px",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      />

      {colaboradoresFiltrados.length === 0 ? (
        <p>Nenhum colaborador encontrado.</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "10px",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#f0f0f0" }}>
              <th style={th}>Nome</th>
              <th style={th}>Matrícula</th>
              <th style={th}>Setor</th>
              <th style={th}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {colaboradoresFiltrados.map((colaborador) => (
              <tr key={colaborador.id}>
                <td style={td}>{colaborador.nome}</td>
                <td style={td}>{colaborador.matricula}</td>
                <td style={td}>{colaborador.setor || "-"}</td>
                <td style={{ ...td, textAlign: "center" }}>
                  <button
                    onClick={() => navigate(`/editar-colaborador/${colaborador.id}`)}
                    style={btnEditar}
                  >
                    Editar
                  </button>{" "}
                  <button
                    onClick={() => excluirColaborador(colaborador.id)}
                    style={btnExcluir}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

// Estilos reutilizáveis
const th = { border: "1px solid #ddd", padding: "8px" };
const td = { border: "1px solid #ddd", padding: "8px" };
const btnExcluir = {
  backgroundColor: "#dc3545",
  color: "#fff",
  border: "none",
  padding: "6px 12px",
  borderRadius: "4px",
  cursor: "pointer",
};
const btnEditar = {
  backgroundColor: "#007bff",
  color: "#fff",
  border: "none",
  padding: "6px 12px",
  borderRadius: "4px",
  cursor: "pointer",
};

export default ListarColaboradores;
