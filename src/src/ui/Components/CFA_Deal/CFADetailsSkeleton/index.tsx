import React from 'react';
import {useRoute} from 'react-router5';
import {SStorage} from '../../../../Utils/Storage';
import useRouterConst from '../../../hooks/useRouterConst';
import {CFARequestSkeleton} from '../CFARequestSkeleton';
import {PageLayout} from '../../../Common/PageLayout';
import {Skeleton} from '@material-ui/lab';

export const CFADetailsSkeleton = () => {
  const {router} = useRoute();
  const ROUTER_CONST = useRouterConst();

  return (
    <PageLayout
      link={{
        title: 'К списку сделок',
        onClick: () => {
          const routeName = ROUTER_CONST.CFA_DEAL.fullName;
          router.navigate(
            routeName,
            SStorage.filters ? SStorage.filters[routeName] : undefined
          );
        },
      }}
      title="Сделка"
      subtitle={<Skeleton height={18} width={300} />}
    >
      <CFARequestSkeleton />
    </PageLayout>
  );
};
