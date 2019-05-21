import React from 'react';
import loaderSrc from '../../assets/loader.gif';

type Props = {
}

export const Loader = (props: Props) => (
  <div>
      <img
        style={{width: '75px' }}
        alt='Loader icon'
        src={loaderSrc} />
  </div>
  
);

export default Loader;