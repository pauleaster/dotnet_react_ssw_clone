import React from 'react';
import * as Router from 'react-router-dom';

type State = {
}

type RouterProps = {
  id: string;
}

interface Props extends Router.RouteComponentProps<RouterProps> {
}

class SingleSeries extends React.Component<Props, State> {
  render(): React.ReactNode {
    console.log(this.props);

    return (
      <div>
        <p>Single Series - the show id will be {this.props.match.params.id}</p>
      </div>
    );
  }
}

export default SingleSeries;
