import React from 'react';
import * as Router from 'react-router-dom';
import * as Containers from '../../containers';

type Props = {
}

export const Main = (props: Props) => (
  <Router.Switch>
    <Router.Route exact path='/' component={Containers.Series}/>
    <Router.Route path='/series/:id' component={Containers.SingleSeries} />
  </Router.Switch>
);

export default Main;