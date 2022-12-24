import React from 'react';
import {ReactComponent as DealIcon} from '../../../../assets/svg/home/Deal.svg';
import {ReactComponent as ReportsIcon} from '../../../../assets/svg/home/Reports.svg';
import {ReactComponent as StatisticsIcon} from '../../../../assets/svg/home/Statistics.svg';
import {useRouter} from 'react-router5';
import {TemporaryPlugTask} from './TemporaryPlugTask';
import {ROUTER_CONST_REB} from '../../../app/settings/routerConst/RouterConstREB';
import './index.less';

export const TemporaryPlug = () => {
  const router = useRouter();
  return (
    <div className="temporary-plug">
      <div className="temporary-plug__title">Ознакомьтесь с разделами</div>
      <div className="temporary-plug__items">
        <TemporaryPlugTask
          icon={<DealIcon />}
          title="Сделки"
          text="Кредитные продукты для банков, участвующих в финансировании экспортной деятельности"
          onClick={() => router.navigate(ROUTER_CONST_REB.CFA_BANKS.fullName)}
        />
        <TemporaryPlugTask
          icon={<StatisticsIcon />}
          title="Статистика"
          text="Подбор комплекса услуг по сопровождению, анализу и проведению экспортных операций"
          onClick={() => router.navigate(ROUTER_CONST_REB.STATISTICS.fullName)}
        />
        <TemporaryPlugTask
          icon={<ReportsIcon />}
          title="Отчеты"
          text="Кредитные продукты для банков, участвующих в финансировании экспортной деятельности"
          onClick={() => router.navigate(ROUTER_CONST_REB.CFA_BANKS.fullName)}
        />
      </div>
    </div>
  );
};
