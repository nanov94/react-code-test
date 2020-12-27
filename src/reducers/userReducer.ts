import { ADD_USER_LIST } from '../actions/actionTypes';
import { UserReducerMode } from './userReducerModel';

const defaultState: UserReducerMode = {
    users: [],
};

const userReducer = (state = { ...defaultState }, action: any) => {
    switch (action.type) {
    case ADD_USER_LIST:
        return {
            ...state,
            users: [...state.users, ...action.payload.users]
        };
    default:
        return state;
    }
};

export default userReducer;