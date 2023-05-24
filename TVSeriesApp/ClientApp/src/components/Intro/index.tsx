import React from 'react';

interface Props {
  message: string;
}

export function Intro(props: Props): any {
  return <p className="App-intro">{props.message}</p>;
}

export default Intro;
