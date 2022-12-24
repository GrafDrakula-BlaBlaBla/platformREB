import React, {useState, useContext} from 'react';
import PermissionContext from '../../../../../app/contexts/PremissionContext';
import {useRoute} from 'react-router5';
import {observer} from 'mobx-react-lite';
import EditIcon from '@material-ui/icons/Edit';
import {VIEW_MODEL} from '../../../../../../ViewModel/identifiers';
import {SStorage} from '../../../../../../Utils/Storage';
import {CFASubtitleNotify} from '../../../../../Components/CFA_Deal/CFASubtitleNotify';
import {ICFARequestComViewModel} from '../../../../../../ViewModel/viewModels/CFA_Deal/request';
import {PageLayout} from '../../../../../Common/PageLayout';
import useRouterConst from '../../../../../hooks/useRouterConst';
import useViewModel from '../../../../../hooks/useViewModel';
import {NoData} from '../../../../../Common/SimpleComponents/NoData';
import {ITabProps, Tabs} from '../../../../../Common/TabsComponents';
import {CFASubtitle} from '../../../../../Components/CFA_Deal/CFASubtitle';
import {ICFADraftComViewModel} from '../../../../../../ViewModel/viewModels/CFA_Draft/draft/interfaces';
import {ECreditForAccreditiveTabs} from '../../../../../app/settings/routes/routesBase';
import {ConfirmDialog} from '../../../../../Components/Dialogs/ConfirmDialog';
import {LoaderWithBackdrop} from '../../../../../Common/SimpleComponents/LoaderWithBackdrop';
import {ReactComponent as DocPageIcon} from '../../../../../../assets/svg/commonArea/DocPage.svg';

interface ICFADetailsManualProps {
  tabs: ITabProps[];
}

export const CFADetailsManual = observer((props: ICFADetailsManualProps) => {
  const {tabs} = props;

  const {route, router} = useRoute();
  const ROUTER_CONST = useRouterConst();

  const {data, loading} = useViewModel<ICFARequestComViewModel>(
    VIEW_MODEL.CFARequest
  );

  const {
    createDraftFromDeal,
    loading: loadingDraft,
    isBankManual,
  } = useViewModel<ICFADraftComViewModel>(VIEW_MODEL.CFADraft);

  const [isOpenExist, setIsOpenExist] = useState<boolean>(false);
  const [existText, setExistText] = useState<string>('');

  const activeTab = route.params.tab;
  const onChangeTab = async (_: React.ChangeEvent<{}>, newValue: string) => {
    router.navigate(ROUTER_CONST.CFA_DEAL.DETAILS.fullName, {
      tab: newValue,
      id: route.params.id,
    });
  };

  const onEdit = () => {
    createDraftFromDeal(route.params.id)
      .then((draft) => {
        router.navigate(ROUTER_CONST.CFA_DRAFT.DETAILS.fullName, {
          id: draft.id,
          tab: route.params.tab,
        });
      })
      .catch((err) => {
        if (err.errorMessage) {
          setExistText(err.errorMessage);
          setIsOpenExist(true);
        }
      });
  };

  const {isAccess} = useContext(PermissionContext);

  const canEdit = isAccess('credit-for-accreditive/draft/from-deal', 'POST');

  const buttons = [];
  if (
    isBankManual &&
    canEdit &&
    (route.params.tab === ECreditForAccreditiveTabs.Request ||
      route.params.tab === ECreditForAccreditiveTabs.Documents ||
      route.params.tab === ECreditForAccreditiveTabs.ExportContracts)
  ) {
    buttons.push({
      children: 'Редактировать',
      startIcon: <EditIcon />,
      onClick: onEdit,
    });
  }

  return (
    <PageLayout
      link={{
        title: 'К списку сделок',
        onClick: () => {
          const routeName = ROUTER_CONST.CFA_DEAL.fullName;
          router.navigate(
            routeName,
            SStorage.filters ? SStorage.filters[routeName] : undefined
          );
        },
      }}
      type="tabs"
      title="Сделка"
      subtitle={<CFASubtitle data={data} loading={loading} />}
      subTitleElement={<CFASubtitleNotify />}
      buttonGroupConfig={buttons}
      numberVisibleButton={2}
    >
      <LoaderWithBackdrop loading={loadingDraft} />
      {data ? (
        <Tabs activeTab={activeTab} tabs={tabs} onChangeTab={onChangeTab} />
      ) : (
        <NoData icon={<DocPageIcon />} message="Нет данных для отображения" />
      )}
      <ConfirmDialog
        isOpen={isOpenExist}
        onClose={() => setIsOpenExist(false)}
        title="Редактирование черновика в данный момент невозможно"
        text={existText}
        buttons={[
          {
            children: 'OK',
            variant: 'outlined',
            color: 'default',
          },
        ]}
      />
    </PageLayout>
  );
});
