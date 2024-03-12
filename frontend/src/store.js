import { createStore } from 'redux';
import rootReducer from './Components/reducers';

const store = createStore(rootReducer);

export default store;
