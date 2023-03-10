import React, {useEffect, useState} from 'react';
import {useRoute} from 'react-router5';
import {observer} from 'mobx-react-lite';
import {ReactComponent as DocPageIcon} from '../../../../../../assets/svg/commonArea/DocPage.svg';
import {SStorage} from '../../../../../../Utils/Storage';
import {CFASubtitleNotify} from '../../../../../Components/CFA_Deal/CFASubtitleNotify';
import useRouterConst from '../../../../../hooks/useRouterConst';
import useViewModel from '../../../../../hooks/useViewModel';
import {CFASubtitle} from '../../../../../Components/CFA_Deal/CFASubtitle';
import {CFAUsersAttach} from '../../../../../Components/CFA_Deal/CFAUsersAttach';
import {ICFARequestComViewModel} from '../../../../../../ViewModel/viewModels/CFA_Deal/request';
import {PageLayout} from '../../../../../Common/PageLayout';
import {LoaderWithBackdrop} from '../../../../../Common/SimpleComponents/LoaderWithBackdrop';
import {NoData} from '../../../../../Common/SimpleComponents/NoData';
import {ITabProps, Tabs} from '../../../../../Common/TabsComponents';
import {VIEW_MODEL} from '../../../../../../ViewModel/identifiers';
import {IButtonProps} from '../../../../../Common/SimpleComponents/Button';
import {DialogCFAConfirm} from '../../../../../Components/Dialogs/CreditForAccreditive/DialogCFAConfirm';
import {ECFADealStep} from '../../../../../../Model/CFA_Deal';
import {DialogCurator} from '../../../../../Components/Dialogs/CreditForAccreditive/DialogCurator';
import {DialogReason} from '../../../../../Components/Dialogs/DialogReason';

interface ICFADetailsApiProps {
  tabs: ITabProps[];
}

export const CFADetailsApi = observer((props: ICFADetailsApiProps) => {
  const {tabs} = props;

  const {route, router} = useRoute();
  const ROUTER_CONST = useRouterConst();

  const {
    data,
    loading,
    loadingUsers,
    loadingParameters,
    loadingConfirm,
    attachControllers,
    controllers,
    getControllers,
    getRequest,
    approveDeal,
    returnDeal,
  } = useViewModel<ICFARequestComViewModel>(VIEW_MODEL.CFARequest);

  const activeTab = route.params.tab;
  const onChangeTab = (_: React.ChangeEvent<{}>, newValue: string) => {
    router.navigate(ROUTER_CONST.CFA_DEAL.DETAILS.fullName, {
      tab: newValue,
      id: route.params.id,
      bankId: route.params.bankId,
    });
  };

  useEffect(() => {
    if (data?.dealStepStatus === ECFADealStep.CAN_SEND && !controllers) {
      getControllers();
    }
  }, [data, controllers, getControllers]);

  /** ???????????? ?? ?????????? ???????????????? */
  const buttons: IButtonProps[] = [];
  if (
    data?.dealStepStatus === ECFADealStep.CREATED ||
    data?.dealStepStatus === ECFADealStep.CAN_SEND
  ) {
    buttons.push({
      variant: 'contained',
      color: 'blue',
      children: '?????????????????? ?? ??????',
      onClick: () => setIsOpenSend(true),
      disabled: data?.dealStepStatus !== ECFADealStep.CAN_SEND,
    });
  }

  if (data?.dealStepStatus === ECFADealStep.SENDED) {
    buttons.push({
      variant: 'contained',
      color: 'blue',
      children: '?????????????????????? ????????????',
      onClick: () => setIsOpenConfirm(true),
    });
  }

  /** ???????????????????? ???????? ???????????????? ???????????? ?? ?????? */
  const [isOpenSend, setIsOpenSend] = useState<boolean>(false);
  const dialogSendButtons: IButtonProps[] = [];
  dialogSendButtons.push({
    variant: 'outlined',
    color: 'default',
    children: '??????????????',
    onClick: () => setIsOpenSend(false),
  });
  dialogSendButtons.push({
    variant: 'contained',
    color: 'blue',
    children: '??????????????????',
    onClick: () => setIsOpenCurator(true),
  });

  /** ???????????????????? ???????? ???????????????????? ???????????????? ???????????? */
  const [isOpenCurator, setIsOpenCurator] = useState<boolean>(false);
  const onCuratorSuccess = async (value?: string, name?: string) => {
    if (value) {
      return attachControllers(route.params.id, [value]).then(() => {
        setIsOpenSend(false);
        getRequest(route.params.id);
      });
    }
  };

  /** ???????????????????? ???????? ?????????????????????????? ???????????? */
  const [isOpenConfirm, setIsOpenConfirm] = useState<boolean>(false);
  const dialogConfirmButtons: IButtonProps[] = [];
  dialogConfirmButtons.push({
    variant: 'outlined',
    color: 'default',
    children: '??????????????',
    onClick: () => setIsOpenConfirm(false),
  });
  dialogConfirmButtons.push({
    variant: 'outlined',
    color: 'default',
    children: '?????????????? ???? ??????????????????',
    onClick: () => setIsOpenReason(true),
  });
  dialogConfirmButtons.push({
    variant: 'contained',
    color: 'blue',
    children: '?????????????????????? ????????????????',
    onClick: async () => {
      return approveDeal().then(() => {
        setIsOpenConfirm(false);
        getRequest(route.params.id);
      });
    },
  });

  /** ???????????????????? ???????? ???????????????? ???? ?????????????????? */
  const [isOpenReason, setIsOpenReason] = useState<boolean>(false);
  const onReasonSuccess = async (value?: string, name?: string) => {
    return returnDeal(value).then(() => {
      setIsOpenConfirm(false);
      getRequest(route.params.id);
    });
  };

  return (
    <PageLayout
      link={{
        title: '?? ???????????? ????????????',
        onClick: () => {
          const routeName = ROUTER_CONST.CFA_DEAL.fullName;
          router.navigate(
            routeName,
            SStorage.filters ? SStorage.filters[routeName] : undefined
          );
        },
      }}
      type="tabs"
      title="????????????"
      subtitle={<CFASubtitle data={data} loading={loading} />}
      subTitleElement={<CFASubtitleNotify />}
      filtersComponent={<CFAUsersAttach loading={loading} />}
      buttonGroupConfig={!loading ? buttons : undefined}
    >
      <LoaderWithBackdrop loading={loadingUsers || loadingParameters} />
      {data ? (
        <Tabs activeTab={activeTab} tabs={tabs} onChangeTab={onChangeTab} />
      ) : (
        <NoData icon={<DocPageIcon />} message="?????? ???????????? ?????? ??????????????????????" />
      )}
      <DialogCFAConfirm
        isOpen={isOpenSend}
        onClose={() => setIsOpenSend(false)}
        title="?????????????????? ???????????? ?? ??????"
        buttons={dialogSendButtons}
        loading={loadingConfirm}
      />
      <DialogCurator
        fieldName="controller"
        isOpen={isOpenCurator}
        onClose={() => setIsOpenCurator(false)}
        onSuccess={onCuratorSuccess}
        loading={loadingConfirm}
        items={controllers}
      />
      <DialogCFAConfirm
        isOpen={isOpenConfirm}
        onClose={() => setIsOpenConfirm(false)}
        title="?????????????????????? ????????????"
        buttons={dialogConfirmButtons}
        loading={loadingConfirm}
      />
      <DialogReason
        fieldName="reason"
        loading={loadingConfirm}
        isOpen={isOpenReason}
        onClose={() => setIsOpenReason(false)}
        onSuccess={onReasonSuccess}
      />
    </PageLayout>
  );
});
