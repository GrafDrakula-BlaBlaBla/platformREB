import React from 'react';
import {useRoute} from 'react-router5';
import {observer} from 'mobx-react-lite';
import {ReactComponent as DocPageIcon} from '../../../../../../assets/svg/commonArea/DocPage.svg';
import {SStorage} from '../../../../../../Utils/Storage';
import {CFASubtitleNotify} from '../../../../../Components/CFA_Deal/CFASubtitleNotify';
import useRouterConst from '../../../../../hooks/useRouterConst';
import useViewModel from '../../../../../hooks/useViewModel';
import {CFASubtitle} from '../../../../../Components/CFA_Deal/CFASubtitle';
import {ICFARequestRebViewModel} from '../../../../../../ViewModel/viewModels/CFA_Deal/request';
import {PageLayout} from '../../../../../Common/PageLayout';
import {LoaderWithBackdrop} from '../../../../../Common/SimpleComponents/LoaderWithBackdrop';
import {NoData} from '../../../../../Common/SimpleComponents/NoData';
import {ITabProps, Tabs} from '../../../../../Common/TabsComponents';
import {VIEW_MODEL} from '../../../../../../ViewModel/identifiers';
import {CFAUsersAttach} from '../../../../../Components/CFA_Deal/CFAUsersAttach';

interface ICFADetailsApiProps {
  tabs: ITabProps[];
}

export const CFADetailsApi = observer((props: ICFADetailsApiProps) => {
  const {tabs} = props;

  const {route, router} = useRoute();
  const ROUTER_CONST = useRouterConst();

  const {data, loading, loadingUsers} = useViewModel<ICFARequestRebViewModel>(
    VIEW_MODEL.CFARequest
  );

  const activeTab = route.params.tab;
  const onChangeTab = (_: React.ChangeEvent<{}>, newValue: string) => {
    router.navigate(ROUTER_CONST.CFA_DEAL.DETAILS.fullName, {
      tab: newValue,
      id: route.params.id,
      bankId: route.params.bankId,
    });
  };

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
      filtersComponent={<CFAUsersAttach />}
    >
      <LoaderWithBackdrop loading={loadingUsers} />
      {data ? (
        <Tabs activeTab={activeTab} tabs={tabs} onChangeTab={onChangeTab} />
      ) : (
        <NoData icon={<DocPageIcon />} message="Нет данных для отображения" />
      )}
    </PageLayout>
  );
});
