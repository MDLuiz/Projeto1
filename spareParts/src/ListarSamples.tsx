import React, { useEffect, useState } from "react";

interface Sample {
  id: number;
  utilidade: string;
  modelo: string;
  imei: string;
  plm: string;
}

function ListaSamples() {
  const [samples, setSamples] = useState<Sample[]>([]);
  const [filtro, setFiltro] = useState("");

  useEffect(() => {
    const dados = localStorage.getItem("samples");
    const lista: Sample[] = dados ? JSON.parse(dados) : [];
    setSamples(lista);
  }, []);

  const excluirSample = (id: number) => {
    if (window.confirm("Confirma a exclusão deste sample?")) {
      const novaLista = samples.filter((sample) => sample.id !== id);
      setSamples(novaLista);
      localStorage.setItem("samples", JSON.stringify(novaLista));
    }
  };

  // Filtra pelo modelo (case insensitive)
  const samplesFiltrados = samples.filter((sample) =>
    sample.modelo.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif", maxWidth: 900 }}>
      <h1>Lista de Samples</h1>

      <div style={{ marginBottom: "15px" }}>
        <input
          type="text"
          placeholder="Filtrar por modelo..."
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          style={{ width: "100%", padding: "8px" }}
        />
      </div>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          textAlign: "left",
        }}
      >
        <thead>
          <tr>
            <th style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>Utilidade</th>
            <th style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>Modelo</th>
            <th style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>IMEI</th>
            <th style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>PLM</th>
            <th style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {samplesFiltrados.length === 0 && (
            <tr>
              <td colSpan={5} style={{ padding: "8px", textAlign: "center" }}>
                Nenhum sample encontrado.
              </td>
            </tr>
          )}
          {samplesFiltrados.map((sample) => (
            <tr key={sample.id}>
              <td style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>
                {sample.utilidade}
              </td>
              <td style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>{sample.modelo}</td>
              <td style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>{sample.imei}</td>
              <td style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>{sample.plm}</td>
              <td style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>
                <button
                  onClick={() => excluirSample(sample.id)}
                  style={{
                    padding: "5px 10px",
                    backgroundColor: "#dc3545",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Excluir
                </button>
                {/* Botão de editar pode vir aqui */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListaSamples;
