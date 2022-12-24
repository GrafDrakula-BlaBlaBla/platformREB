import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import useViewModel from '../../hooks/useViewModel';
import {observer} from 'mobx-react-lite';
import {NotificationList} from './NotificationList';
import {BringNotification} from './BringNotification';
import {VIEW_MODEL} from '../../../ViewModel/identifiers';
import {INotificationViewModel} from '../../../ViewModel/viewModels/Notification/interfaces';
import './index.less';

interface IProps {
  onClick: () => void;
}

export const NotificationPanel = observer(({onClick}: IProps) => {
  const {readAllNotifications, newNotificationAmount} = useViewModel<
    INotificationViewModel
  >(VIEW_MODEL.Notifications);

  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (open: boolean) => () => {
    //@todo: Хардкодище. В дальнейшем информация о прочитанных сообщениях будет приходить с бэка.
    if (!open) {
      readAllNotifications();
    }
    setOpen(open);
  };

  return (
    <div className="NotificationPanel">
      <BringNotification
        onClick={() => {
          onClick();
          toggleDrawer(true)();
        }}
        newNotificationAmount={newNotificationAmount}
        open={open}
      />
      <Drawer
        className="NotificationPanel-Drawer"
        anchor="right"
        open={open}
        onClose={toggleDrawer(false)}
      >
        <div className="UserLabel-SlideRight">
          <NotificationList />
        </div>
      </Drawer>
    </div>
  );
});
