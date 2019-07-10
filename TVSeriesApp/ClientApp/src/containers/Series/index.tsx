import React from 'react';
import * as Api from '../../services';
import { Intro } from '../../components/Intro';
import { Loader } from '../../components/Loader';
import { SeriesList } from '../../components/SeriesList';

interface State {
  series: any[];
  seriesName: string;
  isFetching: boolean;
}

export class Series extends React.Component<{}, State> {
  state = {
    series: [],
    seriesName: '',
    isFetching: false,
  };

  render(): React.ReactNode {
    const { series, seriesName, isFetching } = this.state;

    return (
      <div>
        <Intro message="Here you can find all of your most loved series" />
        <div>
          <input value={seriesName} type="text" onChange={this.onSeriesInputChange} />
        </div>
        {!isFetching && series.length === 0 && seriesName.trim() === '' && (
          <p>Please enter series name into the input.</p>
        )}
        {!isFetching && series.length === 0 && seriesName.trim() !== '' && (
          <p>No TV series have been found with this name.</p>
        )}
        {isFetching && <Loader />}
        {!isFetching && <SeriesList list={this.state.series} />}
      </div>
    );
  }

  onSeriesInputChange = (e: any) => {
    this.setState({ seriesName: e.target.value, isFetching: true });

    Api.SeriesService.getShows(e.target.value).then((s: any[]) => this.setState({ series: s, isFetching: false }));
  };
}

export default Series;
