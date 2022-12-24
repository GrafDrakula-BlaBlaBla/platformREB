import React, {useEffect, useState} from 'react';
import {useRoute} from 'react-router5';
import {observer} from 'mobx-react-lite';
import {ReactComponent as DocPageIcon} from '../../../../../assets/svg/commonArea/DocPage.svg';
import useViewModel from '../../../../hooks/useViewModel';
import useRouterConst from '../../../../hooks/useRouterConst';
import {VIEW_MODEL} from '../../../../../ViewModel/identifiers';
import {ICFADraftComViewModel} from '../../../../../ViewModel/viewModels/CFA_Draft/draft/interfaces';
import {SStorage} from '../../../../../Utils/Storage';
import {Button, IButtonProps} from '../../../../Common/SimpleComponents/Button';
import {PageLayout} from '../../../../Common/PageLayout';
import {CFADraftTitle} from './CFADraftTitle';
import {Tabs} from '../../../../Common/TabsComponents';
import {CFA_TABS_DRAFT} from './tabs';
import {NoData} from '../../../../Common/SimpleComponents/NoData';
import {ConfirmDialog} from '../../../../Components/Dialogs/ConfirmDialog';
import {CFADraftNotify} from './CFADraftNotify';
import {CFASubtitle} from '../../../../Components/CFA_Deal/CFASubtitle';
import {CFARequestSkeleton} from '../../../../Components/CFA_Deal/CFARequestSkeleton';
import {ICFADraftDocumentComViewModel} from '../../../../../ViewModel/viewModels/CFA_Draft/document/interfaces';
import {ICFADraftExportContractComViewModel} from '../../../../../ViewModel/viewModels/CFA_Draft/exportContract/interfaces';
import {DialogCFADraftConfirm} from '../../../../Components/Dialogs/CreditForAccreditiveDraft/DialogCFADraftConfirm';
import {LoaderWithBackdrop} from '../../../../Common/SimpleComponents/LoaderWithBackdrop';
import {ECreditForAccreditiveTabs} from '../../../../app/settings/routes/routesBase';

