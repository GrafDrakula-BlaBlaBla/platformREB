import React from 'react';
import {FormField} from '../../../Common/FormComponents';
import {Skeleton} from '@material-ui/lab';

export const ReportSkeleton = () => {
  return (
    <React.Fragment>
      <FormField isRow title={<Skeleton width={120} height={18} />} />
      <FormField isRow title={<Skeleton width={180} height={18} />} />
      <FormField isRow title={<Skeleton width={140} height={18} />} />
      <FormField isRow title={<Skeleton width={130} height={18} />} />
      <FormField isRow title={<Skeleton width={170} height={18} />} />
      <FormField isRow title={<Skeleton width={200} height={18} />} />
    </React.Fragment>
  );
};
