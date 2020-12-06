import axios from 'axios';
import { reqresInHostEndpoint } from '../constants';
import { UserListDTO } from './DTOs/UserListDTO';

export async function getUserList(pageNumber: number = 1): Promise<UserListDTO> {
    const url = `https://${reqresInHostEndpoint}/api/users?page=${pageNumber}`;

    const result = await axios.get(url);

    return result.data;
}