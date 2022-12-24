import React from 'react';
import {Header} from '../Header';
import {TopContent} from './TopContent';
import {TopChevron} from './TopChevron';
import './index.less';

export interface ITopProps {
  className?: string;
}

export const Top = ({className}: ITopProps) => {
  const cls = ['top'];
  if (className) cls.unshift(className);
  return (
    <div className={cls.join(' ')}>
      <Header />
      <TopContent />
      <TopChevron />
    </div>
  );
};

export * from './TopChevron';
export * from './TopContent';
