// store.js
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './lib/reducer';

const store = configureStore({
  reducer: rootReducer,
});

export default store;
