import { useState } from "react";
import Grid from "./GridResizes";
import Footer from "./Footer";

function GridResize() {
  const [grid, setGrid] = useState([0, 0]);
  const [isStarted, setIsStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isStopped, setIsStopped] = useState(false);
  const [value, setValue] = useState([30, 60]);

  function setPause(isPaused) {
    if (isPaused === false) {
      setIsStarted(false);
      setIsPaused(true);
    } else {
      setIsStarted(false);
      setIsPaused(false);
    }
  }

  function setStopped(isStopped) {
    console.log(isStopped);
    if (isStopped === false) {
      setIsStarted(false);
      setIsPaused(false);
      setIsStopped(true);
    } else {
      setIsStarted(false);
    }
  }

  function setStarted(isStarted) {
    if (isStarted === false) {
      setIsPaused(false);
      setIsStopped(false);
      setIsStarted(true);
    }
  }

  const handleClick = (e) => {
    let row = document.querySelector('input[type="number"]').value;
    let col = document.querySelectorAll('input[type="number"]')[1].value;
    row = Math.max(1, parseInt(row < 200 ? row : 1, 10));
    col = Math.max(1, parseInt(col < 200 ? col : 1, 10));
    setGrid([row, col]);
  };

  return (
    <div className="h-full max-h-0">
      <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white text-center">
        The{" "}
        <span class="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">
          Game of Life
        </span>
      </h1>
      <div className="flex flex-col self-start px-5 text-lg leading-7 whitespace-nowrap text-zinc-900 relative top-2 left-5 mt-4">
        <div className="mt-4">Row</div>
        <input
          type="number"
          step="1"
          defaultValue="1"
          className="w-20 h-8 mt-4 border border-solid border-zinc-200"
          min="1"
          onChange={(e) => handleClick(e)}
        />
        <div className="mt-9">Columns</div>
        <input
          type="number"
          step="1"
          defaultValue="1"
          className="w-20 h-8 mt-4 border border-solid border-zinc-200"
          min="1"
          onChange={(e) => handleClick(e)}
        />
      </div>
      <div className="flex relative inset-y-0 flex-end left-0 top-10 mb-30 ml-20 left-20 pl-20 space-x-20 m-10">
        <div
          className="relative flex flex-col right-20 mr-20 gap-20 mr-20"
          style={{ right: "12.5em" }}
        >
          <button
            onClick={() => setPause(isPaused)}
            type="button"
            className="px-6 py-3.5 text-base font-medium text-white bg-orange-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Reset
          </button>
          <button
            onClick={() => setStarted(isStarted)}
            type="button"
            className="px-6 py-3.5 text-base font-medium text-white bg-green-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Start
          </button>
          <button
            onClick={() => setStopped(isStopped)}
            type="button"
            className="px-6 py-3.5 text-base font-medium text-white bg-red-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Stop
          </button>
        </div>
      </div>
      <Footer isRunning={isStarted} />
     
      <Grid
        rows={grid[0]}
        cols={grid[1]}
        isStarted={isStarted}
        isPaused={isPaused}
        isStopped={isStopped}
      />
    </div>
  );
}

export default GridResize;
