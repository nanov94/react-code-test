import { useEffect, useState } from 'react';
import { getUserList } from '../client/ReqresClient';
import { UserListDTO } from '../client/DTOs/UserListDTO';

const useGetUsers = (dispatchCallback: (data: any) => void, isFetching: boolean) => {
    const [pageNumber, setPageNumber] = useState(1);
    const [isLoadingUsers, setIsLoadingUsers] = useState(true);
    const [isNoUsers, setIsNoUsers] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        if (isFetching) {
            setTimeout(() => {
                getUserList(pageNumber)
                    .then((userList: UserListDTO) => {
                        if (userList.total_pages < userList.page && userList.data.length === 0) {
                            setIsNoUsers(true);

                            return;
                        }

                        dispatchCallback(userList.data);
                        setPageNumber(pageNumber + 1);
                    })
                    .catch((error: any) => {
                        // eslint-disable-next-line no-console
                        console.log(`Server is not available! Error: ${error}.`);
                        setIsError(true);
                    })
                    .finally(() => {
                        setIsLoadingUsers(false);
                    });
            }, 1000);
        }
    });

    return {
        isLoadingUsers,
        isNoUsers,
        isError,
    };
};

export default useGetUsers;