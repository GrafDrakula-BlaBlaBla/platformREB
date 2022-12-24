export interface IMessageDTO {
  id?: string;
  date: string;
  theme: string;
  sender?: string;
  status: string;
}

/**
 * Типы уведомлений
 */
export enum ENotificationType {
  MESSAGE = 'message',
  EVENTS = 'events',
}

/**
 * Табы в сообщениях
 */
export enum EMessageType {
  INBOX = 'inbox',
  OUTBOX = 'outbox',
}
