import React, { useState } from 'react';
import './App.css';

function App() {
  const initialCells = Array.from({ length: 9 }, () => null);

  const [cells, setCells] = useState(initialCells);
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [gameInProgress, setGameInProgress] = useState(true);
  const [gamesPlayed, setGamesPlayed] = useState(0);
  const [scoreX, setScoreX] = useState(0);
  const [scoreO, setScoreO] = useState(0);

  const handleCellClick = (index) => {
    if (!gameInProgress || cells[index] !== null) {
      return;
    }

    const updatedCells = [...cells];
    updatedCells[index] = currentPlayer;
    setCells(updatedCells);

    const winner = checkWin();
    if (winner) {
      setGameInProgress(false);
      updateScores(winner);
      gameOver(winner);
    } else if (updatedCells.every((cell) => cell !== null)) {
      // If all cells are filled and no winner, it's a draw
      setGameInProgress(false);
      gameOver('Draw');
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  const checkWin = () => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const line of lines) {
      const [a, b, c] = line;
      if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
        return cells[a];
      }
    }

    return null;
  };

  const handleGameStart = () => {
    setCells(initialCells);
    setCurrentPlayer('X');
    setGameInProgress(true);
    setGamesPlayed(gamesPlayed + 1);
  };

  const updateScores = (winner) => {
    if (winner === 'X') {
      setScoreX(scoreX + 1);
    } else if (winner === 'O') {
      setScoreO(scoreO + 1);
    }
  };

  const gameOver = (result) => {
    if (result === 'Draw') {
      alert('It\'s a draw!');
    } else {
      alert(`Player ${result} wins!`);
    }
    // You can replace the alert with a custom styled modal or component for a better user experience.
  };

  return (
    <div>
        <h1 class="game-title">X-O Games</h1>
    <div className="game">
      {cells.map((cell, index) => (
        <div
          key={index}
          className={`cell ${cell ? 'active' : ''}`}
          onClick={() => handleCellClick(index)}
        >
          {cell}
        </div>
      ))}
      <div className="game-info">
        <p>Current Player: {currentPlayer}</p>
        <p>Games Played: {gamesPlayed}</p>
        <p>Score X: {scoreX}</p>
        <p>Score O: {scoreO}</p>
        {gameInProgress ? (
          <p>Current Player: {currentPlayer}</p>
        ) : (
          <div>
            <p className="game-over-message">Game Over!</p>
            <button onClick={handleGameStart}>Start New Game</button>
          </div>
        )}
      </div>
    </div>
    </div>
  );
}

export default App;