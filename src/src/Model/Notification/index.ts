export interface INotificationDTO {
  isFresh: boolean;
  id?: number;
  notificationTitle: string;
  notificationText: string;
  notificationTime: string;
}

export interface INotification {
  id?: string;
  isOpen?: boolean;
  title: string;
  text: string | JSX.Element;
  isError?: boolean;
}
