import React from 'react';
import memoize from '../../../../Utils/Function/memoize';
import {getValue} from '../../../../Utils/Enum/getValue';
import {
  ECFA_ReportStatus,
  ECFA_ReportStatusNames,
} from '../../../../Model/CFA_Reports';

const getClassName = memoize(function (status: string): string | undefined {
  switch (status) {
    case ECFA_ReportStatus.NEW:
      return 'color-green';
    case ECFA_ReportStatus.ACCEPTED:
      return undefined;
  }
});

interface IStatusWrapperProps {
  status?: string;
}

export const StatusWrapper = (props: IStatusWrapperProps) => {
  return props.status ? (
    <span className={getClassName(props.status)}>
      {getValue(ECFA_ReportStatusNames, props.status)}
    </span>
  ) : null;
};
