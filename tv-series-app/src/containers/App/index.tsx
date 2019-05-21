import React from 'react';
import * as Router from 'react-router-dom';
import './App.css';
import 'whatwg-fetch';
import * as Components from '../../components';

export class App extends React.Component<{}, {}> {
  render(): React.ReactNode {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className='App-title'>
            <Router.Link to={'/'} style={{ color: '#FFF' }}>TV Series List</Router.Link>
          </h1>
        </header>
        <Components.Main />
      </div>
    );
  }
}

export default App;