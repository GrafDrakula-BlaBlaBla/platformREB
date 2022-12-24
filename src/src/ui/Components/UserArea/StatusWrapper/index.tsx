import React from 'react';
import memoize from '../../../../Utils/Function/memoize';
import {MUserStatusNames} from '../../../../Model/User';

const getClassName = memoize(function (status?: string): string {
  switch (!!status) {
    case true:
      return 'color-green';
    case false:
      return 'color-red';
    default:
      return '';
  }
});

interface IStatusWrapperProps {
  status: string;
}

export const StatusWrapper = (props: IStatusWrapperProps) => {
  return (
    <span className={getClassName(props.status)}>
      {MUserStatusNames.get(props.status)}
    </span>
  );
};
