import { useEffect, useState } from 'react';
import { getUserList } from '../client/ReqresClient';

const useGetUsers = (dispatchCallback: (data: any) => void, isFetching: boolean) => {
    const [pageNumber, setPageNumber] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [isNoUsers, setIsNoUsers] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        if (isFetching) {
            setTimeout(async () => {
                try {
                    const userList = await getUserList(pageNumber);
                    if (userList.total_pages < userList.page && userList.data.length === 0) {
                        setIsNoUsers(true);

                        return;
                    }

                    dispatchCallback(userList.data);
                    setPageNumber(pageNumber + 1);

                } catch (error) {
                    // eslint-disable-next-line no-console
                    console.log(`Server is not available! Error: ${error}.`);
                    setIsError(true);
                } finally {
                    setIsLoading(false);
                }
            }, 1000);
        }
    });

    return {
        isLoading,
        isNoUsers,
        isError,
    };
};

export default useGetUsers;