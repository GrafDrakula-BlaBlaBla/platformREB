import React, {useEffect} from 'react';
import {PageLayout} from '../../../../Common/PageLayout';
import {observer} from 'mobx-react-lite';
import useRouterConst from '../../../../hooks/useRouterConst';
import {useRoute} from 'react-router5';
import useViewModel from '../../../../hooks/useViewModel';
import {ICFADraftListComViewModel} from '../../../../../ViewModel/viewModels/CFA_Draft/list/interfaces';
import {VIEW_MODEL} from '../../../../../ViewModel/identifiers';
import {useFilters} from '../../../../hooks/useFilters';
import {ECFADraftStatuses, ICFADraftDTO} from '../../../../../Model/CFA_Draft';
import {Table} from '../../../../Common/TableComponents';
import {ECreditForAccreditiveTabs} from '../../../../app/settings/routes/routesBase';
import {TableConfig} from './TableConfig';
import {TableCFADraftCancelledFilters} from './TableCFADraftCancelledFilters';
import {ReactComponent as ReportIcon} from '../../../../../assets/svg/commonArea/DocPage.svg';

export const TableCFADraftCancelled = observer(() => {
  const ROUTER_CONST = useRouterConst();
  const {router} = useRoute();

  const {list, initList: getDrafts, total, loading} = useViewModel<
    ICFADraftListComViewModel
  >(VIEW_MODEL.CFADraftList);

  const {subscribeOnFilters} = useFilters();
  useEffect(() => {
    subscribeOnFilters((filters) => {
      getDrafts({...filters, draftStatuses: ECFADraftStatuses.CANCELED});
    });
    //eslint-disable-next-line
  }, []);

  return (
    <PageLayout title="Черновики" titleExtra="Удаленные" type="table">
      <TableCFADraftCancelledFilters />
      <Table<ICFADraftDTO>
        loading={loading}
        data={list || []}
        config={TableConfig}
        onRowClick={(row: ICFADraftDTO) => {
          router.navigate(ROUTER_CONST.CFA_DRAFT_CANCELLED.DETAILS.fullName, {
            id: row.id,
            tab: ECreditForAccreditiveTabs.Request,
          });
        }}
        emptyInfo={{
          icon: <ReportIcon />,
          message: 'Нет удаленных черновиков',
        }}
        pagination
        total={total}
      />
    </PageLayout>
  );
});
