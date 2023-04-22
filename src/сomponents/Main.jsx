import React from 'react'
import Card from './Card'

const Main = ({cards,onDelete}) => {
  const elements = cards.map(item=>{
    const {id,title, ...itemProps}=item;
        return(
            <Card
            key={id}
            {...itemProps}
            title={`${title} - USD`}
            onDelete={()=>onDelete(id)}
            />
        )
    })
  return (
    <div className='mt-5 border-t-4 border-b-4 flex flex-row flex-wrap justify-center font-poppins'  >
         {elements}
    </div>
  )
}

export default Main