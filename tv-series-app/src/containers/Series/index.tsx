import React from "react";
import SeriesList from "../../components/SeriesList";
import * as Api from "../../services";
import Loader from "../../components/Loader";

type State = {
  series: any[];
  seriesName: string;
  isFetching: boolean;
};

class Series extends React.Component<{}, State> {
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
          isFetching && <Loader />
        }
        {
          !isFetching && <SeriesList list={this.state.series} />
        }
      </div>
    );
  }
}

export default Series;
