import { useEffect, useState } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import './ChessB.css'
import data from '../chesser/data.json';

function ChessB({ opening, og, ogSetFen }) {
  const [game, setGame] = useState(new Chess());
  const [boardOrientation, setBoardOrientation] = useState("black");
  const [currentFen, setCurrentFen] = useState("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");
  const [moveCount, setMoveCount] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const student_details = data;
    ogSetFen(student_details[opening]);
    setGame(new Chess(student_details[opening]));
    setCurrentFen(student_details[opening]);
    setMoveCount(0);
    setGameOver(false);
  }, [opening, ogSetFen]);

  const onDrop = (sourceSquare, targetSquare, piece) => {
    if (gameOver) return false;

    try {
      const move = game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: piece[1]?.toLowerCase() ?? "q"
      });

      if (move === null) return false;

      ogSetFen(game.fen());
      setGame(new Chess(game.fen()));
      setCurrentFen(game.fen());

      setMoveCount(moveCount + 1);

      if (moveCount >= 5) {
        setGameOver(true);
      }

      return true;
    } catch (e) {
      return false;
    }
  };

  return (
    <div className='ChessB-aligner'>
      <div className="ChessB">
        <Chessboard position={currentFen} boardOrientation={boardOrientation} onPieceDrop={onDrop} />
        {gameOver && <div>Game Over!</div>}
      </div>
    </div>
  );
}

export default ChessB;