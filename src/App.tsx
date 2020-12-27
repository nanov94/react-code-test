import { useState } from 'react';
import Header from './components/Header/Header';
import Loading from './components/Loading/Loading';
import UserList from './components/UserList/UserList';
import { testTimeoutLoadingPageMs } from './constants';

import s from './App.module.scss';

const App = () => {
    const [isLoading, setIsLoading] = useState(true);

    setTimeout(() => {
        setIsLoading(false);
    }, testTimeoutLoadingPageMs);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className={s.App}>
            <Header />
            <UserList />
        </div>
    );
}

export default App;
