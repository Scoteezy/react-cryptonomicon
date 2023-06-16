/* eslint-disable array-callback-return */
/* eslint-disable func-names */
/* eslint-disable consistent-return */
import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import {API_KEY } from '../../configs';

export const addnNewCrypto = createAsyncThunk(
  'cryptos/addNewCrypto',
  async function (ticker,{rejectWithValue,dispatch}){
    try{
      const response =await fetch(`https://min-api.cryptocompare.com/data/price?fsym=${ticker.toUpperCase()}&tsyms=USD&api_key=${API_KEY}`);
      const data = await response.json();

      if(data.USD===undefined){
        throw new Error('Cannot add crypto. No such crypto!');
      }
      const crypto = {
        title: ticker.toUpperCase(),
        id: Math.random(),
        val: data.USD,
      };

      if (!response.ok){
        throw new Error('Cannot add crypto. Server Error!');
      }

      dispatch(addCrypto(crypto));
    } catch(error){
      return rejectWithValue(error.message);
    }
  },
);
export const updateCrypto = createAsyncThunk(
  'cryptos/updateCrypto',
  async function (_,{rejectWithValue,dispatch,getState}){
    const cryptos = getState().cryptos.cryptos;

    try{
      const promise = Promise.all(
        cryptos.map((crypto)=>{
          console.log(crypto);
          fetch(`https://min-api.cryptocompare.com/data/price?fsym=${crypto.title}&tsyms=USD&api_key=${API_KEY}`)
            .then((data)=>data.json())
            .then((data)=>{
              dispatch(changeCrypto({id:crypto.id, val: data.USD}));
            });
        }),
      );
            
    }catch(error){
      rejectWithValue(error.message);
    }
  },
);
  
const setError = (state,action)=>{
  state.status = 'rejected';
  state.error = action.payload;
};
const cryptoSlice = createSlice({
  name: 'cryptos',
  initialState: {
    cryptos:[],
  },
  reducers: {
    addCrypto(state,action){
      state.cryptos.push(action.payload);
    },
    removeCrypto(state,action){
      state.cryptos = state.cryptos.filter((crypto)=> crypto.id !== action.payload.id);
    },
    changeCrypto(state,action){
      const changedCrypto = state.cryptos.find((crypto) =>crypto.id ===action.payload.id);

      changedCrypto.val= action.payload.val;
    },
  },
  extraReducers: { 
    [addnNewCrypto.pending]:(state)=>{
      state.status = 'loading';
      state.error = null;
    },
    [addnNewCrypto.fulfilled]:(state)=>{
      state.status = 'resolved';
    },
    [addnNewCrypto.rejected]:setError,
    [updateCrypto.rejected]:setError,
  },
});
const {addCrypto,changeCrypto} = cryptoSlice.actions;

export const { removeCrypto} = cryptoSlice.actions;
export default cryptoSlice.reducer;