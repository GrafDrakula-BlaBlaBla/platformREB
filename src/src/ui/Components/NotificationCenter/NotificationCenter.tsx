import React, {useState} from 'react';
import {sectionsAndTabsManaging} from './Utils';
import {PageLayout} from '../../Common/PageLayout';
import {ITabProps, Tabs} from '../../Common/TabsComponents';
import {Toggle} from '../../Common/SimpleComponents/Toggle';
import {useRoute} from 'react-router5';
import useRouterConst from '../../hooks/useRouterConst';
import {notificationPageToggleButtonConfig} from './Config';
import useViewModel from '../../hooks/useViewModel';
import {observer} from 'mobx-react-lite';
import {MessageTable} from './Components/MessageTable';
import {MessageModal} from './Components/MessageModal';
import {EMessageType, ENotificationType} from '../../../Model/Messages';
import {VIEW_MODEL} from '../../../ViewModel/identifiers';
import {IMessagesViewModel} from '../../../ViewModel/viewModels/Messages/interfaces';

export const NotificationCenter = observer(() => {
  const {route, router} = useRoute();
  const routerConst = useRouterConst();
  const {loading} = useViewModel<IMessagesViewModel>(VIEW_MODEL.Messages);
  const activeSection = route.params.section;
  const activeTab = route.params.tab;
  const [openModal, setOpenModal] = useState<boolean>(false);

  /**
   * Конфиг табов для сообщений.
   */
  const notificationPageTabsConfig: ITabProps[] = [
    {
      label: 'Входящие',
      value: EMessageType.INBOX,
      content: <MessageTable type={ENotificationType.MESSAGE} />,
    },
    {
      label: 'Отправленные',
      value: EMessageType.OUTBOX,
      content: <MessageTable type={ENotificationType.MESSAGE} />,
    },
  ];

  sectionsAndTabsManaging(router, route, routerConst);

  const handleChangeTab = (_: React.ChangeEvent<{}>, tab: string) => {
    const params = route.params;
    router.navigate(routerConst.NOTIFICATION_CENTER.fullName, {...params, tab});
  };

  const handleChangeToggle = (_: any, section: string) => {
    const params = route.params;
    if (section) {
      router.navigate(routerConst.NOTIFICATION_CENTER.fullName, {
        ...params,
        section,
      });
    }
  };

  const toggleCreatedModal = () => setOpenModal((prevState) => !prevState);

  return (
    <PageLayout
      loading={loading}
      title="Центр уведомлений"
      buttonGroupConfig={[
        {children: 'Новое сообщение', onClick: toggleCreatedModal},
      ]}
      subTitleElement={
        <Toggle
          items={notificationPageToggleButtonConfig}
          onChange={handleChangeToggle}
          activeValue={activeSection}
        />
      }
    >
      {activeSection === ENotificationType.MESSAGE ? (
        <Tabs
          tabs={notificationPageTabsConfig}
          activeTab={activeTab}
          onChangeTab={handleChangeTab}
        />
      ) : (
        <MessageTable type={ENotificationType.EVENTS} />
      )}
      <MessageModal isOpen={openModal} onClose={toggleCreatedModal} />
    </PageLayout>
  );
});
