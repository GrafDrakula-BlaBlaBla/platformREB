import React, {useEffect, useState} from 'react';
import {useRoute} from 'react-router5';
import {observer} from 'mobx-react-lite';
import useUpdateEffect from '../../../../hooks/useUpdateEffect';
import useViewModel from '../../../../hooks/useViewModel';
import {useFilters} from '../../../../hooks/useFilters';
import {IAccreditationCommercialViewModel} from '../../../../../ViewModel/viewModels/Accreditation';
import {TableConfig} from './config';
import {PageLayout} from '../../../../Common/PageLayout';
import {Table} from '../../../../Common/TableComponents';
import {ROUTER_CONST_CB} from '../../../../app/settings/routerConst/RouterConstCB';
import {EActiveTabsName} from '../AccreditationDetails';
import {
  EAccreditationStatuses,
  IAccreditationDTO,
} from '../../../../../Model/Accreditation';
import {VIEW_MODEL} from '../../../../../ViewModel/identifiers';
import {ReactComponent as DocumentsIcon} from '../../../../../assets/svg/commonArea/Documents.svg';
import {IBankViewModel} from '../../../../../ViewModel/viewModels/Banks';
import {EBankStatuses} from '../../../../../Model/Banks';
import './index.less';

export const TableRequest = observer(() => {
  const {router, route} = useRoute();

  const {list, total, loading, initList, createItem} = useViewModel<
    IAccreditationCommercialViewModel
  >(VIEW_MODEL.Accreditation);
  const {currentBank} = useViewModel<IBankViewModel>(VIEW_MODEL.Banks);

  const handleTableRowClick = (row: IAccreditationDTO) => {
    router.navigate(ROUTER_CONST_CB.ACCREDITATION.DETAILS.fullName, {
      id: row.id,
      tab: EActiveTabsName.AccreditationParameters,
    });
  };

  const {subscribeOnFilters} = useFilters();

  useEffect(() => {
    initList(route.params);
    subscribeOnFilters((filters) => {
      initList(filters);
    });
    // eslint-disable-next-line
  }, []);

  const handleCreateClick = async () => {
    const item = await createItem();
    router.navigate(ROUTER_CONST_CB.ACCREDITATION.DETAILS.fullName, {
      id: item.id,
    });
  };
  const buttonConfig = [
    {
      onClick: handleCreateClick,
      children: 'Создать заявление',
    },
  ];

  const [isCreate, setIsCreate] = useState(false);
  useUpdateEffect(() => {
    const isCreate =
      list.filter((item) => {
        return item.status !== EAccreditationStatuses.REJECTED;
      }).length === 0;
    setIsCreate(isCreate);
  }, [list]);

  return (
    <PageLayout
      title="Заявления на аккредитацию"
      className="table-request_cb"
      buttonGroupConfig={
        currentBank?.status === EBankStatuses.CREATED && isCreate
          ? buttonConfig
          : undefined
      }
      type="table"
    >
      <Table<IAccreditationDTO>
        onRowClick={handleTableRowClick}
        data={list}
        config={TableConfig}
        emptyInfo={{
          icon: <DocumentsIcon className="DocumentsIcon" />,
          message: 'У вас не создано ни одного заявления на аккредитацию',
        }}
        pagination
        total={total}
        loading={loading}
        paddingTop={true}
      />
    </PageLayout>
  );
});
