import React from 'react';
import {observer} from 'mobx-react-lite';
import {VIEW_MODEL} from '../../../../ViewModel/identifiers';
import {WidgetCreditViewModel} from '../../../../ViewModel/viewModels/Widgets/WidgetCredit';
import {Loader} from '../../../Common/SimpleComponents/Loader';
import useViewModel from '../../../hooks/useViewModel';
import CreditDescription from './CreditDescription';
import CreditBarChart from './CreditBarChart';
import {ReactComponent as DocumentsIcon} from '../../../../assets/svg/commonArea/Documents.svg';
import {NoData} from '../../../Common/SimpleComponents/NoData';
import './index.less';

const WidgetCredit = observer(() => {
  const {mappedCreditInfo, loading} = useViewModel<WidgetCreditViewModel>(
    VIEW_MODEL.WidgetCredit
  );

  if (!mappedCreditInfo && loading) {
    return <Loader />;
  }

  if (!mappedCreditInfo) {
    return (
      <NoData icon={<DocumentsIcon />} message="Нет данных для отображения" />
    );
  }

  return (
    <div className="widget-credit">
      <div className="widget-credit__bar-chart">
        <CreditBarChart mappedCreditInfo={mappedCreditInfo} />
      </div>
      <div className="widget-credit__description">
        <CreditDescription />
      </div>
    </div>
  );
});

export default WidgetCredit;
