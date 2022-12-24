import React, {useEffect} from 'react';
import {observer} from 'mobx-react-lite';
import {useRoute} from 'react-router5';
import {PageLayout} from '../../../../Common/PageLayout';
import {Table} from '../../../../Common/TableComponents';
import useRouterConst from '../../../../hooks/useRouterConst';
import useViewModel from '../../../../hooks/useViewModel';
import {TableBanksConfig} from '../config';
import {useFilters} from '../../../../hooks/useFilters';
import {ICFA_BankDTO} from '../../../../../Model/Banks';
import {VIEW_MODEL} from '../../../../../ViewModel/identifiers';
import {IBankViewModel} from '../../../../../ViewModel/viewModels/Banks';
import {ReactComponent as BankIcon} from '../../../../../assets/svg/commonArea/BankIcon.svg';

export const TableBanks = observer(() => {
  const ROUTER_CONST = useRouterConst();
  const {router, route} = useRoute();

  const {
    BankForCFA: {list, total, loading, initList, setList},
  } = useViewModel<IBankViewModel>(VIEW_MODEL.Banks);

  const {subscribeOnFilters} = useFilters();

  useEffect(() => {
    initList(route.params);
    subscribeOnFilters((filters) => {
      initList(filters);
    });
    // eslint-disable-next-line
  }, []);

  return (
    <PageLayout title="Банки" type="table">
      <Table
        data={list}
        config={TableBanksConfig}
        onRowClick={(row: ICFA_BankDTO) =>
          router.navigate(ROUTER_CONST.CFA_DEAL.fullName, {
            bankId: row.bankId,
          })
        }
        onSortCallback={(data) => setList(data)}
        emptyInfo={{icon: <BankIcon />}}
        pagination
        total={total}
        loading={loading}
      />
    </PageLayout>
  );
});
