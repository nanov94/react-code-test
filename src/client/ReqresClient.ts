import axios from 'axios';
import { reqresInHostEndpoint } from '../constants';
import { ListUsersDTO } from './DTOs/ListUsersDTO';

export async function getListUsers(pageNumber: number = 1): Promise<ListUsersDTO> {
    const url = `https://${reqresInHostEndpoint}/api/users?page=${pageNumber}`;

    const result = await axios.get(url);

    return result.data;
}