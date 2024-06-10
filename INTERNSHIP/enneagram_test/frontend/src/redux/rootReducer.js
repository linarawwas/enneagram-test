import { combineReducers } from 'redux';
import userReducer from './UserInfo/reducer.js';

const rootReducer = combineReducers({
    user: userReducer,
});

export default rootReducer;
