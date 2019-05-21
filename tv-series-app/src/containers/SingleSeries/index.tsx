import React from 'react';
import * as Router from 'react-router-dom';
import * as Api from "../../services";
import * as Components from "../../components";

type State = {
  show: any;
}

type RouterProps = {
  id: string;
}

interface Props extends Router.RouteComponentProps<RouterProps> {
}

export class SingleSeries extends React.Component<Props, State> {
  state = {
    show: null as any,
  };

  async componentDidMount(): Promise<void> {
    const { id } = this.props.match.params;

    const show = await Api.SeriesService.getShow(id);
    this.setState({ show });
  }

  render(): React.ReactNode {
    const { show } = this.state;
    console.log('show:', show);

    return (
      <div>
        {
          !show && <Components.Loader />
        }
        {
          show
          &&
          <div>
            <p>{show.name}</p>
            <p>Premiered - {show.premiered}</p>
            <p>Rating - {show.rating.average}</p>
            <p>Episodes - {show._embedded.episodes.length}</p>
            <p>
              <img alt='Show' src={show.image.medium} />
            </p>
          </div>
        }
      </div>
    );
  }
}

export default SingleSeries;