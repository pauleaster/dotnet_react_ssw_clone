import React from 'react';
import loaderSrc from '../../assets/loader.gif';

export function Loader(): any {
  return (
    <div>
      <img style={{ width: '75px' }} alt="Loader icon" src={loaderSrc} />
    </div>
  );
}

export default Loader;
