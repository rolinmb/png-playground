import React, { useState } from 'react';

const ModularGenerator = () => {
  const [canvasWidth, setCanvasWidth] = useState(1600);
  const [canvasHeight, setCanvasHeight] = useState(1600);
  return(
    <div className='page'>
      <h2 className='page-header'>Modular .png Generator</h2>
      <div className='generator-main-container'>
        <h3 className='generator-param-header'><i>Output Dimensions</i></h3>
        <div className='generator-slider-container'>
          <h4 className='generator-param-preview'>Width (Currently {canvasWidth} px)</h4>
          <input className='generator-slider' type='range' value={canvasWidth} onChange={e => setCanvasWidth(e.target.value)} min='500' max='2400' step='10' />
        </div>
        <div className='generator-slider-container'>
          <h4 className='generator-param-preview'>Height (Currently {canvasHeight} px)</h4>
          <input className='generator-slider' type='range' value={canvasHeight} onChange={e => setCanvasHeight(e.target.value)} min='500' max='2400' step='10' />
        </div>
        <div>In progress</div>
      </div>
    </div>
  );
}

export default ModularGenerator;