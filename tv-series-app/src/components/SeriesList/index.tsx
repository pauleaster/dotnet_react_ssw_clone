import React from "react";
import "./index.scss";

type SeriesListItemProps = {
  series: any;
};

const SeriesListItem = ({ series }: SeriesListItemProps) => (
  <li>{series.show.name}</li>
);

type Props = {
  list: any[];
};

const SeriesList = (props: Props) => (
  <div>
    <ul className="series-list">
      {props.list.map(series => (
        <SeriesListItem key={series.show.id} series={series} />
      ))}
    </ul>
  </div>
);

export default SeriesList;
