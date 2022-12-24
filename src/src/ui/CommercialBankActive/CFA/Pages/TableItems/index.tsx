import {observer} from 'mobx-react-lite';
import React, {useContext, useState} from 'react';
import {useRoute} from 'react-router5';
import {PageLayout} from '../../../../Common/PageLayout';
import useRouterConst from '../../../../hooks/useRouterConst';
import {TableReports} from './TableReports';
import {CFAFilters} from '../../../../Components/CFA/CFAFilters';
import {TableDeals} from './TableDeals';
import useViewModel from '../../../../hooks/useViewModel';
import {VIEW_MODEL} from '../../../../../ViewModel/identifiers';
import {ICFA_ReportsCommercialViewModel} from '../../../../../ViewModel/viewModels/CFA_Reports';
import {ICFADraftComViewModel} from '../../../../../ViewModel/viewModels/CFA_Draft/draft/interfaces';
import {IAppViewModel} from '../../../../../ViewModel/viewModels/App/interfaces';
import {ICFA_ReportDTO} from '../../../../../Model/CFA_Reports';
import {ICFADraftDTO} from '../../../../../Model/CFA_Draft';
import {ECreditForAccreditiveTabs} from '../../../../app/settings/routes/routesBase';
import PermissionContext from '../../../../app/contexts/PremissionContext';
import {FieldValues, FormProvider, useForm} from 'react-hook-form';
import {LoaderWithBackdrop} from '../../../../Common/SimpleComponents/LoaderWithBackdrop';
import {DialogCreateReport} from '../../../../Components/Dialogs/CreditForAccreditive/DialogCreateReport';
import {DialogCreateDraft} from '../../../../Components/Dialogs/CreditForAccreditive/DialogCreateDraft';
import {ConfirmDialog} from '../../../../Components/Dialogs/ConfirmDialog';

export const TableItems = observer(() => {
  const ROUTER_CONST = useRouterConst();
  const {route, router} = useRoute();

  const {createReport, createReportEnable, loadingReport} = useViewModel<
    ICFA_ReportsCommercialViewModel
  >(VIEW_MODEL.CFA_Reports);

  const {
    isBankManual,
    loading: loadingDraft,
    createDraft,
    setData,
  } = useViewModel<ICFADraftComViewModel>(VIEW_MODEL.CFADraft);

  const {sendNotification} = useViewModel<IAppViewModel>(VIEW_MODEL.App);

  const [reportCreateModal, setReportCreateModal] = useState<{
    isOpen: boolean;
    isEnableCreate: boolean;
  }>({
    isOpen: false,
    isEnableCreate: false,
  });

  const [isOpenCreate, setIsOpenCreate] = useState<boolean>(false);
  const [isOpenExist, setIsOpenExist] = useState<boolean>(false);
  const [existText, setExistText] = useState<string>('');

  const onCloseCreateReport = () => {
    setReportCreateModal({
      isOpen: false,
      isEnableCreate: false,
    });
  };
  const onSuccessCreateReport = () => {
    createReport()
      .then((report: ICFA_ReportDTO) => {
        sendNotification({
          title: 'Отчёт сформирован и отправлен',
          text: (
            <div>
              Отчёт №<b>{report.objectId}</b> за период {report.period}{' '}
              сформирован и отправлен
            </div>
          ),
          isError: false,
        });
        router.navigate(ROUTER_CONST.CFA_REPORTS.fullName);
      })
      .catch((err) => {
        sendNotification({
          title: 'Ошибка формирования отчета',
          text: err.errorMessage || err.toString(),
          isError: true,
        });
      })
      .finally(() => {
        setReportCreateModal({
          isOpen: false,
          isEnableCreate: false,
        });
      });
  };

  const onCloseCreateDraft = () => {
    setIsOpenCreate(false);
  };
  const onSuccessCreateDraft = async (data: ICFADraftDTO) => {
    setData({...data, requestId: data.requestId?.trim()});
    createDraft()
      .then((draft) => {
        router.navigate(ROUTER_CONST.CFA_DRAFT.DETAILS.fullName, {
          id: draft.id,
          tab: ECreditForAccreditiveTabs.Request,
        });
      })
      .catch((err) => {
        setIsOpenCreate(false);
        if (err.errorMessage) {
          setExistText(err.errorMessage);
          setIsOpenExist(true);
        }
      });
  };

  const {isAccess} = useContext(PermissionContext);
  const canCreateReportUrl = 'credit-for-accreditive/report';
  const canCreateReport = isAccess(canCreateReportUrl, 'POST');

  const canCreateCFA_DealUrl = 'credit-for-accreditive/commercial';
  const canCreateCFA_Deal =
    isBankManual && isAccess(canCreateCFA_DealUrl, 'POST');

  const buttons = [];
  if (canCreateReport) {
    buttons.push({
      children: 'Сформировать отчет',
      whiteTheme: true,
      onClick: async () => {
        const isEnableCreate = await createReportEnable();
        setReportCreateModal({
          isOpen: true,
          isEnableCreate: isEnableCreate,
        });
      },
    });
  }

  if (canCreateCFA_Deal) {
    buttons.push({
      children: 'Завести сделку',
      whiteTheme: false,
      onClick: () => setIsOpenCreate(true),
    });
  }

  const methodsCreate = useForm<FieldValues>({
    mode: 'onChange',
  });

  return (
    <PageLayout
      type="table"
      title="Кредит под аккредитив"
      subTitleElement={<CFAFilters />}
      buttonGroupConfig={buttons}
      numberVisibleButton={2}
    >
      {route.name === ROUTER_CONST.CFA_DEAL.fullName && <TableDeals />}
      {route.name === ROUTER_CONST.CFA_REPORTS.fullName && <TableReports />}
      <LoaderWithBackdrop loading={loadingReport} />
      <DialogCreateReport
        isOpen={reportCreateModal.isOpen}
        isEnableCreate={reportCreateModal.isEnableCreate}
        onClose={onCloseCreateReport}
        onSuccess={onSuccessCreateReport}
      />
      <FormProvider {...methodsCreate}>
        <DialogCreateDraft
          isOpen={isOpenCreate}
          onClose={onCloseCreateDraft}
          onSuccess={onSuccessCreateDraft}
          loading={loadingDraft}
        />
      </FormProvider>
      <ConfirmDialog
        isOpen={isOpenExist}
        onClose={() => setIsOpenExist(false)}
        title={existText}
        buttons={[
          {
            children: 'Продолжить',
            variant: 'outlined',
            color: 'default',
          },
        ]}
      />
    </PageLayout>
  );
});
