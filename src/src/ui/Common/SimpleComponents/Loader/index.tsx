import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import './index.less';

interface ILoaderProps {
  size?: number;
}

export function Loader(props: ILoaderProps) {
  return (
    <div className="Loader">
      <CircularProgress className="Loader-Circular" size={props.size} />
    </div>
  );
}
