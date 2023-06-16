import {
  configureStore,
  combineReducers} from '@reduxjs/toolkit';
import cryptoSlice from './cryptoSlice';

const rootReducer = combineReducers({
  cryptos: cryptoSlice,
});
const store = configureStore({
  reducer: rootReducer,
});

export default store;