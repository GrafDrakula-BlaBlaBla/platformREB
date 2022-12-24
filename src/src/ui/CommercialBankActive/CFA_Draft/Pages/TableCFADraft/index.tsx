import React, {useContext, useState, useEffect} from 'react';
import {useRoute} from 'react-router5';
import {observer} from 'mobx-react-lite';
import {PageLayout} from '../../../../Common/PageLayout';
import {TableCFADraftFilters} from './TableCFADraftFilters';
import {Table, TypeToTableRowMap} from '../../../../Common/TableComponents';
import PermissionContext from '../../../../app/contexts/PremissionContext';
import {TableConfig} from './TableConfig';
import {ICFADraftDTO} from '../../../../../Model/CFA_Draft';
import {VIEW_MODEL} from '../../../../../ViewModel/identifiers';
import useViewModel from '../../../../hooks/useViewModel';
import {useFilters} from '../../../../hooks/useFilters';
import useRouterConst from '../../../../hooks/useRouterConst';
import {ECreditForAccreditiveTabs} from '../../../../app/settings/routes/routesBase';
import {ICFADraftListComViewModel} from '../../../../../ViewModel/viewModels/CFA_Draft/list/interfaces';
import {CFADraftComViewModel} from '../../../../../ViewModel/viewModels/CFA_Draft/draft';
import {ConfirmDialog} from '../../../../Components/Dialogs/ConfirmDialog';
import {ReactComponent as ReportIcon} from '../../../../../assets/svg/commonArea/DocPage.svg';

export const TableCFADraft = observer(() => {
  const ROUTER_CONST = useRouterConst();
  const {router} = useRoute();

  const {list, getDraftsCreated, total, loading} = useViewModel<
    ICFADraftListComViewModel
  >(VIEW_MODEL.CFADraftList);

  const {deleteDraft, loading: loadingDraft} = useViewModel<
    CFADraftComViewModel
  >(VIEW_MODEL.CFADraft);

  const {filters, subscribeOnFilters} = useFilters();

  useEffect(() => {
    subscribeOnFilters((filters) => getDraftsCreated(filters));
    //eslint-disable-next-line
  }, []);

  const [currentRowId, setCurrentRowId] = useState<string>('');
  const [modalDelete, setModalDelete] = useState<boolean>(false);

  const onDelete = (
    _: React.MouseEvent<Element, MouseEvent>,
    row: ICFADraftDTO
  ) => {
    setCurrentRowId(row.id);
    setModalDelete(true);
  };

  const handleDelete = async () => {
    await deleteDraft(currentRowId);
    await getDraftsCreated(filters);
    setCurrentRowId('');
  };

  const {isAccess} = useContext(PermissionContext);
  const accessDraftDelete = isAccess('credit-for-accreditive/draft', 'DELETE');

  const tableActions: any = accessDraftDelete
    ? {
        title: ' ',
        isActive: true,
      }
    : null;

  if (accessDraftDelete) {
    tableActions.delete = onDelete;
  }

  const _list = TypeToTableRowMap(list, (item) => {
    item.rowEdit = false;
    item.rowDelete = true;
    return item;
  });

  return (
    <PageLayout title="Черновики" type="table">
      <TableCFADraftFilters />
      <Table<ICFADraftDTO>
        loading={loading || loadingDraft}
        data={_list || []}
        config={TableConfig}
        actions={tableActions}
        onRowClick={(row: ICFADraftDTO) => {
          router.navigate(ROUTER_CONST.CFA_DRAFT.DETAILS.fullName, {
            id: row.id,
            tab: ECreditForAccreditiveTabs.Request,
          });
        }}
        emptyInfo={{
          icon: <ReportIcon />,
        }}
        pagination
        total={total}
      />
      <ConfirmDialog
        isOpen={modalDelete}
        onClose={() => setModalDelete(false)}
        title="Уверены что хотите удалить черновик?"
        buttons={[
          {
            children: 'Удалить черновик',
            variant: 'outlined',
            color: 'red',
            onClick: handleDelete,
          },
          {
            children: 'Не удалять',
            variant: 'outlined',
            color: 'default',
            onClick: () => setCurrentRowId(''),
          },
        ]}
      />
    </PageLayout>
  );
});
