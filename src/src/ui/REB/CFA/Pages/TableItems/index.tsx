import {observer} from 'mobx-react-lite';
import React, {useEffect} from 'react';
import {useRoute} from 'react-router5';
import {PageLayout} from '../../../../Common/PageLayout';
import useViewModel from '../../../../hooks/useViewModel';
import useRouterConst from '../../../../hooks/useRouterConst';
import {SStorage} from '../../../../../Utils/Storage';
import {VIEW_MODEL} from '../../../../../ViewModel/identifiers';
import {IBankViewModel} from '../../../../../ViewModel/viewModels/Banks';
import {CFAFilters} from '../../../../Components/CFA/CFAFilters';
import {TableDeals} from './TableDeals';
import {TableReports} from './TableReports';
import {Skeleton} from '@material-ui/lab';

export const TableItems = observer(() => {
  const ROUTER_CONST = useRouterConst();
  const {route, router} = useRoute();

  const {bankInfo, loading: loadingBank, clearBankInfo} = useViewModel<
    IBankViewModel
  >(VIEW_MODEL.Banks);

  // eslint-disable-next-line
  useEffect(() => () => clearBankInfo(), []);

  const link = {
    title: 'К списку банков',
    onClick: () => {
      const routeName = ROUTER_CONST.CFA_BANKS.fullName;
      router.navigate(
        routeName,
        SStorage.filters ? SStorage.filters[routeName] : undefined
      );
    },
  };
  const title = loadingBank ? (
    <Skeleton height={32} width={200} />
  ) : bankInfo ? (
    bankInfo?.bankName
  ) : (
    'Банк не указан'
  );
  const subtitle = loadingBank ? (
    <Skeleton height={18} width={100} />
  ) : bankInfo ? (
    bankInfo?.bankName
  ) : (
    'Банк не указан'
  );

  return (
    <PageLayout
      type="table"
      title={title}
      subtitle={subtitle}
      link={link}
      subTitleElement={<CFAFilters />}
    >
      {route.name === ROUTER_CONST.CFA_DEAL.fullName && <TableDeals />}
      {route.name === ROUTER_CONST.CFA_REPORTS.fullName && <TableReports />}
    </PageLayout>
  );
});
