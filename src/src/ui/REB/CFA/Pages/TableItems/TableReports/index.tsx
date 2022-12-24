import React, {useContext, useEffect} from 'react';
import {observer} from 'mobx-react-lite';
import {useRoute} from 'react-router5';
import {Table} from '../../../../../Common/TableComponents';
import {useFilters} from '../../../../../hooks/useFilters';
import useViewModel from '../../../../../hooks/useViewModel';
import {TableReportConfig} from '../../config';
import {ICFA_ReportsRebViewModel} from '../../../../../../ViewModel/viewModels/CFA_Reports';
import useRouterConst from '../../../../../hooks/useRouterConst';
import {ICFA_ReportDTO} from '../../../../../../Model/CFA_Reports';
import {VIEW_MODEL} from '../../../../../../ViewModel/identifiers';
import {ReactComponent as ReportIcon} from '../../../../../../assets/svg/commonArea/DocPage.svg';
import BlockIcon from '@material-ui/icons/Block';
import PermissionContext from '../../../../../app/contexts/PremissionContext';
import {getSortQuery} from '../../../../../../Utils/SortTable';

export const TableReports = observer(() => {
  const ROUTER_CONST = useRouterConst();
  const {route, router} = useRoute();

  const {list, total, loading, initList} = useViewModel<
    ICFA_ReportsRebViewModel
  >(VIEW_MODEL.CFA_Reports);

  const {isAccess} = useContext(PermissionContext);
  const canViewReportUrl = 'credit-for-accreditive/report';
  const canViewReport = isAccess(canViewReportUrl, 'GET');

  const {filters, subscribeOnFilters} = useFilters();
  useEffect(() => {
    if (canViewReport) {
      initList(route.params);
      subscribeOnFilters((filters) => {
        initList(filters);
      });
    }
    // eslint-disable-next-line
  }, []);

  return (
    <Table<ICFA_ReportDTO>
      data={canViewReport ? list : []}
      config={TableReportConfig}
      onRowClick={(row: ICFA_ReportDTO) =>
        router.navigate(
          ROUTER_CONST.CFA_REPORTS.DETAILS_GENERAL_AGREEMENT.fullName,
          {
            id: row.objectId,
            bankId: route.params.bankId,
          }
        )
      }
      emptyInfo={{
        icon: canViewReport ? <ReportIcon /> : <BlockIcon />,
        message: canViewReport ? 'Нет отчетов' : 'Нет доступа',
      }}
      pagination
      total={total}
      loading={loading}
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
