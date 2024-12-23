import React, { useState } from 'react';
import './App.css';
import thumbnail from './assets/th.jpg';
import dummy from './assets/thee.jpg';

const App = () => {
  const [qurgen, setQurgen] = useState("");
  const [loadingimg, setLoadingimg] = useState(false)
  const [urlinput, seturlInput] = useState("")
  const [sizeinput, setsizeInput] = useState("150")
 async function generate() {
    setLoadingimg(true);
    try {
        const url = `https://api.qrserver.com/v1/create-qr-code/?size=${sizeinput}x${sizeinput}&data=${encodeURIComponent(urlinput)} `;
        setQurgen(url)
    } catch (error) {
      console.error("Error Generator QR Code",error)
      
    }
    finally{
      setLoadingimg(false)
    }
 }
 function Downloading(){
  fetch(qurgen).then((response)=>response.blob()).then((blob)=>{
    const links =  document.createElement("a");
    links.href = URL.createObjectURL(blob);
    links.download = "QR-code.png";
    document.body.appendChild(links);
    links.click();
    document.body.removeChild(links); 
  }).catch((error)=>{
    console.error("Error downloading QR code",error)
  })
 }
  return (
    <div className="container" style={{thumbnail}}>
      <h1>QR CODE GENERATOR</h1>
      {loadingimg && <p>Loading...</p>}
      {qurgen && <img src={qurgen} alt="" />}
      <label htmlFor="urlInput">Paste or Enter your URL:</label>
      <input type="text" id="urlInput" value={urlinput} onChange={(e)=>seturlInput(e.target.value)}/>
      <label htmlFor="sizeInput">Image size (e.g., 150):</label>
      <input type="number" id="sizeInput" value={sizeinput} onChange={(e)=>setsizeInput(e.target.value)}/>
      <div>
        <button onClick={generate} disabled={loadingimg}>Generate QR Code</button>
        <button onClick={Downloading}>Download QR Code</button>
      </div>
      <p>Designed by @vin</p>
    </div>
  );
};

export default App;
