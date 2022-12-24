import {INotificationDTO} from '../../../Model/Notification';

export interface INotificationViewModel {
  loading: boolean;
  notifications: INotificationDTO[];
  getNotifications(): INotificationDTO[];
  newNotificationAmount: number;
  readAllNotifications(): void;
}
