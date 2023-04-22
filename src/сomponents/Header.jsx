import React from 'react'
import { useState } from 'react'
const Header = ({onAdd}) => {
  const [ticker,setTicker] = useState('');
  const [val, setTickerVal] = useState('');
  const _apiKey = '142d4e2f560b2a4a3070126c4f7416fa83ecdb95a40398e0cb7a388e9d65a73d';

  const  onSubmit = async(e)=>{
    e.preventDefault();
    if(ticker.length>0){
      fetch(`https://min-api.cryptocompare.com/data/price?fsym=${ticker.toUpperCase()}&tsyms=USD&api_key=${_apiKey}`)
      .then(data => data.json())
      .then(data =>{
        onAdd(ticker.toUpperCase(),data.USD)
      })
    }
   
}
  return (
    <div className='flex-col w-1 justify-start font-poppins'>
      <h3>Тикер</h3>
      <form action="submit" className='mt-3' onSubmit={onSubmit}>
        <input type="text" value={ticker} placeholder='Например DOGE' className='shadow-md rounded' onChange={(e)=>setTicker(e.target.value)}/>
        <button className='w-[125px] h-[45px] bg-slate-400 rounded-full mt-3'>Добавить</button>
      </form>
    </div>
  )
}

export default Header