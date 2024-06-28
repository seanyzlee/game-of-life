import { useState, useEffect } from 'react'; // Ensure useState and useEffect are imported
import Cell from "./Cell";

function Grid({ rows, cols, isStarted, isPaused, isStopped}) {
    const gridItems = [];
    if (isNaN(rows)) {
        rows = 1;
    }

    if (isNaN(cols)) {
        cols = 1;
    }

    // Initialize cellStates as a 2D array
    const [cellStates, setCellStates] = useState(Array.from({ length: rows }, () => Array(cols).fill(0)));

    useEffect(() => {
            setCellStates(Array.from({ length: rows }, () => Array(cols).fill(0)));
            console.log(cellStates);
            return;
    }, [isPaused]);

    useEffect(() => {
        // Reinitialize cellStates as a 2D array when rows or cols change
        setCellStates(Array.from({ length: rows }, () => Array(cols).fill(0)));
    }, [rows, cols]);

    const toggleCellState = (rowIndex, colIndex) => {
        const newCellStates = cellStates.map((row, rIndex) => {
            if (rIndex === rowIndex) {
                return row.map((cellState, cIndex) => {
                    if (cIndex === colIndex) {
                        return cellState === 1 ? 0 : 1; 
                    } else {
                        return cellState;
                    }
                });
            } else {
                return row;
            }
        });
        setCellStates(newCellStates);
    };


  
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
    const cellState = cellStates[i]?.[j] || 0;
      gridItems.push(
        <Cell key={`${i}-${j}`} isAlive={cellState} toggleCellState={() => toggleCellState(i,j)} />
      );
    }
  }

/*
Any live cell with fewer than two live neighbours dies, as if by underpopulation.
Any live cell with two or three live neighbours lives on to the next generation.
Any live cell with more than three live neighbours dies, as if by overpopulation.
Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
*/

  useEffect(() => {
    console.log(isStarted)
    if (!isStarted){
        console.log('bye');
        return
    } else {
    const intervalId = setInterval(() => {
        if (intervalId) clearInterval(intervalId);
        const newCellStates = cellStates.map((row, rowIndex) => {
            return row.map((cellState, colIndex) => {
            let liveNeighbours = 0;
            for (let i = rowIndex - 1; i <= rowIndex + 1; i++) {
                for (let j = colIndex - 1; j <= colIndex + 1; j++) {
                if (i >= 0 && i < rows && j >= 0 && j < cols && !(i === rowIndex && j === colIndex)) {
                    liveNeighbours += cellStates[i][j];
                }
                }
            }
    
            if (cellState === 1) {
                if (liveNeighbours < 2) {
                return 0;
                } else if (liveNeighbours === 2 || liveNeighbours === 3) {
                return 1;
                } else {
                return 0;
                }
            } else {
                if (liveNeighbours === 3) {
                return 1;
                } else {
                return 0;
                }
            }
            });
        });
        setCellStates(newCellStates);
    
    }, 100);
    return () => clearInterval(intervalId);
}
   
  },[isStarted, cellStates]);

    return (
        <>
        <div className="grid-container h-screen w-screen flex flex-col items-center w-full max-w-[75rem] h-[50em] shadow-xl p-5 relative mb-5 ml-40 left-20 bottom-20" style={{
            marginLeft: '22rem',
            bottom: '37rem',
            display: 'grid',
            gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
            gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
            gap: '0px'
          }}>
            {gridItems}
          </div>
          </>
    )
}

export default Grid;