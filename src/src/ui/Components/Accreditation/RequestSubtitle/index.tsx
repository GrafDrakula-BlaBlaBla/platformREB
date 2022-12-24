import React from 'react';
import {getDateWithFrontEndFormat} from '../../../../Utils/Date/DateFormat';
import {StatusWrapper} from '../StatusWrapper';
import {IAccreditationDTO} from '../../../../Model/Accreditation';
import './index.less';

export const RequestSubtitle = ({item}: {item?: IAccreditationDTO}) => {
  return (
    <>
      №{item?.id} от {getDateWithFrontEndFormat(item?.createdAt)}.{' '}
      <span className="RequestSubtitle__status">Статус</span>
      : <StatusWrapper status={item?.status} />
    </>
  );
};
