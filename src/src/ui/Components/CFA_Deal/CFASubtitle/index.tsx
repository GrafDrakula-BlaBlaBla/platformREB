import React from 'react';
import {observer} from 'mobx-react-lite';
import {formatDateString} from '../../../../Utils/Date/DateFormat';
import {WrapperStatus} from '../WrapperStatus';
import {Skeleton} from '@material-ui/lab';
import {ICFARequestDTO} from '../../../../Model/CFA_Deal';
import './index.less';

interface ICFASubtitleProps {
  loading?: boolean;
  className?: string;
  data?: ICFARequestDTO;
}

export const CFASubtitle = observer((props: ICFASubtitleProps) => {
  const {data, loading, className} = props;

  const cls = ['cfa-subtitle'];
  if (className) cls.push(className);

  return loading ? (
    <Skeleton height={18} width={300} />
  ) : data ? (
    <div className={cls.join(' ')}>
      {data.requestId && <div>№ {data.requestId}</div>}
      <div>
        от {formatDateString(data.createdAt, 'DD.MM.YYYY')}
        {data.status && '.'}
      </div>
      {data.status && (
        <div>
          Статус: <WrapperStatus status={data.status} />
        </div>
      )}
    </div>
  ) : (
    <div className={cls.join(' ')}>Нет данных</div>
  );
});
