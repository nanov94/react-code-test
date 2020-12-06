import React, { Component } from 'react';
import Header from './components/Header/Header';
import Loading from './components/Loading/Loading';
import UserList from './components/UserList/UserList';
import { testTimeoutLoadingPageMs } from './constants';

import s from './App.module.scss';

interface AppState {
  isLoading: boolean;
}

class App extends Component<{}, AppState> {
  constructor(props: any) {
    super(props);

    this.state = {
      isLoading: true,
    };

    setTimeout(() => {
      this.setState({ isLoading: false });
    }, testTimeoutLoadingPageMs);
  }

  render() {
    if (this.state.isLoading) {
      return <Loading />;
    }

    return (
      <div className={s.App}>
        <Header />
        <UserList />
      </div>
    );
  }
}

export default App;
