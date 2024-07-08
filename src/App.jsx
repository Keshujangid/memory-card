import { useState } from "react";
import "./App.css";

import Card from "./component/cards";
import ScoreBoard from "./component/scorboard";

function App() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  return (
    <>
      <header className="header">
        <h1>Memory-card</h1>
        <ScoreBoard score={score}
        highScore = {highScore}
        />
      </header>
      <section className="cards">
        <Card 
        score={score}
        highScore={highScore}
        setScore={setScore}
        setHighScore={setHighScore}
        />
      </section>
    </>
  );
}

export default App;
