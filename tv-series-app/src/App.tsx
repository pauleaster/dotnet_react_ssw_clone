import React from 'react';
import './App.css';
import Intro from './components/Intro';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className='App-title'>TV Series List</h1>
      </header>
      <Intro message='Here you can find all of your most loved series' />
    </div>
  );
}

export default App;
