import React, {useEffect} from 'react';
import {Table} from '../../../../../Common/TableComponents';
import {useRoute} from 'react-router5';
import useViewModel from '../../../../../hooks/useViewModel';
import {observer} from 'mobx-react-lite';
import {TableReportConfig} from '../../config';
import {useFilters} from '../../../../../hooks/useFilters';
import {ROUTER_CONST_CB_ACTIVE} from '../../../../../app/settings/routerConst/RouterConstCBActive';
import {ICFA_ReportsCommercialViewModel} from '../../../../../../ViewModel/viewModels/CFA_Reports';
import {ICFA_ReportDTO} from '../../../../../../Model/CFA_Reports';
import {VIEW_MODEL} from '../../../../../../ViewModel/identifiers';
import {ReactComponent as ReportIcon} from '../../../../../../assets/svg/commonArea/DocPage.svg';
import {getSortQuery} from '../../../../../../Utils/SortTable';

export const TableReports = observer(() => {
  const {router, route} = useRoute();

  const {list, total, loading, initList} = useViewModel<
    ICFA_ReportsCommercialViewModel
  >(VIEW_MODEL.CFA_Reports);

  const {filters, subscribeOnFilters} = useFilters();
  useEffect(() => {
    initList(route.params);
    subscribeOnFilters((filters) => {
      initList(filters);
    });
    // eslint-disable-next-line
  }, []);

  return (
    <Table<ICFA_ReportDTO>
      loading={loading}
      onRowClick={(row: ICFA_ReportDTO) =>
        router.navigate(
          ROUTER_CONST_CB_ACTIVE.CFA_REPORTS.DETAILS_GENERAL_AGREEMENT.fullName,
          {
            id: row.objectId,
          }
        )
      }
      config={TableReportConfig}
      data={list || []}
      emptyInfo={{icon: <ReportIcon />, message: 'Нет отчетов'}}
      pagination
      total={total}
      onSortCallback={(_, columnName, direction) => {
        initList({
          ...route.params,
          ...filters,
          sortBy: getSortQuery(columnName, direction),
        });
      }}
    />
  );
});
