import React from "react";
import SeriesList from "../../components/SeriesList";
import * as Api from "../../services";

type State = {
  series: any[];
};

class Series extends React.Component<{}, State> {
  state = {
    series: []
  };

  onSeriesInputChange = (e: any) => {
    Api.SeriesService.getShows(e.target.value).then(s =>
      this.setState({ series: s })
    );

    console.log(e);
    console.log(e.target.value);
  };

  render(): React.ReactNode {
    return (
      <div>
        The length of series array - {this.state.series.length}
        <div>
          <input type="text" onChange={this.onSeriesInputChange} />
        </div>
        <SeriesList list={this.state.series} />
      </div>
    );
  }
}

export default Series;
