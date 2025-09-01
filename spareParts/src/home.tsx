import Card from "./components/card";

function Home() {
  return (
    <div>
      <Card title="Card 1" text="Este é o primeiro card" buttonText="Ver mais" buttonLink="/" />
      <Card title="Card 2" text="Card da Home" buttonText="Ir para Features" buttonLink="/features" />
    </div>
  );
}

export default Home;
