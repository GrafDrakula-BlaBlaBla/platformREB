import React from 'react';
import {aboutItems, IAboutItemId} from '../config';
import {AboutItem} from './AboutItem';
import './index.less';

interface IAboutProps {
  className?: string;
  selectItem: (id: IAboutItemId) => void;
}

export const About = (props: IAboutProps) => {
  const {className, selectItem} = props;
  const cls = ['about'];
  if (className) cls.unshift(className);
  return (
    <div className={cls.join(' ')} id="about">
      <div className="about-items">
        {aboutItems.map((item, index) => (
          <AboutItem {...item} key={item.id} onClick={selectItem} />
        ))}
      </div>
    </div>
  );
};

export * from './AboutItem';
