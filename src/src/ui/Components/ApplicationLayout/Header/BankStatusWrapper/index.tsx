import React from 'react';
import memoize from '../../../../../Utils/Function/memoize';
import {getValue} from '../../../../../Utils/Enum/getValue';
import {EBankStatuses, EBankStatusNames} from '../../../../../Model/Banks';

interface IBankStatusWrapperProps {
  status?: string;
  className?: string;
}

const getClassName = memoize(function (status?: string): string {
  switch (status) {
    case EBankStatuses.CREATED:
      return 'color-red';
    case EBankStatuses.APPROVED:
      return 'color-green';
    default:
      return '';
  }
});

export const BankStatusWrapper = (props: IBankStatusWrapperProps) => {
  const cls = [getClassName(props.status)];
  if (props.className) cls.push(props.className);
  return (
    <span className={cls.join(' ')}>
      {getValue(EBankStatusNames, props.status || '')}
    </span>
  );
};
