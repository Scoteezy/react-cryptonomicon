import React from 'react';
import { useSelector } from 'react-redux';
import Card from './Card';

const Main = () => {
  const cryptos  = useSelector((store)=>store.cryptos.cryptos);
  const elements = cryptos.map((item)=>{
    const {id,title, ...itemProps}=item;

    return(
      <Card
        key={id}
        {...itemProps}
        id={id}
        title={`${title} - USD`}
      />
    );
  });

  return (
    <div className='mt-5 border-t-4 border-b-4 flex flex-row flex-wrap justify-center font-poppins'  >
      {elements}
    </div>
  );
};

export default Main;