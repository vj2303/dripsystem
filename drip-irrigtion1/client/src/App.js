
import './App.css';
import React, { useState } from 'react'
import axios from 'axios'

function App() {

  const [btn, setBtn] = useState("OFF")
  const [btnValue, setBtnValue] = useState(false)
  const [disable, setDisable] = useState(false)

  const changeOn = async() => {
    if (btn==="ON") {
      setDisable(true)
      setBtn("OFF")
      setBtnValue(false)
      sendChangeToDB()
      await timeout(2000)
      setDisable(false)
    }else{
      setDisable(true)
      setBtn("ON")
      setBtnValue(true)
     sendChangeToDB()
      await timeout(2000); 
      setDisable(false)
    }
  }

  const sendChangeToDB = async() => {
    const res = await axios({
      method : "post",
      url : "http://localhost:5000/on_off",
      data : {"on" : btnValue}
    })
    console.log(res);
  }

  function timeout(delay) {
    return new Promise( res => setTimeout(res, delay) );
}

  return (
    <div className="App">
      <button onClick={changeOn} disabled={disable}>
        {btn}
      </button>
    </div>
  );
}

export default App;
