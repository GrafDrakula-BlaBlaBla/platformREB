import React from 'react';
import {observer} from 'mobx-react-lite';
import {useRoute} from 'react-router5';
import {PageLayout} from '../../../../Common/PageLayout';
import useViewModel from '../../../../hooks/useViewModel';
import {ROUTER_CONST_CB} from '../../../../app/settings/routerConst/RouterConstCB';
import {formatDateString} from '../../../../../Utils/Date/DateFormat';
import {ITabProps, Tabs} from '../../../../Common/TabsComponents';
import {IAccreditationViewModel} from '../../../../../ViewModel/viewModels/Accreditation';
import {StatusWrapper} from '../../../../Components/Accreditation/StatusWrapper';
import {AccreditationParams} from '../AccreditationParams';
import {SStorage} from '../../../../../Utils/Storage';
import useRouterConst from '../../../../hooks/useRouterConst';
import {VIEW_MODEL} from '../../../../../ViewModel/identifiers';
import {Discussion} from '../../../../Common/Discussion';
import {EThreadMessageType} from '../../../../../Model/Discussion/Model';
import {IDiscussionComViewModel} from '../../../../../ViewModel/viewModels/Discussion';
import './index.less';

export enum EActiveTabsName {
  AccreditationParameters = 'accreditation-param',
  AccreditationDiscussion = 'accreditation-discuss',
}

export const AccreditationDetails = observer(() => {
  const {route, router} = useRoute();
  const activeTab = route.params.tab;
  const ROUTER_CONST = useRouterConst();
  const discussionViewModel = useViewModel<IDiscussionComViewModel>(
    VIEW_MODEL.Discussion
  );

  const {item, loading} = useViewModel<IAccreditationViewModel>(
    VIEW_MODEL.Accreditation
  );

  const handleTabTransfer = (_: React.ChangeEvent<{}>, newValue: string) => {
    router.navigate(ROUTER_CONST_CB.ACCREDITATION.DETAILS.fullName, {
      tab: newValue,
      id: route.params.id,
    });
  };

  const config: ITabProps[] = [
    {
      label: 'Параметры',
      value: EActiveTabsName.AccreditationParameters,
      content: <AccreditationParams />,
    },
    {
      label: 'Чат',
      value: EActiveTabsName.AccreditationDiscussion,
      content: (
        <Discussion
          viewModel={discussionViewModel}
          threadId={route.params.id as string}
          threadType={EThreadMessageType.ACCREDITATION}
        />
      ),
      className: 'tabs__panel_chat',
    },
  ];

  const handleSubtitle = () => {
    return (
      <span>
        {`№${item?.id} от ${formatDateString(item?.createdAt, 'DD.MM.YYYY')}. `}
        <>
          <b>Статус &nbsp;</b>
          <StatusWrapper status={item?.status} />
        </>
      </span>
    );
  };

  return (
    <PageLayout
      className="accreditation-details"
      title="Заявление на аккредитацию"
      type="tabs"
      link={{
        title: 'К списку заявлений',
        onClick: () => {
          const routeName = ROUTER_CONST.ACCREDITATION.fullName;
          router.navigate(
            routeName,
            SStorage.filters ? SStorage.filters[routeName] : undefined
          );
        },
      }}
      subtitle={loading ? '...' : handleSubtitle()}
    >
      <Tabs
        tabs={config}
        activeTab={activeTab}
        onChangeTab={handleTabTransfer}
      />
    </PageLayout>
  );
});
