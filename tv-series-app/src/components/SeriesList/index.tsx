import React from "react";
import "./index.scss";

type Props = {
  list: any[];
};

const SeriesList = (props: Props) => (
  <div>
    <ul className="series-list">
      {props.list.map(series => (
        <li key={series.show.id}>{series.show.name}</li>
      ))}
    </ul>
  </div>
);

export default SeriesList;
