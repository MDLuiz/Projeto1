import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Sample {
  imei: string;
  plm: string;
  partNumber: string;
  modelo: string;
  utilidade: string;
  maquina?: string;
}

function AdicionarSample() {
  const navigate = useNavigate();

  const [imei, setImei] = useState("");
  const [plm, setPlm] = useState("");
  const [partNumber, setPartNumber] = useState("");
  const [modelo, setModelo] = useState("");
  const [utilidade, setUtilidade] = useState("");
  const [maquina, setMaquina] = useState("");
  const [erro, setErro] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const imeiTrimmed = imei.trim();
    const plmTrimmed = plm.trim();
    const partNumberTrimmed = partNumber.trim();

    if (imeiTrimmed.length !== 15 || plmTrimmed.length !== 11) {
      setErro("IMEI deve ter 15 caracteres e PLM deve ter 11 caracteres.");
      return;
    }

    if (!partNumberTrimmed) {
      setErro("PartNumber é obrigatório.");
      return;
    }

    if (!modelo.trim() || !utilidade) {
      setErro("Preencha todos os campos obrigatórios.");
      return;
    }

    if (utilidade === "Padrão" && !maquina) {
      setErro("Selecione uma máquina para a utilidade Padrão.");
      return;
    }

    if (imeiTrimmed === plmTrimmed) {
      setErro("IMEI e PLM não podem ser iguais.");
      return;
    }

    const samples: Sample[] = JSON.parse(localStorage.getItem("samples") || "[]");

    const imeiExistente = samples.some(s =>
      s.imei === imeiTrimmed || s.plm === imeiTrimmed || s.partNumber === imeiTrimmed
    );
    const plmExistente = samples.some(s =>
      s.imei === plmTrimmed || s.plm === plmTrimmed || s.partNumber === plmTrimmed
    );
    const partNumberExistente = samples.some(s =>
      s.partNumber === partNumberTrimmed || s.imei === partNumberTrimmed || s.plm === partNumberTrimmed
    );

    if (imeiExistente || plmExistente || partNumberExistente) {
      setErro("IMEI, PLM ou PartNumber já cadastrado.");
      return;
    }

    const novoSample: Sample = {
      imei: imeiTrimmed,
      plm: plmTrimmed,
      partNumber: partNumberTrimmed,
      modelo: modelo.trim(),
      utilidade,
      maquina: utilidade === "Padrão" ? maquina : undefined,
    };

    samples.push(novoSample);
    localStorage.setItem("samples", JSON.stringify(samples));

    alert("Sample cadastrado com sucesso!");
    navigate("/home");
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
          <label>PLM (11 caracteres):</label>
          <input
            type="text"
            value={plm}
            onChange={(e) => setPlm(e.target.value)}
            maxLength={11}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>PartNumber:</label>
          <input
            type="text"
            value={partNumber}
            onChange={(e) => setPartNumber(e.target.value)}
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
            onChange={(e) => {
              setUtilidade(e.target.value);
              setMaquina(""); // limpa a máquina se trocar
            }}
            required
            style={{ width: "100%", padding: "8px" }}
          >
            <option value="">Selecione</option>
            <option value="DMF">DMF</option>
            <option value="MFM">MFM</option>
            <option value="Padrão">Padrão</option>
          </select>
        </div>

        {utilidade === "Padrão" && (
          <div style={{ marginBottom: "15px" }}>
            <label>Máquina:</label>
            <select
              value={maquina}
              onChange={(e) => setMaquina(e.target.value)}
              required
              style={{ width: "100%", padding: "8px" }}
            >
              <option value="">Selecione a máquina</option>
              <option value="Calibração">Calibração</option>
              <option value="LCIA">LCIA</option>
              <option value="Radiação">Radiação</option>
              <option value="Camera">Camera</option>
              <option value="IMEI">IMEI</option>
            </select>
          </div>
        )}

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
