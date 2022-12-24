import React, {ReactElement} from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import useViewModel from '../../hooks/useViewModel';
import {NotificationListItem} from './NotificationListItem';
import {VIEW_MODEL} from '../../../ViewModel/identifiers';
import {INotificationDTO} from '../../../Model/Notification';
import {INotificationViewModel} from '../../../ViewModel/viewModels/Notification/interfaces';

export const NotificationList = () => {
  const {notifications} = useViewModel<INotificationViewModel>(
    VIEW_MODEL.Notifications
  );
  const renderListContent = (
    notifications: INotificationDTO[]
  ): ReactElement[] => {
    return notifications.map((notification) => {
      return (
        <NotificationListItem
          key={notification.id}
          isFresh={notification.isFresh}
          notificationTitle={notification.notificationTitle}
          notificationText={notification.notificationText}
          notificationTime={notification.notificationTime}
          onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            console.log(`NotificationListItem click on id:${notification.id}`);
          }}
        />
      );
    });
  };
  return (
    <List>
      {renderListContent(notifications).map((listItem) => {
        return (
          <React.Fragment key={listItem.key}>
            <ListItem>{listItem}</ListItem>
            <Divider />
          </React.Fragment>
        );
      })}
    </List>
  );
};
