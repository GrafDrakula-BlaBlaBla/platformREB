import React, {useEffect} from 'react';
import {observer} from 'mobx-react-lite';
import {PageLayout} from '../../../../Common/PageLayout';
import useViewModel from '../../../../hooks/useViewModel';
import {IReportDTO} from '../../../../../Model/Reports';
import {Table} from '../../../../Common/TableComponents';
import {ReportsTableConfig} from '../Configs';
import {useRoute} from 'react-router5';
import {useFilters} from '../../../../hooks/useFilters';
import {Loader} from '../../../../Common/SimpleComponents/Loader';
import {TableReportsFilters} from './TableReportsFilters';
import {ROUTER_CONST_CB_ACTIVE} from '../../../../app/settings/routerConst/RouterConstCBActive';
import {VIEW_MODEL} from '../../../../../ViewModel/identifiers';
import {IListViewModel} from '../../../../../ViewModel/viewModels/List/interfaces';
import {ReactComponent as DocPageIcon} from '../../../../../assets/svg/commonArea/DocPage.svg';

export const TableReports = observer(() => {
  const {router} = useRoute();

  const {list, loading, initList} = useViewModel<IListViewModel<IReportDTO>>(
    VIEW_MODEL.Reports
  );

  const {subscribeOnFilters} = useFilters();
  useEffect(() => {
    subscribeOnFilters((filters) => {
      initList(filters);
    });
    // eslint-disable-next-line
  }, []);

  return (
    <PageLayout title="Отчеты">
      <TableReportsFilters />
      {loading ? (
        <Loader />
      ) : (
        <Table<IReportDTO>
          onRowClick={(row: IReportDTO) => {
            router.navigate(ROUTER_CONST_CB_ACTIVE.REPORTS.DETAILS.fullName, {
              id: row.objectId,
            });
          }}
          data={list}
          config={ReportsTableConfig}
          emptyInfo={{
            icon: <DocPageIcon />,
          }}
          pagination
        />
      )}
    </PageLayout>
  );
});
