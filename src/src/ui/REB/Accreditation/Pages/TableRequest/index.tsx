import React, {useEffect} from 'react';
import {useRoute} from 'react-router5';
import {observer} from 'mobx-react-lite';
import useViewModel from '../../../../hooks/useViewModel';
import {useFilters} from '../../../../hooks/useFilters';
import {IAccreditationREBViewModel} from '../../../../../ViewModel/viewModels/Accreditation';
import {TableConfig} from './config';
import {PageLayout} from '../../../../Common/PageLayout';
import {Table} from '../../../../Common/TableComponents';
import {TableRequestFilters} from '../TableRequestFilters';
import {ROUTER_CONST_REB} from '../../../../app/settings/routerConst/RouterConstREB';
import {EActiveTabsName} from '../AccreditationDetails';
import {SStorage} from '../../../../../Utils/Storage';
import useRouterConst from '../../../../hooks/useRouterConst';
import {VIEW_MODEL} from '../../../../../ViewModel/identifiers';
import {IBankViewModel} from '../../../../../ViewModel/viewModels/Banks';
import {IAccreditationDTO} from '../../../../../Model/Accreditation';
import {ReactComponent as DocumentsIcon} from '../../../../../assets/svg/commonArea/Documents.svg';
import './index.less';

export const TableRequest = observer(() => {
  const {route, router} = useRoute();
  const ROUTER_CONST = useRouterConst();

  const {list, total, loading, initList} = useViewModel<
    IAccreditationREBViewModel
  >(VIEW_MODEL.Accreditation);
  const {bankInfo, loading: loadingBank, clearBankInfo} = useViewModel<
    IBankViewModel
  >(VIEW_MODEL.Banks);

  const handleTableRowClick = (row: IAccreditationDTO) => {
    router.navigate(ROUTER_CONST_REB.ACCREDITATION.DETAILS.fullName, {
      id: row.id,
      tab: EActiveTabsName.AccreditationParameters,
      bankInfoId: route.params.bankInfoId,
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

  // eslint-disable-next-line
  useEffect(() => () => clearBankInfo(), []);

  return (
    <PageLayout
      title="Заявления на аккредитацию"
      className="table-request_reb"
      type="table"
      subtitle={
        loadingBank ? '...' : bankInfo ? bankInfo?.bankName : 'Банк не указан'
      }
      link={{
        title: 'К списку банков',
        onClick: () => {
          const routeName = ROUTER_CONST.ACCREDITATION.BANKS.fullName;
          router.navigate(
            routeName,
            SStorage.filters ? SStorage.filters[routeName] : undefined
          );
        },
      }}
    >
      <TableRequestFilters />
      <Table<IAccreditationDTO>
        onRowClick={handleTableRowClick}
        data={list}
        config={TableConfig}
        emptyInfo={{
          icon: <DocumentsIcon className="DocumentsIcon" />,
          message: 'Не найдено ни одного заявления на аккредитацию',
        }}
        pagination
        total={total}
        loading={loading}
      />
    </PageLayout>
  );
});
