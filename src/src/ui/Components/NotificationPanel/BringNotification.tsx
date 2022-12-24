import React from 'react';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Badge from '@material-ui/core/Badge';

interface IProps {
  newNotificationAmount: number;
  onClick: (event: React.KeyboardEvent | React.MouseEvent) => void;
  open: boolean;
}
export const BringNotification = (props: IProps) => {
  return (
    <div onClick={props.onClick} className="BringNotification">
      <Badge
        badgeContent={props.newNotificationAmount}
        className="BringNotification-Dot"
        variant="dot"
      >
        <NotificationsIcon
          className={`BringNotification-Bring ${props.open ? 'active' : ''}`}
        />
      </Badge>
    </div>
  );
};
