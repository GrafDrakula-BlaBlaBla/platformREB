import React from 'react';
import memoize from '../../../../Utils/Function/memoize';
import {getValue} from '../../../../Utils/Enum/getValue';
import {
  EAccreditationStatuses,
  EAccreditationStatusNames,
} from '../../../../Model/Accreditation';

const getClassName = memoize(function (status: string): string | undefined {
  switch (status) {
    case EAccreditationStatuses.CREATED:
    case EAccreditationStatuses.SENT:
    case EAccreditationStatuses.CONSIDERATION:
    case EAccreditationStatuses.ON_REVISION:
    case EAccreditationStatuses.ACCEPTED:
    case EAccreditationStatuses.RESENT:
    case EAccreditationStatuses.MEETING_CREATED:
    case EAccreditationStatuses.MEETING_ACCEPTED:
      return 'color-navy';
    case EAccreditationStatuses.COMPLETED:
      return 'color-green';
    case EAccreditationStatuses.REJECTED:
      return 'color-red';
  }
});

interface IStatusWrapperProps {
  status?: string;
}

export const StatusWrapper = (props: IStatusWrapperProps) => {
  return props.status ? (
    <span className={getClassName(props.status)}>
      {getValue(EAccreditationStatusNames, props.status)}
    </span>
  ) : null;
};
