import React, { useState } from 'react';
import Navigation from '../Navigation/Navigation';
import "./Game.css";
// import '../../App2.css';

function Square({ value, onSquareClick, isHighlighted }) {
  return (
    <button className={`square ${isHighlighted ? 'highlighted' : ''}`} onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay, winner }) {
  function handleClick(i) {
    if (winner || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    onPlay(nextSquares);
  }

  function renderSquare(i, isHighlighted) {
    return (
      <Square
        value={squares[i]}
        onSquareClick={() => handleClick(i)}
        key={i}
        isHighlighted={isHighlighted}
      />
    );
  }

  const winningLine = winner ? winner.line : [];

  const rows = [0, 1, 2].map((row) => {
    const cols = [0, 1, 2].map((col) => {
      const position = row * 3 + col;
      const isHighlighted = winningLine.includes(position);
      return renderSquare(position, isHighlighted);
    });
    return <div className="board-row" key={row}>{cols}</div>;
  });

  return <div>{rows}</div>;
}

function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  const winner = calculateWinner(currentSquares);
  const isBoardFull = currentMove === 9 && !winner;

  function handlePlay(nextSquares) {
    const nextHistory = history.slice(0, currentMove + 1);
    setHistory([...nextHistory, nextSquares]);
    setCurrentMove(nextHistory.length);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  function restartGame() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
  }

  let status;
  if (winner) {
    status = `${winner.winner} Wins!`;
  } else if (isBoardFull) {
    status = "The only winning move is not to play.";
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  const currentMoveDescription =
    currentMove > 0 ? `You are at move #${currentMove}` : 'Go to game start';

  const moves = history.map((squares, move) => {
    const description = move === currentMove ? currentMoveDescription : `Go to move #${move}`;
    const location = move === 0 ? '' : `(${calculateRowCol(move)})`;
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>
          {description} {location}
        </button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} winner={winner} />
      </div>
      <div className="game-info">
        <div>
          <button onClick={restartGame}>Restart Game</button>
        </div>
        <div>{status}</div>
        {!winner && !isBoardFull && <ol>{moves}</ol>}
      </div>
    </div>
  );
}


function calculateRowCol(move) {
  const row = Math.floor(move / 3) + 1;
  const col = (move % 3) + 1;
  return `${row}, ${col}`;
}

function calculateWinner(squares) {
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

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        winner: squares[a],
        line: [a, b, c],
      };
    }
  }

  return null;
}

const GamePage = () => {
  return (
    <div>
      <Navigation />
      <section className="portfolio container text-center">
        <h2>Gnarly Dudes and Dudettes!</h2>
        <Game />
      </section>
    </div>
  );
};

export default GamePage;
