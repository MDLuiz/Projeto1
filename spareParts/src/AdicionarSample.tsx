import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Sample {
  imei: string;
  plm: string;
  modelo: string;
  utilidade: string;
}

function AdicionarSample() {
  const navigate = useNavigate();

  const [imei, setImei] = useState("");
  const [plm, setPlm] = useState("");
  const [modelo, setModelo] = useState("");
  const [utilidade, setUtilidade] = useState("");
  const [erro, setErro] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const imeiTrimmed = imei.trim();
    const plmTrimmed = plm.trim();

    if (imeiTrimmed.length !== 15 || plmTrimmed.length !== 15) {
      setErro("IMEI e PLM devem ter exatamente 15 caracteres.");
      return;
    }

    if (!modelo.trim() || !utilidade) {
      setErro("Preencha todos os campos obrigatórios.");
      return;
    }

    if (imeiTrimmed === plmTrimmed) {
      setErro("IMEI e PLM não podem ser iguais.");
      return;
    }

    const samples: Sample[] = JSON.parse(localStorage.getItem("samples") || "[]");

    const imeiExistente = samples.some(s => s.imei === imeiTrimmed || s.plm === imeiTrimmed);
    const plmExistente = samples.some(s => s.imei === plmTrimmed || s.plm === plmTrimmed);

    if (imeiExistente || plmExistente) {
      setErro("IMEI ou PLM já cadastrado.");
      return;
    }

    const novoSample: Sample = {
      imei: imeiTrimmed,
      plm: plmTrimmed,
      modelo: modelo.trim(),
      utilidade,
    };

    samples.push(novoSample);
    localStorage.setItem("samples", JSON.stringify(samples));

    alert("Sample cadastrado com sucesso!");
    navigate("/"); // ajuste conforme sua rota
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
      <h2>Adicionar Sample</h2>

      <form onSubmit={handleSubmit}>
        {erro && (
          <div style={{ color: "red", marginBottom: "10px" }}>{erro}</div>
        )}

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
          <label>Utilidade:</label>
          <select
            value={utilidade}
            onChange={(e) => setUtilidade(e.target.value)}
            required
            style={{ width: "100%", padding: "8px" }}
          >
            <option value="">Selecione</option>
            <option value="DMF">DMF</option>
            <option value="MFM">MFM</option>
            <option value="Padrão">Padrão</option>
          </select>
        </div>

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
          Adicionar Sample
        </button>
      </form>
    </div>
  );
}

export default AdicionarSample;
