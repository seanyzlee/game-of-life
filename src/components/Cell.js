import React from 'react';

function Alive({isAlive}) {
    if (isAlive === 1) {
    return <div className="w-full h-full bg-[#fecaca] border border-solid border-zinc-200"></div>;
    } else{
    return <div className="w-full h-full bg-white-100 border border-solid border-zinc-200"></div>;
    }
}

function Cell({ isAlive, toggleCellState }) {
  const handleClick = () => {
    toggleCellState();
  };

  return (
    <div
      onClick={handleClick}
      className="w-full h-full bg-white-blue border border-solid border-zinc-200"
    ><Alive isAlive={isAlive}></Alive></div>
  );
}

export default Cell;