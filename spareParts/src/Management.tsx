import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Management() {
  const navigate = useNavigate();

  const [tipoMovimentacao, setTipoMovimentacao] = useState<"entrada" | "saida">("entrada");
  const [nomeColaborador, setNomeColaborador] = useState<string>("");
  const [sample, setSample] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const registro = {
      nomeColaborador,
      sample,
      tipoMovimentacao,
      dataHora: new Date().toISOString(),
    };

    const existingData = localStorage.getItem("saidaSamples");
    const parsedData = existingData ? JSON.parse(existingData) : [];

    if (tipoMovimentacao === "saida") {
      // Verifica se colaborador já tem um sample em aberto
      const jaTemSaida = parsedData.some(
        (item: any) =>
          item.nomeColaborador.toLowerCase() === nomeColaborador.toLowerCase()
      );

      if (jaTemSaida) {
        alert(`⚠️ ${nomeColaborador} já possui um sample em aberto. Devolva antes de registrar nova saída.`);
        return;
      }

      // Adiciona novo registro
      parsedData.push(registro);
      localStorage.setItem("saidaSamples", JSON.stringify(parsedData));

      navigate("/database", { state: registro });
    } else {
      // Entrada: remove o registro correspondente (se existir)
      const updatedData = parsedData.filter(
        (item: any) =>
          !(
            item.nomeColaborador.toLowerCase() === nomeColaborador.toLowerCase() &&
            item.sample.toLowerCase() === sample.toLowerCase()
          )
      );

      localStorage.setItem("saidaSamples", JSON.stringify(updatedData));

      alert(`Sample "${sample}" devolvido por ${nomeColaborador}.`);
    }

    // Limpa os campos
    setNomeColaborador("");
    setSample("");
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Spare Parts Management</h1>

      <div
        style={{
          marginTop: "40px",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          maxWidth: "400px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>Entrada/Saída de Samples</h2>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>
              Tipo de movimentação:
            </label>
            <select
              value={tipoMovimentacao}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setTipoMovimentacao(e.target.value as "entrada" | "saida")
              }
              style={{ width: "100%", padding: "8px" }}
            >
              <option value="entrada">Input</option>
              <option value="saida">Output</option>
            </select>
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>
              Nome do Colaborador:
            </label>
            <input
              type="text"
              value={nomeColaborador}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNomeColaborador(e.target.value)
              }
              placeholder="Ex: Luiz Francisco"
              style={{ width: "100%", padding: "8px" }}
              required
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>
              Sample:
            </label>
            <input
              type="text"
              value={sample}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSample(e.target.value)
              }
              placeholder="Ex: XXXXXXX"
              style={{ width: "100%", padding: "8px" }}
              required
            />
          </div>

          <button
            type="submit"
            style={{
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              width: "100%",
            }}
          >
            Registrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Management;
