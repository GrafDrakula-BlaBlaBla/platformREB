import {action, makeObservable, observable} from 'mobx';
import {BaseViewModel} from '../Base';
import {uuidv4} from '../../../Utils/Uid';
import {IAppViewModel} from './interfaces';
import {IAppService} from '../../../BusinessLayer/services/App/interfaces';
import {INotification} from '../../../Model/Notification';
import {inject, injectable} from 'inversify';
import {SERVICE} from '../../../BusinessLayer/identifiers';

const TIME_OUT_DELETE = 10000;

@injectable()
export class AppViewModel extends BaseViewModel implements IAppViewModel {
  @inject(SERVICE.App) private service!: IAppService;

  constructor() {
    super();
    makeObservable(this, {
      notifications: observable,
      setNotifications: action,
      addNotification: action,
      sendNotification: action,
      deleteNotification: action,
      clearNotifications: action,
    });
  }

  notifications: INotification[] = [];

  setNotifications = (notifications: INotification[]) => {
    this.notifications = notifications;
  };

  setGlobalLoading = (value: boolean) => {
    if (value) {
      this.setLoading();
    } else {
      this.unsetLoading();
    }
  };

  addNotification = (notification: INotification) => {
    notification.id = uuidv4();
    notification.isOpen = true;
    let notifications = [...this.notifications];
    notifications.push(notification);
    this.setNotifications(notifications);
    return notification.id;
  };

  sendNotification = (notification: INotification) => {
    const id = this.addNotification(notification);
    setTimeout(() => {
      this.deleteNotification(id);
    }, TIME_OUT_DELETE);
  };

  deleteNotification = (id?: string) => {
    const notifications = this.notifications.map((item) => {
      if (item.id === id) {
        item.isOpen = false;
      }
      return item;
    });
    this.setNotifications(notifications);
  };

  clearNotifications = () => {
    this.setNotifications([]);
  };
}
