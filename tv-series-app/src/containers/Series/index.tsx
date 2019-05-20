import React from "react";

type State = {
  series: any[],
}

class Series extends React.Component<{}, State> {
  state = {
    series: []
  };

  async componentDidMount(): Promise<void> {
    const response = await fetch(
      "http://api.tvmaze.com/search/shows?q=Vikings"
    );
    const json = await response.json();
    this.setState({ series: json as any[] });
  }

  render(): React.ReactNode {
    return <div>The length of series array - {this.state.series.length}</div>;
  }
}

export default Series;
