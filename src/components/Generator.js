import React, { useState } from 'react';

const Generator = () => {
  const [canvasWidth, setCanvasWidth] = useState(400);
  const [canvasHeight, setCanvasHeight] = useState(400);
  const [gridFrequency, setGridFrequency] = useState(10);
  const [gridAmplitude, setGridAmplitude] = useState(200);
  const [gridSelection, setGridSelection] = useState('sin');
  const [warpScaling, setWarpScaling] = useState(10);
  const [warpTessellate, setWarpTessellate] = useState(50);
  const [warpSelection, setWarpSelection] = useState('sin');
  const [shiftAmountX, setShiftAmountX] = useState(20);
  const [shiftAmountY, setShiftAmountY] = useState(10);
  const [shiftSelection, setShiftSelection] = useState('sin');

  function generateGrid(ctx, width, height) {
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        let r = Math.sin(x * gridFrequency) * gridAmplitude;
        let g = Math.sin(y * gridFrequency) * gridAmplitude;
        let b = Math.sin((x + y) * gridFrequency) * gridAmplitude;
        let color = 'rgb(' + Math.floor(r) + ', ' + Math.floor(g) + ', ' + Math.floor(b) + ')';
        ctx.fillStyle = color;
        ctx.fillRect(x, y, 1, 1);
      }
    }
  }

  function shiftAlgorithm(imageData, width, height) {
    const data = imageData.data.slice();
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const sourceX = x + Math.round(Math.sin(y / shiftAmountY) * shiftAmountX);
        const sourceY = y + Math.round(Math.sin(x / shiftAmountX) * shiftAmountY);
        if (sourceX >= 0 && sourceX < width && sourceY >= 0 && sourceY < height) {
          const sourceIndex = (sourceY * width + sourceX) * 4;
          const targetIndex = (y * width + x) * 4;
          data[targetIndex] = imageData.data[sourceIndex];         // r
          data[targetIndex + 1] = imageData.data[sourceIndex + 1]; // g
          data[targetIndex + 2] = imageData.data[sourceIndex + 2]; // b
        }
      }
    }
    for (let i = 0; i < data.length; i++) {
      imageData.data[i] = data[i];
    }
    return imageData;
  }
  /*
  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  */
  function applyWarp(imageData, width, height) {
    var data = imageData.data;
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < width; y++) {
        let offsetX = Math.sin(y / warpTessellate) * warpScaling;
        let offsetY = Math.sin(x / warpTessellate) * warpScaling;
        let sourceX = x + offsetX;
        let sourceY = y + offsetY;
        if (sourceX >= 0 && sourceX < width && sourceY >= 0 && sourceY < height) {
          let destIndex = (y * width + x) * 4;
          let sourceIndex = (Math.floor(sourceY) * width + Math.floor(sourceX)) * 4;
          data[destIndex] = data[sourceIndex];         // r
          data[destIndex + 1] = data[sourceIndex + 1]; // g
          data[destIndex + 2] = data[sourceIndex + 2]; // b
          data[destIndex + 3] = data[sourceIndex + 3]; // a
        }
      }
    }
    return imageData;
  }

  const generatePng = (e) => {
    e.preventDefault();
    var canvas = document.createElement('canvas');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    var ctx = canvas.getContext('2d');
    generateGrid(ctx, canvas.width, canvas.height);
    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    imageData = shiftAlgorithm(imageData, canvas.width, canvas.height);
    imageData = applyWarp(imageData, canvas.width, canvas.height);
    ctx.putImageData(imageData, 0, 0);
    var previewImg = document.getElementById('generator-out-preview');
    previewImg.src = canvas.toDataURL('image/png');
    previewImg.style.display = 'block';
    var downloadLink = document.getElementById('generator-download-link');
    downloadLink.href = canvas.toDataURL('image/png');
    downloadLink.style.display = 'block';
  }

  return (
    <div className='page'>
      <h2 className='page-header'>PNG Generator</h2>
      <div className='generator-main-container'>
      <h3 className='generator-param-header'><i>Output Dimensions</i></h3>
        <div className='generator-slider-container'>
          <h4 className='generator-param-preview'>Width (Currently {canvasWidth} px)</h4>
          <input className='generator-slider' type='range' value={canvasWidth} onChange={e => setCanvasWidth(e.target.value)} min='400' max='1500' step='10' />
        </div>
        <div className='generator-slider-container'>
          <h4 className='generator-param-preview'>Height (Currently {canvasHeight} px)</h4>
          <input className='generator-slider' type='range' value={canvasHeight} onChange={e => setCanvasHeight(e.target.value)} min='400' max='1500' step='10' />
        </div>
        <h3 className='generator-param-header'><i>Grid Generation</i></h3>
        <div className='generator-slider-container'>
          <h4 className='generator-param-preview'>Grid Frequency (Currently {gridFrequency})</h4>
          <input className='generator-slider' type='range' value={gridFrequency} onChange={e => setGridFrequency(e.target.value)} min='0' max='1000' step='5' />
        </div>
        <div className='generator-slider-container'>
          <h4 className='generator-param-preview'>Grid Amplitude (Currently {gridAmplitude})</h4>
          <input className='generator-slider' type='range' value={gridAmplitude} onChange={e => setGridAmplitude(e.target.value)} min='0' max='1000' step='5' />
        </div>
        <div className='generator-select-container'>
          <h4 className='generator-param-preview'>Grid Function (Currently {gridSelection})</h4>
          <select className='generator-selection' id='generator-grid-selection' onChange={e => setGridSelection(e.target.value)}>
            <option value='sin'>Sine</option>
            <option value='cos'>Cosine</option>
            <option value='tan'>Tangent</option>
          </select>
        </div>
        <h3>Shift</h3>
        <div className='generator-slider-container'>
          <h4 className='generator-param-preview'>X-Shift (Currently {shiftAmountX})</h4>
          <input className='generator-slider' type='range' value={shiftAmountX} onChange={e => setShiftAmountX(e.target.value)} min='0' max='50' step='1'/>
        </div>
        <div className='generator-slider-container'>
          <h4 className='generator-param-preview'>Y-Shift (Currently {shiftAmountY})</h4>
          <input className='generator-slider' type='range' value={shiftAmountY} onChange={e => setShiftAmountY(e.target.value)} min='0' max='50' step='1'/>
        </div>
        <div className='generator-select-container'>
          <h4 className='generator-param-preview'>Shift Function (Currently {shiftSelection})</h4>
          <select className='generator-selection' id='generator-shift-selection' onChange={e => setShiftSelection(e.target.value)}>
            <option value='sin'>Sine</option>
            <option value='cos'>Cosine</option>
            <option value='tan'>Tangent</option>
          </select>
        </div>
        <h3 className='generator-param-header'><i>Warping</i></h3>
        <div className='generator-slider-container'>
          <h4 className='generator-param-preview'>Warp Scaling (Currently {warpScaling})</h4>
          <input className='generator-slider' type='range' value={warpScaling} onChange={e => setWarpScaling(e.target.value)} min='0' max='1000' step='5' />
        </div>
        <div className='generator-slider-container'>
          <h4 className='generator-param-preview'>Warp Tessellation (Currently {warpTessellate})</h4>
          <input className='generator-slider' type='range' value={warpTessellate} onChange={e => setWarpTessellate(e.target.value)} min='0' max='250' step='1' />
        </div>
        <div className='generator-select-container'>
          <h4 className='generator-param-preview'>Warp Function (Currently {warpSelection})</h4>
          <select className='generator-selection' id='generator-warp-selection' onChange={e => setWarpSelection(e.target.value)}>
            <option value='sin'>Sine</option>
            <option value='cos'>Cosine</option>
            <option value='tan'>Tangent</option>
          </select>
        </div>
      </div>
      <button className='generate-btn' onClick={e => generatePng(e)}>Generate</button>
      <a href='/' className='download-link' id='generator-download-link' download='generator_out.png' style={{display: 'none'}}>Download new .png</a>
      <h4>Generator Preview</h4>
      <img className='generator-preview' id='generator-out-preview' style={{display: 'none'}} alt='generator output .png' />
    </div>
  );
}

export default Generator;