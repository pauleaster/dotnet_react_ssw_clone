import React from 'react';

interface Props {
  message: string;
}

export const Intro = (props: Props): any => <p className="App-intro">{props.message}</p>;

export default Intro;
