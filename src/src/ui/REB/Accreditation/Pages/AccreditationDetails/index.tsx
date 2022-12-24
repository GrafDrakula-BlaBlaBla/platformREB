import React from 'react';
import {observer} from 'mobx-react-lite';
import {useRoute} from 'react-router5';
import useViewModel from '../../../../hooks/useViewModel';
import {IAccreditationViewModel} from '../../../../../ViewModel/viewModels/Accreditation';
import {ROUTER_CONST_REB} from '../../../../app/settings/routerConst/RouterConstREB';
import {formatDateString} from '../../../../../Utils/Date/DateFormat';
import {StatusWrapper} from '../../../../Components/Accreditation/StatusWrapper';
import {PageLayout} from '../../../../Common/PageLayout';
import {AccreditationParams} from '../AccreditationParams';
import {ITabProps, Tabs} from '../../../../Common/TabsComponents';
import {SStorage} from '../../../../../Utils/Storage';
import useRouterConst from '../../../../hooks/useRouterConst';
import {VIEW_MODEL} from '../../../../../ViewModel/identifiers';
import {Discussion} from '../../../../Common/Discussion';
import {EThreadMessageType} from '../../../../../Model/Discussion/Model';
import {IDiscussionRebViewModel} from '../../../../../ViewModel/viewModels/Discussion';
import './index.less';

export enum EActiveTabsName {
  AccreditationParameters = 'accreditation-param',
  AccreditationDiscussion = 'accreditation-discuss',
}

export const AccreditationDetails = observer(() => {
  const {route, router} = useRoute();
  const activeTab = route.params.tab;
  const ROUTER_CONST = useRouterConst();

  const discussionViewModel = useViewModel<IDiscussionRebViewModel>(
    VIEW_MODEL.Discussion
  );

  const {item, loading} = useViewModel<IAccreditationViewModel>(
    VIEW_MODEL.Accreditation
  );

  const handleTabTransfer = (_: React.ChangeEvent<{}>, newValue: string) => {
    router.navigate(ROUTER_CONST_REB.ACCREDITATION.DETAILS.fullName, {
      tab: newValue,
      id: route.params.id,
      bankInfoId: route.params.bankInfoId,
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
          threadId={route.params.id}
          threadType={EThreadMessageType.ACCREDITATION}
          recipientBankId={route.params.bankInfoId}
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
          router.navigate(routeName, {
            bankInfoId: route.params.bankInfoId,
            ...(SStorage.filters ? SStorage.filters[routeName] : {}),
          });
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
