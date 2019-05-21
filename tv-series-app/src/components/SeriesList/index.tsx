import React from "react";
import * as Router from 'react-router-dom';
import "./index.scss";

type SeriesListItemProps = {
  series: any;
};

const SeriesListItem = ({ series }: SeriesListItemProps) => (
  <li>
    <Router.Link to={`/series/${series.show.id}`}>
      {series.show.name}
    </Router.Link>
  </li>
);

type Props = {
  list: any[];
};

export const SeriesList = (props: Props) => (
  <div>
    <ul className="series-list">
      {props.list.map(series => (
        <SeriesListItem key={series.show.id} series={series} />
      ))}
    </ul>
  </div>
);

export default SeriesList;