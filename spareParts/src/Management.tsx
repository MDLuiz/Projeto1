import { useEffect, useState } from "react";

interface Colaborador {
  matricula: string;
  nome: string;
}

interface Sample {
  imei: string;
  plm: string;
  modelo: string;
  utilidade: string;
}

interface HistoricoMovimentacao {
  tipo: "entrada" | "saida";
  plm: string;
  colaborador: string;
  data: string; // ISO format
}

function Management() {
  const [tipoMovimentacao, setTipoMovimentacao] = useState<"entrada" | "saida">("entrada");

  const [matriculaColaborador, setMatriculaColaborador] = useState<string>("");
  const [nomeColaborador, setNomeColaborador] = useState<string>("");

  const [plm, setPlm] = useState<string>("");
  const [modeloSample, setModeloSample] = useState<string>("");
  const [utilidadeSample, setUtilidadeSample] = useState<string>("");

  // Carrega dados do localStorage
  const colaboradores: Colaborador[] = JSON.parse(localStorage.getItem("colaboradores") || "[]");
  const samples: Sample[] = JSON.parse(localStorage.getItem("samples") || "[]");

  useEffect(() => {
    const colaborador = colaboradores.find(c =>
      c.matricula.trim().toLowerCase() === matriculaColaborador.trim().toLowerCase()
    );
    setNomeColaborador(colaborador ? colaborador.nome : "");
  }, [matriculaColaborador, colaboradores]);

  useEffect(() => {
    const sampleInfo = samples.find(s =>
      s.plm.trim().toLowerCase() === plm.trim().toLowerCase()
    );
    if (sampleInfo) {
      setModeloSample(sampleInfo.modelo);
      setUtilidadeSample(sampleInfo.utilidade);
    } else {
      setModeloSample("");
      setUtilidadeSample("");
    }
  }, [plm, samples]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nomeColaborador) {
      alert("Matrícula inválida ou colaborador não encontrado.");
      return;
    }

    if (!modeloSample) {
      alert("PLM inválido ou não encontrado.");
      return;
    }

    const historico: HistoricoMovimentacao[] = JSON.parse(localStorage.getItem("historicoMovimentacoes") || "[]");

    const ultimaMovimentacao = [...historico].reverse().find(m => m.plm === plm);


    if (tipoMovimentacao === "saida" && ultimaMovimentacao?.tipo === "saida") {
      alert("Este PLM já está em uso (saída registrada sem entrada).");
      return;
    }

    const novaMovimentacao: HistoricoMovimentacao = {
      tipo: tipoMovimentacao,
      plm: plm,
      colaborador: nomeColaborador,
      data: new Date().toISOString(),
    };

    const novoHistorico = [...historico, novaMovimentacao];
    localStorage.setItem("historicoMovimentacoes", JSON.stringify(novoHistorico));

    alert(`Registrado: ${tipoMovimentacao} de PLM "${plm}" (${modeloSample}) por ${nomeColaborador} (${matriculaColaborador})`);

    // Reset
    setTipoMovimentacao("entrada");
    setMatriculaColaborador("");
    setNomeColaborador("");
    setPlm("");
    setModeloSample("");
    setUtilidadeSample("");
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif", maxWidth: "900px", margin: "0 auto" }}>
      <h1>Spare Parts Management</h1>

      <div style={{ marginTop: "40px", padding: "20px", border: "1px solid #ccc", borderRadius: "8px", backgroundColor: "#f9f9f9" }}>
        <h2 style={{ marginBottom: "20px" }}>Entrada/Saída de Samples</h2>

        <form onSubmit={handleSubmit}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
            {/* Coluna esquerda */}
            <div style={{ flex: "1 1 45%" }}>
              <div style={{ marginBottom: "15px" }}>
                <label>Tipo de movimentação:</label>
                <select
                  value={tipoMovimentacao}
                  onChange={(e) => setTipoMovimentacao(e.target.value as "entrada" | "saida")}
                  style={{ width: "100%", padding: "8px" }}
                >
                  <option value="entrada">Input</option>
                  <option value="saida">Output</option>
                </select>
              </div>

              <div style={{ marginBottom: "15px" }}>
                <label>Matrícula do Colaborador:</label>
                <input
                  type="text"
                  value={matriculaColaborador}
                  onChange={(e) => setMatriculaColaborador(e.target.value)}
                  placeholder="Ex: 12345678"
                  style={{ width: "100%", padding: "8px" }}
                  required
                  maxLength={8}
                />
              </div>

              <div style={{ marginBottom: "15px" }}>
                <label>Nome do Colaborador:</label>
                <input
                  type="text"
                  value={nomeColaborador}
                  readOnly
                  placeholder="Preenchido automaticamente"
                  style={{ width: "100%", padding: "8px", backgroundColor: "#eee" }}
                />
              </div>
            </div>

            {/* Coluna direita */}
            <div style={{ flex: "1 1 45%" }}>
              <div style={{ marginBottom: "15px" }}>
                <label>PLM (15 caracteres):</label>
                <input
                  type="text"
                  value={plm}
                  onChange={(e) => setPlm(e.target.value)}
                  placeholder="Ex: ABC123456789012"
                  style={{ width: "100%", padding: "8px" }}
                  required
                  maxLength={15}
                />
              </div>

              <div style={{ marginBottom: "15px" }}>
                <label>Modelo:</label>
                <input
                  type="text"
                  value={modeloSample}
                  readOnly
                  placeholder="Preenchido automaticamente"
                  style={{ width: "100%", padding: "8px", backgroundColor: "#eee" }}
                />
              </div>

              <div style={{ marginBottom: "15px" }}>
                <label>Utilidade:</label>
                <input
                  type="text"
                  value={utilidadeSample}
                  readOnly
                  placeholder="Preenchido automaticamente"
                  style={{ width: "100%", padding: "8px", backgroundColor: "#eee" }}
                />
              </div>
            </div>
          </div>

          <div style={{ marginTop: "20px" }}>
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
          </div>
        </form>
      </div>
    </div>
  );
}

export default Management;
