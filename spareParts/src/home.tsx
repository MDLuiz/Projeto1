import Card from "./components/card";

function Home() {
  return (
    <div>
      <Card
        title="Colaboradores"
        text="Esse card mostra os colaboradores"
        buttonText="Adicionar"
        buttonLink="/adicionarColaborador"
        secondButtonText= "Ver mais"
        secondButtonLink= "/listar-colaboradores"
      />
      <Card
        title="Samples"
        text="Esse card mostra os samples"
        buttonText="Adicionar"
        buttonLink="/AdicionarSample" // você pode ajustar esse depois também
        secondButtonText= "Ver mais"
        secondButtonLink= "/ListarSamples"
      />
      <Card
        title="Database"
        text="Card da Home"
        buttonText="Ir para Database"
        buttonLink="/database"
        secondButtonText= "Ver mais"
        secondButtonLink= ""
      />
    </div>
  );
}

export default Home;
