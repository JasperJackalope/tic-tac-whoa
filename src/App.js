import React, { useState } from 'react';

function Square({ value, onSquareClick, isWinnerSquare }) {
  const className = isWinnerSquare ? 'square winner' : 'square';
  return (
    <button className={className} onClick={onSquareClick}>
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
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }

  function renderBoard() {
    const board = [];
    for (let row = 0; row < 3; row++) {
      const squaresRow = [];
      for (let col = 0; col < 3; col++) {
        const index = row * 3 + col;
        const isWinnerSquare = winner && winner.includes(index);
        squaresRow.push(
          <Square
            key={index}
            value={squares[index]}
            onSquareClick={() => handleClick(index)}
            isWinnerSquare={isWinnerSquare}
          />
        );
      }
      board.push(
        <div key={row} className="board-row">
          {squaresRow}
        </div>
      );
    }
    return board;
  }

  const status = winner ? 'Winner: ' + winner : 'Next player: ' + (xIsNext ? 'X' : 'O');

  return (
    <React.Fragment>
      <div className="status">{status}</div>
      {renderBoard()}
    </React.Fragment>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isDescending, setIsDescending] = useState(false);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  const winner = calculateWinner(currentSquares);

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const currentMoveDescription = currentMove > 0 ? `You are at move #${currentMove}` : 'Go to game start';

  const toggleSort = () => {
    setIsDescending(!isDescending);
  };

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

  const sortedMoves = isDescending ? moves : moves.slice().reverse();

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} winner={winner} />
      </div>
      <div className="game-info">
        <div>
          <button onClick={toggleSort}>Toggle Sort</button>
        </div>
        <ol>{sortedMoves}</ol>
      </div>
    </div>
  );
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
      return [a, b, c];
    }
  }
  return null;
}

function calculateRowCol(move) {
  const row = Math.floor((move - 1) / 3) + 1;
  const col = (move - 1) % 3 + 1;
  return `${row}, ${col}`;
}
