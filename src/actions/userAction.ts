import { UserDTO } from '../client/DTOs/UserDTO';
import { ADD_USER_LIST } from './actionTypes';

export const addUserList = (users: UserDTO[]) => ({
    type: ADD_USER_LIST,
    payload: { users }
});