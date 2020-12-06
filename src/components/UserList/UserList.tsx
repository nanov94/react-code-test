import React, { Component } from 'react';
import { UserListDTO } from '../../client/DTOs/UserListDTO';
import { UserDTO } from '../../client/DTOs/UserDTO';
import { getUserList } from '../../client/ReqresClient';
import { connect } from 'react-redux';
import ListItem from '../ListItem/ListItem';
import { addUserList } from '../../actions/userAction';

interface UserListStateToProps {
    users: UserDTO[]
}

interface UserListDispatchToProps {
    addUserList: (userList: UserDTO[]) => void;
}

type UserListProps = UserListStateToProps & UserListDispatchToProps;

class UserList extends Component<UserListProps> {
    constructor(props: any) {
        super(props);

        this.state = {
            isLoading: true,
            isError: false,
        }
    }

    componentDidMount() {
        getUserList()
            .then((userList: UserListDTO) => {
                this.props.addUserList(userList.data);
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
    }

    render() {
        const { users } = this.props;

        if (!users.length) {
            return <div> Loading ...</div>;
        }

        if (!users.length) {
            return <div> Loading ...</div>;
        }

        return (
            <div>
                {
                    users.map((user: UserDTO) => {
                        return (
                            <ListItem
                                key={user.id}
                                img={user.avatar}
                                title={`${user.first_name} ${user.last_name}`}
                                additionalInfo={user.email}
                            />);
                    })
                }

                <div>No more users</div>
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
