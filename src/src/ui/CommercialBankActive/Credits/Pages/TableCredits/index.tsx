import React, {useEffect, useState} from 'react';
import {PageLayout} from '../../../../Common/PageLayout';
import useViewModel from '../../../../hooks/useViewModel';
import {observer} from 'mobx-react-lite';
import {CreditsTable} from '../../../../Components/CreditsTable';
import {DialogReportCreation} from '../../../../Components/Dialogs/DialogReportCreation';
import {useRoute} from 'react-router5';
import {ICreditDTO} from '../../../../../Model/Credits';
import {useFilters} from '../../../../hooks/useFilters';
import {Loader} from '../../../../Common/SimpleComponents/Loader';
import {TableCreditsFilters} from './TableCreditsFilters';
import {ROUTER_CONST_CB_ACTIVE} from '../../../../app/settings/routerConst/RouterConstCBActive';
import {IButtonProps} from '../../../../Common/SimpleComponents/Button';
import {IRegistriesViewModel} from '../../../../../ViewModel/viewModels/Registries/interfaces';
import {VIEW_MODEL} from '../../../../../ViewModel/identifiers';
import {IReportsViewModel} from '../../../../../ViewModel/viewModels/Reports/interfaces';
import {ICreditsViewModel} from '../../../../../ViewModel/viewModels/Credits/interfaces';
import './index.less';

export const TableCredits = observer(() => {
  const {router} = useRoute();

  const {list, loading, deleteCredit, initList} = useViewModel<
    ICreditsViewModel
  >(VIEW_MODEL.Credits);
  const registriesState = useViewModel<IRegistriesViewModel>(
    VIEW_MODEL.Registries
  );

  const reportsState = useViewModel<IReportsViewModel>(VIEW_MODEL.Reports);

  const onSuccessReportCreate = () => {
    reportsState.createItem().then((res) => {
      router.navigate(ROUTER_CONST_CB_ACTIVE.REPORTS.fullName);
    });
  };
  const [isOpenModal, setIsOpenModal] = useState(false);

  const onCloseReportCreator = () => {
    setIsOpenModal(false);
  };

  const createRegistry = () => {
    registriesState.createItem().then((res) => {
      router.navigate(ROUTER_CONST_CB_ACTIVE.REGISTRIES.fullName);
    });
  };

  const handleRemove = (credit: ICreditDTO) => deleteCredit(credit.creditId);

  const ButtonsGroupConfig: IButtonProps[] = [
    {
      children: 'Сформировать реестр',
      whiteTheme: true,
      onClick: createRegistry,
    },
    {
      children: 'Сформировать отчет',
      onClick: () => {
        setIsOpenModal(true);
      },
    },
  ];

  const {subscribeOnFilters} = useFilters();
  useEffect(() => {
    subscribeOnFilters((filters) => {
      initList(filters);
    });
    // eslint-disable-next-line
  }, []);

  return (
    <PageLayout
      title="Кредиты"
      buttonGroupConfig={ButtonsGroupConfig}
      numberVisibleButton={2}
    >
      <DialogReportCreation
        isOpen={isOpenModal}
        onClose={onCloseReportCreator}
        onSuccess={onSuccessReportCreate}
      />
      <TableCreditsFilters />
      {loading ? (
        <Loader />
      ) : (
        <CreditsTable onRemove={handleRemove} pagination creditsData={list} />
      )}
    </PageLayout>
  );
});
