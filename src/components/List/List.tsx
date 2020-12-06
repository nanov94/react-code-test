import React, { Component } from 'react';
import { ListUsersDTO } from '../../client/DTOs/ListUsersDTO';
import { UserDTO } from '../../client/DTOs/UserDTO';
import { getListUsers } from '../../client/ReqresClient';

import './List.scss';

class List extends Component {
    state = {
        array: []
    };

    componentDidMount() {
        getListUsers()
            .then((listUsers: ListUsersDTO) => {
                this.setState((state) => ({
                    ...state,
                    array: listUsers.data
                }));
            })
            .catch((error: any) => console.log(`Server is not available! Error: ${error}.`));
    }

    render() {
        const { array } = this.state;

        if (!array.length) {
            return <div> Loading ...</div>;
        }

        return (
            <div>
                {
                    array.map((user: UserDTO) => {
                        return (<div> {user.first_name} {user.last_name} </div>);
                    })
                }
            </div>
        );
    }
}

export default List;
