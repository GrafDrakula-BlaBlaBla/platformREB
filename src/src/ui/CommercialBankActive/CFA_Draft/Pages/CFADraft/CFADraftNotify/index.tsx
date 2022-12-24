import React from 'react';
import {observer} from 'mobx-react-lite';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import {
  Notify,
  NOTIFY_TYPE,
} from '../../../../../Common/SimpleComponents/Notify';

export const CFADraftNotify = observer(() => {
  return (
    <div className="page-layout__subtitle">
      <Notify
        type={NOTIFY_TYPE.warning}
        icon={<InfoIcon />}
        text="Внесение информации по сделке осуществляется во вкладках: Параметры, Документы и Экспортные контракты."
      />
    </div>
  );
});
