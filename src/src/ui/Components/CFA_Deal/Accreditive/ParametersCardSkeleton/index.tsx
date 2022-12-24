import React from 'react';
import {FormField, FormSection} from '../../../../Common/FormComponents';
import {Skeleton} from '@material-ui/lab';

export const ParametersCardSkeleton = () => (
  <FormSection className="parameters-card-skeleton">
    <FormField title={<Skeleton width={80} />}>
      <Skeleton width={50} />
    </FormField>
    <FormField title={<Skeleton width={60} />}>
      <Skeleton width={50} />
    </FormField>
    <FormField title={<Skeleton width={200} />}>
      <Skeleton width={50} />
    </FormField>
    <FormField title={<Skeleton width={60} />}>
      <Skeleton width={50} />
    </FormField>
    <FormField title={<Skeleton width={80} />}>
      <Skeleton width={50} />
    </FormField>
  </FormSection>
);
