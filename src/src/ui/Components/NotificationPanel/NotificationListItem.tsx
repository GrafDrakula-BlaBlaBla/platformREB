import React from 'react';
import {observer} from 'mobx-react-lite';

interface IProps {
  isFresh: boolean;
  notificationTitle: string;
  notificationText?: string;
  notificationTime: string;
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export const NotificationListItem = observer((props: IProps) => {
  return (
    <div className="NotificationListItem">
      <div
        className={`NotificationListItem-LittleCircle_red ${
          props.isFresh ? '' : 'NotificationListItem-LittleCircle_opacity'
        }`}
      />
      <div className="NotificationListItem-Content">
        <h3 className="Content-Title" onClick={props.onClick}>
          {props.notificationTitle}
        </h3>
        <p className="Content-Text">{props.notificationText}</p>
        <p className="Content-Time">{props.notificationTime}</p>
      </div>
    </div>
  );
});
