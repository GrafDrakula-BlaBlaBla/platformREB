import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import './index.less';

interface ILoaderWithBackdropProps {
  loading?: boolean;
  whiteTheme?: boolean;
  size?: number;
}

export const LoaderWithBackdrop = (props: ILoaderWithBackdropProps) => {
  const cls = ['loader'];
  if (props.whiteTheme) cls.push('loader_white');
  return props.loading ? (
    <div className={cls.join(' ')}>
      <div className="loader-backdrop" />
      <CircularProgress size={props.size} />
    </div>
  ) : null;
};
