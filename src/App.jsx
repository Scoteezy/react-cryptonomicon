import { useState,useEffect } from 'react'
import Header from './сomponents/Header'
import Main from './сomponents/Main'
import Footer from './сomponents/Footer'
import './App.css'

function App() {
  const _apiKey = '142d4e2f560b2a4a3070126c4f7416fa83ecdb95a40398e0cb7a388e9d65a73d';
  const [items,setItems] = useState([]);
  const onAddItem = (title,val)=>{
    const newItem = {
      title: title,
      val: val,
      id:Math.random()
    }
    setItems(items => [...items,newItem]);
  }
  console.log(items);
  const onDelItem = (id)=>{
    setItems(items => items.filter((item)=>item.id!==id));
  }
  useEffect(()=>{
    const interval = setInterval(() => {
      for (let i = 0; i < items.length; i++) {
        fetch(`https://min-api.cryptocompare.com/data/price?fsym=${items[i].title}&tsyms=USD&api_key=${_apiKey}`)
        .then(data => data.json())
        .then(data =>{
          console.log(data.USD);
          setItems(items.map(item=>{
            if(item.id === items[i].id){
            return {...item, val: data.USD}
            }else{
              return item;
            }
          }))
        })
      }
    }, 5000);
    return () => clearInterval(interval);
  },[items])
  return (
    <div className="App">
       <Header  
       onAdd={onAddItem}
       />
       <Main  
       cards={items}
       onDelete={onDelItem}
       />
       <Footer/>
    </div>
  )
}

export default App
