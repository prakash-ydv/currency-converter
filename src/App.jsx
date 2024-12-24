import React from "react";
import { useState,useEffect,useCallback } from "react";

function App() {
  const [from , setFrom] = useState(1)
  const [fromCurrency , setFromCurrency] = useState("USD")

  const [to , setTo] = useState(0)
  const [toCurrency, setToCurrency] = useState("USD")

  const [Country , setCountry] = useState(null)
  const [CountryCode , setCountryCode] = useState(null)

  async function fetchData (){
    const response = await fetch(`https://v6.exchangerate-api.com/v6/1c639fbd49bfce09325b0e8f/latest/${fromCurrency}`);
    const data = await response.json();

    // Set the conversion rates
    setCountry(data.conversion_rates);

    // Extract and set the country codes
    setCountryCode(Object.keys(data.conversion_rates));
  }

  function swapCountry(){
    setToCurrency(fromCurrency)
    setFromCurrency(toCurrency)

    setFrom(to)
    setTo(from)
  }

  // function to calculate amount

  function calculatedAmount(){
    if(Country){
    setTo((from*(Number(Country[toCurrency]))).toFixed(2))
    }
  }

  useEffect(() => {
    fetchData();
  }, [fromCurrency])

  useEffect(() => {
    calculatedAmount()
  }, [from,fromCurrency,to,toCurrency,swapCountry])


  // function to reset all fields

  function resetAll(){
    setFrom(1)
  }
  

  return (
    <div className='bg-[url("https://tse4.mm.bing.net/th?id=OIP.bget4M_o7J-E_S1LP6f-YAHaEo&pid=Api&P=0&h=180")] flex items-center flex-col justify-center h-screen w-screen bg-cover '>
      <div className="parentContainer flex items-center flex-col gap-4">

        <h1 className="font-semibold text-2xl">Currency Exchanger</h1>

        <div className="container w-96 rounded-lg  bg-white/40 backdrop-blur-lg p-4">

          <div className="inputForm p-4 flex flex-col ">
            <label htmlFor="">Input</label>
            <input type="number" placeholder={`Amount in ${fromCurrency}`} value={from} onChange={(e) => (setFrom(e.target.value))}/>
          </div>

          <div className="button flex items-center justify-center w-full">

            <select value={fromCurrency} onChange={(e)=>(setFromCurrency(e.target.value))}>
              
              {CountryCode &&
              
                CountryCode.map((c)=>(
                  <option key = {c} value={c}>{c}</option>
                ))
              }
              
              
            </select>
            
            <button className="p-1" onClick={swapCountry}>SWAP</button>

            <select value={toCurrency} onChange={(e)=>(setToCurrency(e.target.value))}>
              
              {CountryCode &&
              
                CountryCode.map((c)=>(
                  <option key = {c} value={c}>{c}</option>
                ))
              }
            </select>
          </div>

          <div className="changedValue mt-8">
            <h1 className="text-center">{from} {fromCurrency} = {to} {toCurrency}</h1>
          </div>

        </div>

      </div>
      <button className="px-6 py-2 mt-4 rounded-md bg-white/30 backdrop-blur-md" onClick={resetAll}>RESET</button>
    </div>
  );
}

export default App;
