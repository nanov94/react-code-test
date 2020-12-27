import { combineReducers } from 'redux';
import userReducer from './userReducer';
import { UserReducerMode } from './userReducerModel';

export default combineReducers({
    user: userReducer,
});

export interface RootReducerState {
    user: UserReducerMode,
}