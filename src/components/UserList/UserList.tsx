import { lazy, useState, useEffect, Suspense, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../Loading/Loading';
import { UserDTO } from '../../client/DTOs/UserDTO';
import { addUserList } from '../../actions/userAction';
import { RootReducerState } from '../../reducers';
import useGetUsers from '../../hooks/useGetUsers';

const ListItem = lazy(() => import('../ListItem/ListItem'));

const UserList = () => {
    const [isFetching, setIsFetching] = useState(false);

    const dispatch = useDispatch();
    const dispatchCallback = useCallback(
        (userList) => dispatch(addUserList(userList)),
        [dispatch]
    );

    useEffect(() => {
        const handleScroll = () => {
            const { scrollTop, offsetHeight } = document.documentElement;
            if (Math.ceil(window.innerHeight + scrollTop) < offsetHeight || isFetching) {
                return;
            }
    
            setIsFetching(true);
        }

        setIsFetching(true);
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!isFetching) {
            return;
        }

        setIsFetching(false);
    }, [isFetching]);

    const { isLoading, isNoUsers, isError } = useGetUsers(dispatchCallback, isFetching);
    const users = useSelector((state: RootReducerState) => state.user.users);

    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        return <div> Error </div>;
    }

    return (
        <div>
            {
                users.map((user: UserDTO) => {
                    return (
                        <div key={user.email}>
                            <Suspense fallback={<div>Get more users</div>}>
                                <ListItem
                                    img={user.avatar}
                                    title={`${user.first_name} ${user.last_name}`}
                                    additionalInfo={user.email}
                                />
                            </Suspense>
                        </div>
                    )
                })
            }
            {isNoUsers && <div>No more users</div>}
        </div>
    );
}

export default UserList;
