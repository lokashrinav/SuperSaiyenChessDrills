import { useState, useCallback } from "react";
import './Test.css'
import { Chess } from "chess.js";
import data from '../chesser/data.json';

function Test({ depth, opening, setPuzzles }) {
    const generatePuzzles = () => {
        if (!opening) {
            console.error("Opening is not a valid FEN string.");
            return;
        }

        try {
            const student_details = data;
            const chess = new Chess(student_details[opening]);
            const allPuzzles = [];

            function generate(game, currentDepth, puzzleSoFar) {
                if (currentDepth >= depth) {
                    return;
                }

                const moves = game.moves();
                if (moves.length === 0) {
                    return;
                }

                moves.forEach(move => {
                    const newGame = new Chess(game.fen());
                    newGame.move(move);

                    const newPuzzleSoFar = [...puzzleSoFar, move];

                    allPuzzles.push({
                        fen: newGame.fen(),
                        moves: newPuzzleSoFar
                    });

                    generate(newGame, currentDepth + 1, newPuzzleSoFar);
                });
            }

            generate(chess, 1, []);

            setPuzzles(allPuzzles);
            console.log(allPuzzles);

        } catch (error) {
            console.error("Invalid FEN string:", opening);
        }
    };

    return (
        <div className="Opening-state">
            <div className="Opening-title">Click To Start</div>
            <div className="Opening-mid">
                <button style={{ backgroundColor: 'green', color: 'white' }} onClick={generatePuzzles}>Start Puzzle</button>
            </div>
        </div>
    );
}

export default Test;