export const CFADraft = observer(() => {
  const {route, router} = useRoute();
  const ROUTER_CONST = useRouterConst();

  const {
    data,
    loading,
    isCreation,
    isEdit,
    isCreated,
    isFinished,
    isCanceled,
    updateDraft,
    executeDraft,
    deleteDraft,
    isDirty: isDirtyRequest,
    setIsDirty: setIsDirtyRequest,
    setIsValid: setIsValidRequest,
    setData,
  } = useViewModel<ICFADraftComViewModel>(VIEW_MODEL.CFADraft);
  const {
    setList: setContracts,
    saveDirty: saveContracts,
    isDirty: isDirtyContracts,
  } = useViewModel<ICFADraftExportContractComViewModel>(
    VIEW_MODEL.CFADraftExportContract
  );
  const {setDocumentList} = useViewModel<ICFADraftDocumentComViewModel>(
    VIEW_MODEL.CFADraftDocument
  );

  const [modalDelete, setModalDelete] = useState<boolean>(false);
  const [modalExit, setModalExit] = useState<boolean>(false);
  const [modalExist, setModalExist] = useState<boolean>(false);
  const [modalConfirm, setModalConfirm] = useState<boolean>(false);
  const [existText, setExistText] = useState<string>('');

  const activeTab = route.params.tab;
  const onChangeTab = async (_: React.ChangeEvent<{}>, newValue: string) => {
    if (route.name === ROUTER_CONST.CFA_DRAFT.DETAILS.fullName) {
      router.navigate(ROUTER_CONST.CFA_DRAFT.DETAILS.fullName, {
        tab: newValue,
        id: route.params.id,
      });
    }
    if (route.name === ROUTER_CONST.CFA_DRAFT_CANCELLED.DETAILS.fullName) {
      router.navigate(ROUTER_CONST.CFA_DRAFT_CANCELLED.DETAILS.fullName, {
        tab: newValue,
        id: route.params.id,
      });
    }
  };

  const onDelete = async () => {
    await deleteDraft(route.params.id);
    exit();
  };

  const onSaveAllAndBack = async () => {
    await save();
    exit();
  };
  const onSaveRequest = async () => {
    if (isDirtyRequest) await updateDraft();
  };
  const onExecute = async () => {
    await save();
    executeDraft()
      .then(exit)
      .catch((err) => {
        setExistText(err.errorMessage);
        setModalExist(true);
      });
  };
  const save = async () => {
    if (isDirtyRequest) await updateDraft();
    if (isDirtyContracts) await saveContracts(data?.id as string);
  };

  const onExit = () => {
    if (isDirtyRequest || isDirtyContracts) {
      setModalExit(true);
    } else {
      exit();
    }
  };
  const exit = () => {
    if (route.name === ROUTER_CONST.CFA_DRAFT.DETAILS.fullName) {
      const routeName = ROUTER_CONST.CFA_DRAFT.fullName;
      router.navigate(
        routeName,
        SStorage.filters ? SStorage.filters[routeName] : undefined
      );
    }
    if (route.name === ROUTER_CONST.CFA_DRAFT_CANCELLED.DETAILS.fullName) {
      const routeName = ROUTER_CONST.CFA_DRAFT_CANCELLED.fullName;
      router.navigate(
        routeName,
        SStorage.filters ? SStorage.filters[routeName] : undefined
      );
    }
  };
  const clearData = () => {
    setData();
    setContracts();
    setDocumentList();
    setIsDirtyRequest(false);
    setIsValidRequest(true);
  };

  const manualButtons: IButtonProps[] = [];
  manualButtons.push({
    children: 'Удалить',
    variant: 'outlined',
    color: 'red',
    onClick: () => setModalDelete(true),
  });
  manualButtons.push({
    children: 'Отправить',
    onClick: () => setModalConfirm(true),
  });

  const footer =
    isCreated && route.params.tab === ECreditForAccreditiveTabs.Request
      ? {
          buttonsGroup: (
            <Button
              variant="outlined"
              color="default"
              onClick={onSaveRequest}
              disabled={!isDirtyRequest}
            >
              Сохранить
            </Button>
          ),
        }
      : undefined;

  useEffect(() => {
    return () => clearData();
    // eslint-disable-next-line
  }, []);

  return (
    <PageLayout
      link={{
        title: 'К списку черновиков',
        onClick: onExit,
      }}
      type={loading && !data ? 'default' : 'tabs'}
      title="Черновик"
      titleExtra={
        <CFADraftTitle
          loading={loading}
          create={isCreated && isCreation}
          edit={isCreated && isEdit}
          finished={isFinished}
          canceled={isCanceled}
        />
      }
      subtitle={<CFASubtitle data={data} loading={loading} />}
      subTitleElement={isCreated && isCreation ? <CFADraftNotify /> : undefined}
      buttonGroupConfig={isCreated ? manualButtons : undefined}
      numberVisibleButton={2}
      footer={footer}
    >
      {data ? (
        <React.Fragment>
          <LoaderWithBackdrop loading={loading} />
          <Tabs
            activeTab={activeTab}
            tabs={CFA_TABS_DRAFT}
            onChangeTab={onChangeTab}
          />
        </React.Fragment>
      ) : loading ? (
        <CFARequestSkeleton />
      ) : (
        <NoData icon={<DocPageIcon />} message="Нет данных для отображения" />
      )}
      <ConfirmDialog
        isOpen={modalDelete}
        onClose={() => setModalDelete(false)}
        title={'Уверены что хотите удалить черновик?'}
        buttons={[
          {
            children: 'Удалить черновик',
            variant: 'outlined',
            color: 'red',
            onClick: onDelete,
          },
          {
            children: 'Не удалять',
            variant: 'outlined',
            color: 'default',
          },
        ]}
      />
      <ConfirmDialog
        isOpen={modalExit}
        onClose={() => setModalExit(false)}
        title="Уверены что хотите завершить создание сделки?"
        buttons={[
          {
            children: 'Выйти без сохранения',
            variant: 'outlined',
            color: 'red',
            onClick: exit,
          },
          {
            children: 'Сохранить черновик',
            variant: 'outlined',
            color: 'default',
            onClick: onSaveAllAndBack,
          },
        ]}
      />
      <ConfirmDialog
        isOpen={modalExist}
        onClose={() => setModalExist(false)}
        title={existText}
        buttons={[
          {
            children: 'Продолжить',
            variant: 'outlined',
            color: 'default',
          },
        ]}
      />
      <DialogCFADraftConfirm
        isOpen={modalConfirm}
        onClose={() => setModalConfirm(false)}
        onExecute={onExecute}
      />
    </PageLayout>
  );
});
