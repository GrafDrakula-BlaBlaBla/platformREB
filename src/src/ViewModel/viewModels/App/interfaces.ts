import {INotification} from '../../../Model/Notification';
import {IBaseViewModel} from '../Base/interfaces';

export interface IAppViewModel extends IBaseViewModel {
  notifications: INotification[];
  setGlobalLoading: (value: boolean) => void;
  sendNotification: (notification: INotification) => void;
  deleteNotification: (id?: string) => void;
  clearNotifications: () => void;
}
