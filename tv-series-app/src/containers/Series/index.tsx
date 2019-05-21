import React from "react";
import * as Api from "../../services";
import * as Components from "../../components";

type State = {
  series: any[];
  seriesName: string;
  isFetching: boolean;
};

export class Series extends React.Component<{}, State> {
  state = {
    series: [],
    seriesName: '',
    isFetching: false,
  };

  onSeriesInputChange = (e: any) => {
    this.setState({ seriesName: e.target.value, isFetching: true });

    Api.SeriesService.getShows(e.target.value).then(s =>
      this.setState({ series: s, isFetching: false })
    );
 };

  render(): React.ReactNode {
    const { series, seriesName, isFetching } = this.state;

    return (
      <div>
        <Components.Intro message='Here you can find all of your most loved series' />
        <div>
          <input 
            value={seriesName}
            type="text" 
            onChange={this.onSeriesInputChange} />
        </div>
        {
          !isFetching && series.length === 0 && seriesName.trim() === ''
          &&
          <p>Please enter series name into the input.</p>
        }
        {
          !isFetching && series.length === 0 && seriesName.trim() !== ''
          &&
          <p>No TV series have been found with this name.</p>
        }
        {
          isFetching && <Components.Loader />
        }
        {
          !isFetching && <Components.SeriesList list={this.state.series} />
        }
      </div>
    );
  }
}

export default Series;