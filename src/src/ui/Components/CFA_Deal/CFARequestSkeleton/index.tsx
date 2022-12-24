import React from 'react';
import {FormField, FormSection} from '../../../Common/FormComponents';
import {Skeleton} from '@material-ui/lab';

export const CFARequestSkeleton = () => (
  <FormSection title={<Skeleton width={200} />} className="request-skeleton">
    <FormField isRow title={<Skeleton width={300} />}>
      <Skeleton width={300} />
    </FormField>
    <FormField isRow title={<Skeleton width={300} />}>
      <Skeleton width={300} />
    </FormField>
    <FormField isRow title={<Skeleton width={300} />}>
      <Skeleton width={300} />
    </FormField>
  </FormSection>
);
