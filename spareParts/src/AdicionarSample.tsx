import React, { useState } from "react";

interface Sample {
  id: number;
  utilidade: string;
  modelo: string;
  imei: string;
  plm: string;
}

function AdicionarSample() {
  const [utilidade, setUtilidade] = useState("DMF"); // padrão para DMF
  const [modelo, setModelo] = useState("");
  const [imei, setImei] = useState("");
  const [plm, setPlm] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (imei.length !== 15) {
      alert("IMEI deve ter exatamente 15 caracteres.");
      return;
    }

    if (plm.length !== 15) {
      alert("PLM deve ter exatamente 15 caracteres.");
      return;
    }

    if (!modelo.trim()) {
      alert("Preencha todos os campos.");
      return;
    }

    // Pega lista atual do localStorage
    const dados = localStorage.getItem("samples");
    const samples: Sample[] = dados ? JSON.parse(dados) : [];

    // Verifica duplicidade de IMEI ou PLM
    const imeiDuplicado = samples.some(sample => sample.imei === imei);
    if (imeiDuplicado) {
      alert("Já existe um sample com esse IMEI cadastrado.");
      return;
    }

    const plmDuplicado = samples.some(sample => sample.plm === plm);
    if (plmDuplicado) {
      alert("Já existe um sample com esse PLM cadastrado.");
      return;
    }

    // Gera id único simples
    const novoId = samples.length > 0 ? samples[samples.length - 1].id + 1 : 1;

    const novoSample: Sample = {
      id: novoId,
      utilidade,
      modelo,
      imei,
      plm,
    };

    samples.push(novoSample);
    localStorage.setItem("samples", JSON.stringify(samples));

    alert("Sample adicionado com sucesso!");

    setUtilidade("DMF");
    setModelo("");
    setImei("");
    setPlm("");
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif", maxWidth: 500 }}>
      <h1>Adicionar Sample</h1>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label>Utilidade:</label>
          <select
            value={utilidade}
            onChange={(e) => setUtilidade(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          >
            <option value="DMF">DMF</option>
            <option value="MFM">MFM</option>
            <option value="Padrão">Padrão</option>
          </select>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Modelo:</label>
          <input
            type="text"
            value={modelo}
            onChange={(e) => setModelo(e.target.value)}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>IMEI (15 caracteres):</label>
          <input
            type="text"
            value={imei}
            onChange={(e) => setImei(e.target.value)}
            maxLength={15}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>PLM (15 caracteres):</label>
          <input
            type="text"
            value={plm}
            onChange={(e) => setPlm(e.target.value)}
            maxLength={15}
            required
            style={{ width: "100%", padding: "8px" }}
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
          Adicionar Sample
        </button>
      </form>
    </div>
  );
}

export default AdicionarSample;
