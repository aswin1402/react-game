import './App.css';
import Board from './Components/Board';
import React, { useState } from 'react';
import { ScoreBoard } from './Components/ScoreBoard';
import { ResetButton } from './Components/ResetButton';
import Confetti from 'react-confetti';

function App() {
  const win_conditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  const [board, setBoard] = useState(Array(9).fill(null));
  const [xPlaying, setXPlaying] = useState(true);
  const [scores, setScores] = useState({ xScore: 0, oScore: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null); 
  const [isDraw, setIsDraw] = useState(false); 

  const handleBoxClick = (boxIdx) => {
    if (board[boxIdx] !== null || gameOver) return; 

    const updatedBoard = board.map((value, idx) => {
      if (idx === boxIdx) {
        return xPlaying === true ? "X" : "O";
      } else {
        return value;
      }
    });

    const winner = checkWinner(updatedBoard);
    if (winner) {
      setWinner(winner); 
      setGameOver(true); 
      if (winner === "O") {
        let { oScore } = scores;
        oScore += 1;
        setScores({ ...scores, oScore });
      } else {
        let { xScore } = scores;
        xScore += 1;
        setScores({ ...scores, xScore });
      }
    } else if (!updatedBoard.includes(null)) {
      
      setIsDraw(true);
      setGameOver(true);
    }

    setBoard(updatedBoard);
    setXPlaying(!xPlaying);
  };

  const checkWinner = (board) => {
    for (let i = 0; i < win_conditions.length; i++) {
      const [x, y, z] = win_conditions[i];
      if (board[x] && board[x] === board[y] && board[y] === board[z]) {
        return board[x];
      }
    }
    return null;
  };

  const resetBoard = () => {
    setBoard(Array(9).fill(null));
    setGameOver(false);
    setWinner(null); 
    setIsDraw(false); 
  };

  return (
    <div className="App">
   
    <h1>Tic Tac Toe</h1>
  
      <ScoreBoard scores={scores} xPlaying={xPlaying} />
      <Board board={board} onClick={gameOver ? resetBoard : handleBoxClick} />
      {winner && (
        <>
          <h2 className="winner-message">{winner} Wins!</h2>
          <Confetti /> 
        </>
      )}
      {isDraw && <h2 className="winner-message">It's a Draw!</h2>} 
      <ResetButton resetBoard={resetBoard} />
    </div>
  );
}

export default App;
