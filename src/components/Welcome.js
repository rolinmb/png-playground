import React from 'react';

const Welcome = () => {
  return (
    <div className='page'>
      <h2 className='page-header'>Welcome!</h2>
      <div className='welcome-text-content'>
        <p>Visit my older .png generator 'cool-pngs' <a className='welcome-link' href='https://cool-pngs.vercel.app/'>here</a>!</p>
        <p>Show me the cool things you create on instagram <a className='welcome-link' href='https://www.instagram.com/rolin.blake/'>@rolin.blake</a>!</p>
      </div>
    </div>
  );
}

export default Welcome;