import React, { useEffect, useState } from "react";

interface RegistroSaida {
  nomeColaborador: string;
  sample: string;
  tipoMovimentacao: "entrada" | "saida";
  dataHora: string;
}

function Database() {
  const [registros, setRegistros] = useState<RegistroSaida[]>([]);

  useEffect(() => {
    const data = localStorage.getItem("saidaSamples");
    if (data) {
      setRegistros(JSON.parse(data));
    }
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Histórico de Saídas</h1>

      {registros.length === 0 ? (
        <p>Nenhum registro encontrado.</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px",
          }}
        >
          <thead>
            <tr>
              <th style={thStyle}>Colaborador</th>
              <th style={thStyle}>Sample</th>
              <th style={thStyle}>Data/Hora</th>
            </tr>
          </thead>
          <tbody>
            {registros.map((registro, index) => (
              <tr key={index}>
                <td style={tdStyle}>{registro.nomeColaborador}</td>
                <td style={tdStyle}>{registro.sample}</td>
                <td style={tdStyle}>
                  {new Date(registro.dataHora).toLocaleString("pt-BR")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const thStyle: React.CSSProperties = {
  borderBottom: "2px solid #ccc",
  padding: "10px",
  textAlign: "left",
  backgroundColor: "#f0f0f0",
};

const tdStyle: React.CSSProperties = {
  padding: "10px",
  borderBottom: "1px solid #ddd",
};

export default Database;
