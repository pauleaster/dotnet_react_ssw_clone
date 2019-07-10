import React from 'react';
import * as Router from 'react-router-dom';
import * as Api from '../../services';
import { Loader } from '../../components/Loader';

interface State {
  show: any;
}

interface RouterProps {
  id: string;
}

export class SingleSeries extends React.Component<Router.RouteComponentProps<RouterProps>, State> {
  state = {
    show: null as any,
  };

  render(): React.ReactNode {
    const { show } = this.state;
    console.log('show:', show);

    return (
      <div>
        {!show && <Loader />}
        {show && (
          <div>
            <p>{show.name}</p>
            <p>
              <span>Premiered - </span>
              <span>{show.premiered}</span>
            </p>
            <p>
              <span>Rating - </span>
              <span>{show.rating.average}</span>
            </p>
            <p>
              <span>Episodes - </span>
              <span>{show._embedded.episodes.length}</span>
            </p>
            <p>
              <img alt="Show" src={show.image.medium} />
            </p>
          </div>
        )}
      </div>
    );
  }

  async componentDidMount(): Promise<void> {
    const { id } = this.props.match.params;

    const show = await Api.SeriesService.getShow(id);
    this.setState({ show });
  }
}

export default SingleSeries;
