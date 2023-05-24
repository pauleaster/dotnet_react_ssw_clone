import React from 'react';
import * as Router from 'react-router-dom';
import './index.scss';

interface SeriesListItemProps {
  series: any;
}

function SeriesListItem({ series }: SeriesListItemProps): any {
  return (
    <li>
      <Router.Link to={`/series/${series.show.id}`}>{series.show.name}</Router.Link>
    </li>
  );
}

interface Props {
  list: any[];
}

export function SeriesList(props: Props): any {
  return (
    <div>
      <ul className="series-list">
        {props.list.map(series => (
          <SeriesListItem key={series.show.id} series={series} />
        ))}
      </ul>
    </div>
  );
}

export default SeriesList;
