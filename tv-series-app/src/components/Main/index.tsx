import React from 'react';
import * as Router from 'react-router-dom';
import Series from '../../containers/Series';

type Props = {
}

const Main = (props: Props) => (
  <Router.Switch>
    <Router.Route exact path='/' component={Series}/>
  </Router.Switch>
);

export default Main;
