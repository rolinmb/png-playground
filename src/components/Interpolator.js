import React, { useState } from 'react';

const Interpolator = () => {
  const [pngUrl1, setPngUrl1] = useState('');
  const [pngUrl2, setPngUrl2] = useState('');
  const [newPngUrl, setNewPngUrl] = useState('');
  const [logicGate, setLogicGate] = useState('and');

  const handlePngUpload = (event, isOne) => {
    event.preventDefault();
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      e.preventDefault();
      const png = new Image();
      png.src = e.target.result;
      if (isOne) {
        setPngUrl1(e.target.result);
      } else {
        setPngUrl2(e.target.result);
      }
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  }

  function applyLogicGate(a, b, gate) {
    const resultData = new Uint8Array(a.length);
    for (let i = 0; i < a.length; i++) {
      resultData[i] = gate(a[i], b[i]);
    }
    return resultData;
  }

  const handleCreateNewPng = () => {
    if (pngUrl1 && pngUrl2) {
      const img1 = document.getElementById('interpolator-preview-one');
      const img2 = document.getElementById('interpolator-preview-two');
      const minWidth = Math.min(img1.width, img2.width);
      const minHeight = Math.min(img1.height, img2.height);
      const canvas = document.createElement('canvas');
      canvas.width = minWidth;
      canvas.height = minHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img1, 0, 0, minWidth, minHeight);
      const imgData1 = ctx.getImageData(0, 0, minWidth, minHeight).data;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img2, 0, 0, minWidth, minHeight);
      const imgData2 = ctx.getImageData(0, 0, minWidth, minHeight).data;
      var resultData;
      switch (logicGate) {
        case 'and':
            resultData = applyLogicGate(imgData1, imgData2, (a, b) => a & b);
          break;
        case 'nand':
            resultData = applyLogicGate(imgData1, imgData2, (a, b) => ~(a & b));
          break;
        case 'or':
          resultData = applyLogicGate(imgData1, imgData2, (a, b) => a | b);
          break;
        case 'nor':
          resultData = applyLogicGate(imgData1, imgData2, (a, b) => ~(a | b));
          break;
        case 'xor':
          resultData = applyLogicGate(imgData1, imgData2, (a, b) => a ^ b);
          break;
        default:
          resultData = applyLogicGate(imgData1, imgData2, (a, b) => a & b);
          break;
      }
      const clampedResult = new Uint8ClampedArray(resultData);
      const resultImage = new ImageData(clampedResult, minWidth, minHeight);
      ctx.putImageData(resultImage, 0, 0);
      setNewPngUrl(canvas.toDataURL('image/png'));
      var downloadLink = document.getElementById('interpolator-download-link');
      downloadLink.href = canvas.toDataURL('image/png');
      downloadLink.style.display = 'block';
    }    
  }

  return (
    <div className='page'>
      <h2 className='page-header'>.png Interpolator</h2>
      <h3 className='interpolator-subheader'>Input .png 1</h3>
      <input className='file-upload-btn' type='file' accept='.png' onChange={e => handlePngUpload(e, true)} />
      <br /><br />
      {pngUrl1 && <img className='interpolator-preview' id='interpolator-preview-one' src={pngUrl1} alt='your .png here'/>}
      &nbsp;
      <h3 className='interpolator-subheader'>Input .png 2</h3>
      <input className='file-upload-btn' type='file' accept='.png' onChange={e => handlePngUpload(e, false)} />
      <br /><br />
      {pngUrl2 && <img className='interpolator-preview' id='interpolator-preview-two' src={pngUrl2} alt='your .png here'/>}
      &nbsp;
      <div className='interpolator-select-container'>
        <h4 className='interpolator-param-preview'>Logic Gate (Currently {logicGate})</h4>
        <select className='interpolator-selection' id='interpolator-gate-selection' onChange={e => setLogicGate(e.target.value)}>
          <option value='and'>AND</option>
          <option value='nand'>NAND</option>
          <option value='or'>OR</option>
          <option value='xor'>XOR</option>
          <option value='nor'>NOR</option>
        </select>
      </div>
      <h3 className='editor-subheader'>PNG Output</h3>
      <button className='generate-btn' onClick={handleCreateNewPng}>Generate New .png</button>
      <a href='/' className='download-link' id='interpolator-download-link' download='interpolator_out.png' style={{display: 'none'}}>Download new .png</a>
      <br /><br />
      {newPngUrl && <img className='generator-preview' id='interpolator-out-preview' src={newPngUrl} alt='interpolator output .png' />}
    </div>
  )
}

export default Interpolator;