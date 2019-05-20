import React from 'react';
import './App.css';
import Intro from '../Intro';
import 'whatwg-fetch';

type State = {
  series: any[],
}

class App extends React.Component<{}, State> {
  state = {
    series: [],
  };

  async componentDidMount(): Promise<void> {
    const response = await fetch('http://api.tvmaze.com/search/shows?q=Vikings');
    const json = await response.json();
    this.setState({ series: json as any[] });
  }

  render(): React.ReactNode {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className='App-title'>TV Series List</h1>
        </header>
        <Intro message='Here you can find all of your most loved series' />
        The length of series array - {this.state.series.length}
      </div>
    );
  }
}

export default App;
