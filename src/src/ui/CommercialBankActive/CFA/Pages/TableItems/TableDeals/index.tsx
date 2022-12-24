import React, {useEffect} from 'react';
import {useRoute} from 'react-router5';
import {observer} from 'mobx-react-lite';
import {Table} from '../../../../../Common/TableComponents';
import useRouterConst from '../../../../../hooks/useRouterConst';
import useViewModel from '../../../../../hooks/useViewModel';
import {TableDealsConfig} from '../../config';
import {useFilters} from '../../../../../hooks/useFilters';
import {ECreditForAccreditiveTabs} from '../../../../../app/settings/routes/routesBase';
import {ICFAListViewModel} from '../../../../../../ViewModel/viewModels/CFA_Deal/list';
import {VIEW_MODEL} from '../../../../../../ViewModel/identifiers';
import {ICFAItemDTO} from '../../../../../../Model/CFA_Deal';
import {getSortQuery} from '../../../../../../Utils/SortTable';
import {ReactComponent as CreditCardIcon} from '../../../../../../assets/svg/commonArea/CreditCard.svg';

export const TableDeals = observer(() => {
  const ROUTER_CONST = useRouterConst();
  const {route, router} = useRoute();

  const {list, total, loading, initList} = useViewModel<ICFAListViewModel>(
    VIEW_MODEL.CFAList
  );

  const {filters, subscribeOnFilters} = useFilters();
  useEffect(() => {
    initList(route.params);
    subscribeOnFilters((filters) => {
      initList(filters);
    });
    // eslint-disable-next-line
  }, []);

  return (
    <Table
      loading={loading}
      data={list}
      config={TableDealsConfig}
      onRowClick={(row: ICFAItemDTO) =>
        router.navigate(ROUTER_CONST.CFA_DEAL.DETAILS.fullName, {
          id: row.id,
          tab: ECreditForAccreditiveTabs.Request,
        })
      }
      emptyInfo={{icon: <CreditCardIcon />, message: 'Нет сделок'}}
      pagination
      total={total}
      onSortCallback={(_, columnName, direction) => {
        initList({
          ...route.params,
          ...filters,
          sortBy: getSortQuery<ICFAItemDTO>(columnName, direction),
        });
      }}
    />
  );
});
