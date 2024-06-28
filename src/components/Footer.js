import React from 'react';

const Footer = ({ isRunning }) => {
    return (
      <>
          <h2 className='font-mono relative left-6 top-10'> {isRunning ? 'Game is running' : 'Game is stopped'}</h2>
      </>
    );
};

export default Footer;