import React from 'react';
import {useRoute} from 'react-router5';
import {observer} from 'mobx-react-lite';
import {ReactComponent as DocPageIcon} from '../../../../../../assets/svg/commonArea/DocPage.svg';
import {VIEW_MODEL} from '../../../../../../ViewModel/identifiers';
import {SStorage} from '../../../../../../Utils/Storage';
import {CFASubtitleNotify} from '../../../../../Components/CFA_Deal/CFASubtitleNotify';
import {ICFARequestRebViewModel} from '../../../../../../ViewModel/viewModels/CFA_Deal/request';
import {PageLayout} from '../../../../../Common/PageLayout';
import useRouterConst from '../../../../../hooks/useRouterConst';
import useViewModel from '../../../../../hooks/useViewModel';
import {NoData} from '../../../../../Common/SimpleComponents/NoData';
import {ITabProps, Tabs} from '../../../../../Common/TabsComponents';
import {CFASubtitle} from '../../../../../Components/CFA_Deal/CFASubtitle';

interface ICFADetailsManualProps {
  tabs: ITabProps[];
}

export const CFADetailsManual = observer((props: ICFADetailsManualProps) => {
  const {tabs} = props;

  const {route, router} = useRoute();
  const ROUTER_CONST = useRouterConst();

  const {data, loading} = useViewModel<ICFARequestRebViewModel>(
    VIEW_MODEL.CFARequest
  );

  const activeTab = route.params.tab;
  const onChangeTab = async (_: React.ChangeEvent<{}>, newValue: string) => {
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
    >
      {data ? (
        <Tabs activeTab={activeTab} tabs={tabs} onChangeTab={onChangeTab} />
      ) : (
        <NoData icon={<DocPageIcon />} message="Нет данных для отображения" />
      )}
    </PageLayout>
  );
});
