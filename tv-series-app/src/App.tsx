import React from 'react';
import './App.css';

const Intro = (props: any) => (
  <p className='App-intro'>
    Our first functional component.
  </p>
);

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className='App-title'>TV Series List</h1>
      </header>
      <Intro />
    </div>
  );
}

export default App;
