import React from 'react';
import memoize from '../../../../Utils/Function/memoize';
import {ECFAStatuses} from '../../../../Model/CFA_Deal';
import {getValue} from '../../../../Utils/Enum/getValue';
import {observer} from 'mobx-react-lite';
import useViewModel from '../../../hooks/useViewModel';
import {VIEW_MODEL} from '../../../../ViewModel/identifiers';
import {IDictionaryViewModel} from '../../../../ViewModel/viewModels/Dictionary/interfaces';

const getClassName = memoize(function (status: string): string | undefined {
  switch (status) {
    case ECFAStatuses.NEW:
      return 'color-green';
    case ECFAStatuses.REJECT:
      return 'color-red';
    default:
      return '';
  }
});

interface IWrapperStatusProps {
  status?: string;
}

export const WrapperStatus = observer((props: IWrapperStatusProps) => {
  const {status} = props;
  const {cfaStatuses} = useViewModel<IDictionaryViewModel>(
    VIEW_MODEL.Dictionary
  );
  return status ? (
    <span className={getClassName(status)}>
      {getValue(cfaStatuses, status)}
    </span>
  ) : (
    <span className="color-gray">Не указано</span>
  );
});
