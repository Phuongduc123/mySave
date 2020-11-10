import { combineReducers } from "redux";
import signup from './signupReducer';
import signin from './signinReducer';
import file from './fileReducer';



const allReducers = combineReducers({
    file,
    signup,
    signin,
});

export default allReducers;