import {useState, useEffect} from "react";
import './App.css';
import ChessB from './components/ChessB';
import Opening from './components/Opening'
import Test from './components/Test'

function App() {
  const [opening, setOpening] = useState("");
  const [puzzles, setPuzzles] = useState([]);
  const [og, ogSetFen] = useState("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");
  const [fen, setFen] = useState("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");
  const [depth, setDepth] = useState("1");

  useEffect(() => {
    setFen(og)
  }, [og])

  return (
    <div className="App">
      <div className="top">
        <div>SUPER SAIYEN CHESS OPENING TRAINER!!!</div>
      </div>
      <div className="mid">
        <Opening opening={opening} setOpening={setOpening} depth={depth} setDepth={setDepth}></Opening>
        <ChessB opening={opening} puzzles={puzzles} og={og} ogSetFen={ogSetFen} fen={fen} setFen={setFen} depth={depth}></ChessB>
        <Test depth={depth} opening={opening} setPuzzles={setPuzzles}></Test>
      </div>
    </div>
  );
}

export default App;
