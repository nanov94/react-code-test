import { UserDTO } from "./UserDTO";

export interface ListUsersDTO {
    data: UserDTO[];
    page: number;
    per_page: number;
    support: {
        url: string;
        text: string;
    };
    total: number;
    total_pages: number;
}