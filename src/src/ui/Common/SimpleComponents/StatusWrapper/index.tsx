import React from 'react';
import {EStatus, EStatusCodes} from '../../../../Model/Status';
import memoize from '../../../../Utils/Function/memoize';
import './index.less';

/**
 * @todo: сочинить механизм работы со статусами.
 * Кейсы:
 * - отрисовка в таблицах разноцветных тайтлов.
 * - условный рендеринг в зависимости от статуса.
 * - наполнение фильров таблиц.
 */
const getClassName = memoize(function (status: string): string | undefined {
  switch (status) {
    case EStatus.CREDIT_REJECTED:
    case EStatus.REGISTERS_REJECTED:
    case EStatus.REQUEST_REJECTED:
    case EStatusCodes.REJECTED:
      return 'StatusWrapper-red';
    case EStatus.CREDIT_APPROVED:
    case EStatus.REQUEST_ACCEPTED:
    case EStatus.REGISTERS_APPROVED:
    case EStatus.REPORTS_APPROVED:
    case EStatusCodes.CREATED:
      return 'StatusWrapper-green';
    case EStatus.REGISTERS_NEW:
    case EStatus.REQUEST_CREATED:
    case EStatus.CREDIT_CREATED:
    case EStatus.REPORTS_CREATED:
      return 'StatusWrapper-navy';
  }
});

const getStatusTitle = memoize(function (status: string): string {
  switch (status) {
    case EStatus.REQUEST_CREATED:
    case EStatusCodes.CREATED:
      return 'Создан';
    case EStatus.REQUEST_ACCEPTED:
      return 'Одобрен';
    case EStatus.REQUEST_IN_PROGRESS:
    case EStatusCodes.IN_PROGRESS:
      return 'В процессе';
    case EStatus.REQUEST_REJECTED:
    case EStatus.REGISTERS_REJECTED:
    case EStatusCodes.REJECTED:
      return 'Отклонен';
    case EStatus.REQUEST_ADDITIONAL_INFO_REQUIRED:
    case EStatusCodes.ADDITIONAL_INFO_REQUIRED:
      return 'Требуется дополнительная информация';
    case EStatus.REQUEST_DISCUSSION:
      return 'Рассмотрение';
    case EStatusCodes.ON_CONSIDERATION:
      return 'На рассмотрении';
    case EStatus.REPORTS_CREATED:
    case EStatus.REGISTERS_NEW:
      return 'Новый';
    case EStatus.REPORTS_APPROVED:
    case EStatus.REGISTERS_APPROVED:
    case EStatusCodes.ACCEPTED:
      return 'Принят';
    case EStatus.CREDIT_CREATED:
      return 'Поданная заявка';
    case EStatus.CREDIT_DOCS_OK:
      return 'Документы размещены';
    case EStatus.CREDIT_ENTER_KO:
      return 'Выход на КО';
    case EStatus.CREDIT_APPROVED:
      return 'Согласованно';
    case EStatus.CREDIT_REJECTED:
      return 'Не согласованно';
    default:
      return status;
  }
});

interface IProps {
  status?: string;
}

export const StatusWrapper = (props: IProps) => {
  if (!props.status) return null;
  return (
    <span className={getClassName(props.status)}>
      {getStatusTitle(props.status)}
    </span>
  );
};
