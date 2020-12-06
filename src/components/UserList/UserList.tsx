import React, { Component, Suspense } from 'react';
import { UserListDTO } from '../../client/DTOs/UserListDTO';
import { UserDTO } from '../../client/DTOs/UserDTO';
import { getUserList } from '../../client/ReqresClient';
import { connect } from 'react-redux';
import { addUserList } from '../../actions/userAction';
import Loading from '../Loading/Loading';

const ListItem = React.lazy(() => import('../ListItem/ListItem'));

interface UserListStateToProps {
    users: UserDTO[];
}

interface UserListState {
    isLoading: boolean;
    isError: boolean;
    isFetching: boolean;
    isNoUsers: boolean;
    pageNumber: number;
}

interface UserListDispatchToProps {
    addUserList: (userList: UserDTO[]) => void;
}

type UserListProps = UserListStateToProps & UserListDispatchToProps;

class UserList extends Component<UserListProps, UserListState> {
    constructor(props: any) {
        super(props);

        this.state = {
            isLoading: true,
            isError: false,
            isFetching: false,
            isNoUsers: false,
            pageNumber: 1,
        }
    }

    componentDidMount() {
        this.getUsers();
        window.addEventListener('scroll', this.handleScroll);
    }

    componentDidUpdate() {
        if (!this.state.isFetching) {
            return;
        }

        this.getUsers();
        this.setState((state) => ({ ...state, isFetching: false }));
    }

    getUsers = () => {
        setTimeout(() => {
            getUserList(this.state.pageNumber)
                .then((userList: UserListDTO) => {
                    if (userList.total_pages < userList.page && userList.data.length === 0) {
                        this.setState((state) => ({ ...state, isNoUsers: true }));

                        return;
                    }

                    this.props.addUserList(userList.data);
                    this.setState((state) => ({ ...state, pageNumber: state.pageNumber + 1 }));
                })
                .catch((error: any) => {
                    console.log(`Server is not available! Error: ${error}.`);
                    this.setState((state) => ({
                        ...state,
                        isError: true,
                    }));
                })
                .finally(() => {
                    this.setState((state) => ({
                        ...state,
                        isLoading: false,
                    }));
                });
        }, 1000);
    };

    handleScroll = () => {
        if (Math.ceil(window.innerHeight + document.documentElement.scrollTop) < document.documentElement.offsetHeight
            || this.state.isFetching) {
            return;
        }

        this.setState((state) => ({ ...state, isFetching: true }));
    }

    render() {
        const { users } = this.props;
        const { isLoading, isError, isNoUsers } = this.state;

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
                            <div key={user.id}>
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
}

const mapStateToProps = (state: any) => {
    const { user } = state;

    const pocketStateToProps: UserListStateToProps = {
        users: user.users,
    };

    return pocketStateToProps;
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        addUserList: (userList: UserDTO[]) => dispatch(addUserList(userList)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
