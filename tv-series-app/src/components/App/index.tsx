import React from 'react';
import './App.css';
import Intro from '../Intro';

type State = {
  series: string[],
}

class App extends React.Component<{}, State> {
  state = {
    series: [],
  };

  componentDidMount(): void {
    const series = ['Vikings', 'Game of Thrones'];

    setTimeout(() => {
      this.setState({ series });
    }, 2000);
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
