
import './App.css';
import React, { useEffect, useState } from 'react'
import axios from 'axios'

function App() {

  const [btn, setBtn] = useState(null)
  const [btnValue, setBtnValue] = useState(null)
  const [disable, setDisable] = useState(false)

  const changeOn = async() => {
    if (btn===true) {
      setDisable(true)
      setBtn(false)
      setBtnValue(false)
      sendChangeToDB(false)
      await timeout(2000)
      setDisable(false)
    }else{
      setDisable(true)
      setBtn(true)
      setBtnValue(true)
     sendChangeToDB(true)
      await timeout(2000); 
      setDisable(false)
    }
  }

  const sendChangeToDB = async(btnValue) => {
    const res = await axios({
      method : "post",
      url : "http://ec2-16-171-224-211.eu-north-1.compute.amazonaws.com:5000/on_off",
      data : {on : btnValue}
    })
    console.log(res);
    console.log({btnValue});
  }

  const getDataFromDB = async() => {
    const res = await axios({
      method : "get",
      url : "http://ec2-16-171-224-211.eu-north-1.compute.amazonaws.com:5000/get_on_off",
    })
    console.log(res.data);
    setBtn(res.data.on.on)
    setBtnValue(res.data.on.on)
  }

  function timeout(delay) {
    return new Promise( res => setTimeout(res, delay) );
}

  useEffect(()=>{
    getDataFromDB()
  },[])
  return (
    <div className="App">
      <p>Switch is {btnValue?"on" : "off"}</p>
      <button onClick={changeOn} disabled={disable || btn===null}>
      {btn===null?"Loading...":btn===false?"Turn ON":"Turn OFF"}
      </button>
    </div>
  );
}

export default App;
