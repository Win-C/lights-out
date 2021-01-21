import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows = 5, ncols = 5, chanceLightStartsOn = 0.5 }) {
  // Note: don't need to invoke functions let be the callback
  const [board, setBoard] = useState(createBoard);

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];

    for (let i=0; i<nrows; i++){
      let row = [];
      for (let j=0; j<ncols; j++){
        const cell = Math.random() > chanceLightStartsOn;
        row.push(cell);
      }
      initialBoard.push(row);
    }

    return initialBoard;
  }

  /** check the board in state to determine whether the player has won. */
  function hasWon() {
    return board.every(r => r.every(c => c === false));
  }

  /** takes x and y coordinates of the cell, flip the cell and 
      cells around it and sets Board */
  function flipCellsAround([y, x]) {
    setBoard(oldBoard => {

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      const boardCopy = oldBoard.map(r => [...r]);

      flipCell(y, x, boardCopy);
      flipCell(y + 1, x, boardCopy);
      flipCell(y - 1, x, boardCopy);
      flipCell(y, x + 1, boardCopy);
      flipCell(y, x - 1, boardCopy);

      return boardCopy;
    });
  }

  // if the game is won, just show a winning msg & render nothing else
  if (hasWon()) {
    return (
      <div className="Board"> 
        <p className="Board-win-msg"> 
          You won! 
        </p>
      </div>
      );
  }

  // make table board
  const table = (
    <table className="Board-container">
        <tbody>
        {board.map((r, yidx) => (
          <tr key={`${yidx}`}>
          {r.map((c, xidx) => (
            <Cell
            key={`${yidx}-${xidx}`}
            isLit={c}
            flipCellsAroundMe={() => { flipCellsAround([yidx, xidx]) }} />)
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="Board">
      <h3 className="Board-title"> lights out</h3>
      {table}
    </div>
  );
}

export default Board;
