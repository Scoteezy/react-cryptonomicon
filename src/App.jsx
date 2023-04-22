import { useState } from 'react'
import Header from './сomponents/Header'
import Main from './сomponents/Main'
import Footer from './сomponents/Footer'
import './App.css'

function App() {
  const _apiKey = '142d4e2f560b2a4a3070126c4f7416fa83ecdb95a40398e0cb7a388e9d65a73d';
  const [items,setItems] = useState([{title: 'asdf', val:'qwer', id:5}]);
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
    console.log(items);
    setItems(items => items.filter((item)=>item.id!==id));
  } 
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
