import React from 'react';
import * as Router from 'react-router-dom';
import './index.scss';

interface SeriesListItemProps {
  series: any;
}

const SeriesListItem = ({ series }: SeriesListItemProps): any => (
  <li>
    <Router.Link to={`/series/${series.show.id}`}>{series.show.name}</Router.Link>
  </li>
);

interface Props {
  list: any[];
}

export const SeriesList = (props: Props): any => (
  <div>
    <ul className="series-list">
      {props.list.map(series => (
        <SeriesListItem key={series.show.id} series={series} />
      ))}
    </ul>
  </div>
);

export default SeriesList;
