import axios from 'axios';
import { reqresInHostEndpoint } from '../constants';
import { UsersDTO } from './DTOs/UsersDTO';

export async function getListUsers(pageNumber: number = 1): Promise<UsersDTO[]> {
    const url = `https://${reqresInHostEndpoint}/api/users?page=${pageNumber}`;

    const result = await axios.get(url);

    return result.data;
}