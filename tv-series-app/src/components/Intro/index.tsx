import React from 'react';

type Props = {
  message: string,
}

export const Intro = (props: Props) => (
  <p className='App-intro'>
    {props.message}
  </p>
);

export default Intro;