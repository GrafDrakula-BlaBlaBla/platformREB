import React from 'react';
import {observer} from 'mobx-react-lite';
import {Link} from 'react-router5';
import {Banners, Banner} from '../../Common/SimpleComponents/Banners';
import {Tasks, Task} from '../../Common/SimpleComponents/Tasks';
import useViewModel from '../../hooks/useViewModel';
import {ROUTER_CONST_CB} from '../../app/settings/routerConst/RouterConstCB';
import {ReactComponent as LogoMPT} from '../../../assets/svg/logo/mpt.svg';
import {ReactComponent as LogoREB} from '../../../assets/svg/logo/reb.svg';
import {ReactComponent as LogoREC} from '../../../assets/svg/logo/rec.svg';
import {VIEW_MODEL} from '../../../ViewModel/identifiers';
import {IBankViewModel} from '../../../ViewModel/viewModels/Banks';
import {EBankStatuses} from '../../../Model/Banks';
import './index.less';

export const Home = observer(() => {
  const {currentBank} = useViewModel<IBankViewModel>(VIEW_MODEL.Banks);
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
      <Tasks className="home__tasks" title="Задачи">
        {currentBank?.status === EBankStatuses.CREATED ? (
          <Task>
            Для работы с продуктами сервисами платформы вам нужно пройти{' '}
            <Link routeName={ROUTER_CONST_CB.ACCREDITATION.fullName}>
              аккредитацию
            </Link>
          </Task>
        ) : null}
      </Tasks>
    </div>
  );
});
