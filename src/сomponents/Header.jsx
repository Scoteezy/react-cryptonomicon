import React, {useState } from 'react';
import { useDispatch } from 'react-redux';
import { addnNewCrypto } from '../store/cryptoSlice';

const Header = () => {
  const [ticker,setTicker] = useState('');
  const dispatch = useDispatch();

  const  onSubmit = async(e)=>{
    e.preventDefault();
    if(ticker.length>0){
      dispatch(addnNewCrypto(ticker));
    }
    setTicker('');
  };

  return (
    <div className='flex-col w-1 justify-start font-poppins'>
      <h3>Тикер</h3>
      <form action="submit" className='mt-3' onSubmit={onSubmit}>
        <input type="text" value={ticker} placeholder='Например DOGE' className='shadow-md rounded' onChange={(e)=>setTicker(e.target.value)}/>
        <button className='w-[125px] h-[45px] bg-slate-400 rounded-full mt-3'>Добавить</button>
      </form>
    </div>
  );
};

export default Header;