import React from 'react';
import loaderSrc from '../../assets/loader.gif';

export const Loader = (): any => (
  <div>
    <img style={{ width: '75px' }} alt="Loader icon" src={loaderSrc} />
  </div>
);

export default Loader;
