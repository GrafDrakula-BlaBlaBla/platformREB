import React from 'react';
import {observer} from 'mobx-react-lite';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import {Notify, NOTIFY_TYPE} from '../../../Common/SimpleComponents/Notify';
import useViewModel from '../../../hooks/useViewModel';
import {ICFARequestViewModel} from '../../../../ViewModel/viewModels/CFA_Deal/request';
import {VIEW_MODEL} from '../../../../ViewModel/identifiers';

export const CFASubtitleNotify = observer(() => {
  const {loading, isClosed, isDone, isManual} = useViewModel<
    ICFARequestViewModel
  >(VIEW_MODEL.CFARequest);

  return !loading && (isClosed || (!isManual && !isDone)) ? (
    <div className="page-layout__subtitle">
      {isClosed && (
        <Notify
          type={NOTIFY_TYPE.success}
          icon={<CheckCircleIcon />}
          text="Кредит под резервный аккредитив погашен"
        />
      )}
      {!isManual && !isDone && (
        <Notify
          type={NOTIFY_TYPE.warning}
          icon={<InfoOutlinedIcon />}
          text="Изменение предварительных параметров/предварительных ЭК будет невозможно после достижения сделки статуса Закрыта/Заключена"
        />
      )}
    </div>
  ) : null;
});
