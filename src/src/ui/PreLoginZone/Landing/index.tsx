import React, {useState} from 'react';
import {Top} from './Top';
import {About} from './About';
import {Service} from './Service';
import {aboutItems, IAboutItemId} from './config';
import './index.less';

export const Landing = () => {
  const [aboutItemId, selectAboutItem] = useState<IAboutItemId>(
    aboutItems[0].id
  );

  return (
    <div className="landing">
      <Top className="landing__block" />
      <About className="landing__block" selectItem={selectAboutItem} />
      <Service className="landing__block" aboutItemId={aboutItemId} />
    </div>
  );
};
