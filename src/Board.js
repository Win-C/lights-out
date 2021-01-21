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

function Board({ nrows = 3, ncols = 3, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());
  console.log("board", board);
  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];

    // TODO: refactor
    for (let i = 0; i < nrows; i++) {
      const row = [];
      for (let j = 0; j < ncols; j++) {
        const cell = Math.floor(Math.random() * 2) === 0;
        row.push(cell);
      }
      initialBoard.push(row);
    }
    console.log("initboard", initialBoard);
    return initialBoard;
  }

  /** check the board in state to determine whether the player has won. */
  function hasWon() {
    return board.every(r => r.every(c => c === false));
  }

  /* takes x and y coordinates of the cell, flip the cell and cells around it and sets Board */
  function flipCellsAround([y, x]) {
    setBoard(oldBoard => {

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      const boardCopy = oldBoard.map(r => [...r]);
      // TODO: in the copy, flip this cell and the cells around it
      flipCell(y, x, boardCopy);
      console.log("self", boardCopy);
      flipCell(y + 1, x, boardCopy);
      console.log("self", boardCopy);
      flipCell(y - 1, x, boardCopy);
      console.log("self", boardCopy);
      flipCell(y, x + 1, boardCopy);
      console.log("self", boardCopy);
      flipCell(y, x - 1, boardCopy);
      console.log("self", boardCopy);
      // TODO: return the copy
      return boardCopy;
    });
  }

  // if the game is won, just show a winning msg & render nothing else
  if (hasWon()) return <div className="Board"> <p className="Board-win-msg"> You won! </p></div>
  // TODO

  // make table board
  return (<div className="Board">
    <h3 className="Board-title"> lights out</h3>
    <div className="Board-container" style={{height: `${nrows*110}px`, width: `${ncols*110}px`}}>
      {board.map((r, xidx) => (
        r.map((c, yidx) => (
          <Cell
            isLit={c}
            flipCellsAroundMe={() => { flipCellsAround([yidx, xidx]) }} />)
        )))}
    </div>

  </div>)

  // Cell({ flipCellsAroundMe, isLit })
  // TODO
}

export default Board;
