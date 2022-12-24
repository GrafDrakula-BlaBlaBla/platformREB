import {makeAutoObservable} from 'mobx';
import {INotificationDTO} from '../../../Model/Notification';
import {INotificationService} from '../../../BusinessLayer/services/Notification/interfaces';
import {INotificationViewModel} from './interfaces';
import {inject, injectable} from 'inversify';
import {SERVICE} from '../../../BusinessLayer/identifiers';

@injectable()
export class NotificationViewModel implements INotificationViewModel {
  loading: boolean = false;
  notifications: INotificationDTO[] = [];
  @inject(SERVICE.Notification) private service!: INotificationService;

  constructor() {
    makeAutoObservable(this);
    this.notifications = this.service.getALLNotificationMoch();
  }

  getNotifications = (): INotificationDTO[] => {
    return this.notifications;
  };

  readAllNotifications = (): void => {
    this.notifications.forEach((notification) => {
      notification.isFresh = false;
    });
  };

  get newNotificationAmount(): number {
    return this.notifications.reduce(
      (newNotificationAmount, currentCount, index, notifications) => {
        return notifications[index].isFresh
          ? newNotificationAmount + 1
          : newNotificationAmount;
      },
      0
    );
  }
}
