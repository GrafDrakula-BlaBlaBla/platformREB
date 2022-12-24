import {INotificationDTO} from '../../../Model/Notification';

export interface INotificationService {
  getALLNotificationMoch: () => INotificationDTO[];
}
