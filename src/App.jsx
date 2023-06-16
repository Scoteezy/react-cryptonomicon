import { useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import Header from './сomponents/Header';
import Main from './сomponents/Main';
import Footer from './сomponents/Footer';
import './App.css';
import {updateCrypto} from './store/cryptoSlice';

function App() {
  const dispatch = useDispatch();
  const {status,error} = useSelector((state)=>state.cryptos);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(updateCrypto());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <Header />
      {error && <h2>An error occerd: {error}</h2>}
      <Main/>
      <Footer />
    </div>
  );
}

export default App;