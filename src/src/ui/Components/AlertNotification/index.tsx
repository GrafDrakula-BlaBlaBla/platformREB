import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import useViewModel from '../../hooks/useViewModel';
import {observer} from 'mobx-react-lite';
import {Slide} from '@material-ui/core';
import {VIEW_MODEL} from '../../../ViewModel/identifiers';
import {IAppViewModel} from '../../../ViewModel/viewModels/App/interfaces';
import {isHideNotifications} from '../../../Model/Session/mock';
import './index.less';

export const AlertNotification = observer(() => {
  const {notifications, deleteNotification} = useViewModel<IAppViewModel>(
    VIEW_MODEL.App
  );

  if (notifications.length === 0) {
    return null;
  }

  if (isHideNotifications) {
    return null;
  }
  return (
    <div className="notification-container">
      {notifications.map((notify) => {
        return (
          <div className="notification" key={notify.id}>
            <Slide
              data-id={notify.id}
              direction="left"
              in={notify.isOpen}
              onEntered={(elem) => {
                const parent = elem.parentElement;
                if (parent) {
                  parent.style.height = parent.offsetHeight + 'px';
                }
              }}
              onExited={(elem) => {
                const parent = elem.parentElement;
                if (parent) {
                  parent.style.height = '0px';
                  parent.style.marginBottom = '0px';
                }
              }}
            >
              <Snackbar
                className="notification-snackbar"
                anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                open
              >
                <div className="alert-notification">
                  <div
                    className={
                      notify.isError ? 'image-block error' : 'image-block'
                    }
                  >
                    <div
                      className={notify.isError ? 'error-icon' : 'success-icon'}
                    />
                  </div>
                  <div className="text-block">
                    <div
                      className={
                        notify.isError ? 'title-text error' : 'title-text'
                      }
                    >
                      {notify.title}
                    </div>
                    {notify.text}
                    <IconButton
                      onClick={() => deleteNotification(notify.id)}
                      className="close-btn"
                    >
                      <ClearIcon fontSize="small" />
                    </IconButton>
                  </div>
                </div>
              </Snackbar>
            </Slide>
          </div>
        );
      })}
    </div>
  );
});
