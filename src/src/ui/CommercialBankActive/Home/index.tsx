import React from 'react';
import {observer} from 'mobx-react-lite';
import {Banners, Banner} from '../../Common/SimpleComponents/Banners';
import {Tasks} from '../../Common/SimpleComponents/Tasks';
import {ReactComponent as LogoMPT} from '../../../assets/svg/logo/mpt.svg';
import {ReactComponent as LogoREB} from '../../../assets/svg/logo/reb.svg';
import {ReactComponent as LogoREC} from '../../../assets/svg/logo/rec.svg';
import './index.less';

export const Home = observer(() => {
  return (
    <div className="home">
      <Banners>
        <Banner className="home__banner home__banner_mpt" onClick={() => {}}>
          <LogoMPT />
        </Banner>
        <Banner className="home__banner home__banner_reb" onClick={() => {}}>
          <LogoREB />
        </Banner>
        <Banner className="home__banner home__banner_rec" href="">
          <LogoREC />
        </Banner>
      </Banners>
      <Tasks className="home__tasks" title="Задачи" />
    </div>
  );
});
