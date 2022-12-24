import React, {useEffect} from 'react';
import {PageLayout} from '../../../../Common/PageLayout';
import useViewModel from '../../../../hooks/useViewModel';
import {Table} from '../../../../Common/TableComponents';
import {observer} from 'mobx-react-lite';
import {useRoute} from 'react-router5';
import {RegisterTableConfig} from '../Config';
import {useFilters} from '../../../../hooks/useFilters';
import {Loader} from '../../../../Common/SimpleComponents/Loader';
import {TableRegistersFilters} from './TableRegistersFilters';
import {ROUTER_CONST_CB_ACTIVE} from '../../../../app/settings/routerConst/RouterConstCBActive';
import {VIEW_MODEL} from '../../../../../ViewModel/identifiers';
import {IRegistriesDTO} from '../../../../../Model/Registries';
import {IListViewModel} from '../../../../../ViewModel/viewModels/List/interfaces';
import {ReactComponent as ListIcon} from '../../../../../assets/svg/commonArea/List.svg';

export const TableRegisters = observer(() => {
  const {router} = useRoute();

  const {list, loading, initList} = useViewModel<
    IListViewModel<IRegistriesDTO>
  >(VIEW_MODEL.Registries);

  const {subscribeOnFilters} = useFilters();
  useEffect(() => {
    subscribeOnFilters((filters) => {
      initList(filters);
    });
    // eslint-disable-next-line
  }, []);

  return (
    <PageLayout title="Реестры">
      <TableRegistersFilters />
      {loading ? (
        <Loader />
      ) : (
        <Table<IRegistriesDTO>
          onRowClick={(row) => {
            router.navigate(
              ROUTER_CONST_CB_ACTIVE.REGISTRIES.DETAILS.fullName,
              {
                id: row.objectId,
              }
            );
          }}
          data={list}
          config={RegisterTableConfig}
          emptyInfo={{
            icon: <ListIcon />,
          }}
          pagination
        />
      )}
    </PageLayout>
  );
});
