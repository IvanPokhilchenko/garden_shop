import { combineReducers } from 'redux';
import cartReducer from './cartReducer'; // редуктор корзины

const rootReducer = combineReducers({
  cart: cartReducer,
});

export default rootReducer;
