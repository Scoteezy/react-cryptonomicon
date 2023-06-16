import React from 'react';
import { useDispatch } from 'react-redux';
import {removeCrypto} from '../store/cryptoSlice';

const Card = ({title,val,id}) => {
  const dispatch = useDispatch();

  return (
    <div className='w-[250px] m-5 hover:border-4 focus:border-4 focus:border-purple-950  hover:border-purple-950 rounded flex flex-col font-poppins'>
      <div className=' mt-5 text-neutral-300 text-lg font-bold'>{title}</div>
      <div className='mt-2 text-4xl font-bold'>{val}</div>
      <div className='my-8' onClick={()=>dispatch(removeCrypto({id}))}>Удалить</div>
    </div>
  );
};

export default Card;