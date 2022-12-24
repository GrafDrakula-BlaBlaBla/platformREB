import React from 'react';
import {Button} from '../../SimpleComponents/Button';
import './index.less';

export interface IPageAuthSubmitProps {
  label: string;
  onSubmit: () => void;
}

export const PageAuthSubmit = ({label, onSubmit}: IPageAuthSubmitProps) => {
  return (
    <div className="page-auth-submit">
      <Button onClick={onSubmit}>{label}</Button>
    </div>
  );
};
