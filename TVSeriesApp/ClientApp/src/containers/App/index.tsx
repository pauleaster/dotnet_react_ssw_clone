import React from 'react';
import * as Router from 'react-router-dom';
import './App.css';
import 'whatwg-fetch';
import { Main } from '../../components/Main';

export class App extends React.Component<object, object> {
  render(): React.ReactNode {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">
            <Router.Link to="/" style={{ color: '#FFF' }}>
              TV Series List
            </Router.Link>
          </h1>
        </header>
        <Main />
      </div>
    );
  }

  componentDidMount(): void {
    // NOTE: Keep this here as we need to trigger app wide data load.
  }
}

export default App;
