import './index.css';
import {Block} from "./components/Block.jsx"
import { useEffect, useState } from 'react';
import { Rub_RATES } from './constants/Constants.js';
function App() {
  const [rates, setRates] = useState({})
  const [fromCurrency, setFromCurrency] = useState("RUB")
  const [toCurrency, setToCurrency] = useState("USD")
  const [fromPrice, setFromPrice] = useState(0)
  const [toPrice, setToPrice] = useState(0)
  useEffect(() => { 
    async function fetchData(){
      const response = await fetch("https://www.cbr-xml-daily.ru/latest.js")
      let result = await response.json()
      result = result.rates
      setRates(result)
    }
    fetchData()
  }, []);
  useEffect(() => {
    onChangeFromPrice(Number(fromPrice))
  },[fromCurrency, fromPrice])
  // useEffect(() => {
  //   onChangeToPrice(Number(toPrice))
  // },[toCurrency, toPrice])
  function onChangeFromPrice(value){
    let prize = fromCurrency == "RUB" ? value*rates[toCurrency] : value/rates[fromCurrency]
    let result = toCurrency == "RUB" ? prize*Rub_RATES : prize*rates[toCurrency]
    setToPrice(toCurrency == "RUB" || fromCurrency == "RUB" ? prize : result)
    setFromPrice(value)
  }
  function onChangeToPrice(value){
    let result = rates[fromCurrency]/rates[toCurrency]*value
    setFromPrice(result)
    setToPrice(value)
  }
  console.log(fromPrice)
  console.log(toPrice)
  return (
    <div className="App">
      <Block onChangeValue={onChangeFromPrice} value={fromPrice} currency={fromCurrency} onChangeCurrency={setFromCurrency} />
      <Block onChangeValue={onChangeToPrice} value={toPrice} currency={toCurrency} onChangeCurrency={setToCurrency}/>
    </div>
  );
}

export default App;
