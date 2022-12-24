import {IToggleButtonConfig} from '../../Common/SimpleComponents/Toggle';
import {ITableColumn} from '../../Common/TableComponents';
import {ENotificationType, IMessageDTO} from '../../../Model/Messages';

/**
 * Конфиг для секций страницы нотификаций.
 */
export const notificationPageToggleButtonConfig: IToggleButtonConfig[] = [
  {
    label: 'Сообщения',
    value: ENotificationType.MESSAGE,
  },
  {
    label: 'События',
    value: ENotificationType.EVENTS,
  },
];

/**
 * Конфиг для отображения таблицы входящих сообщений.
 */
export const MessageTableConfig: {
  [key in keyof IMessageDTO]?: ITableColumn<IMessageDTO>;
} = {
  date: {
    label: 'Дата',
  },
  sender: {
    label: 'Отправитель',
  },
  theme: {
    label: 'Тема',
  },
  status: {
    label: 'Статус',
  },
};

/**
 * Конфиг для отображения таблицы входящих сообщений.
 */
export const EventsTableConfig: {
  [key in keyof IMessageDTO]?: ITableColumn<IMessageDTO>;
} = {
  date: {
    label: 'Дата',
  },
  theme: {
    label: 'Тема',
  },
  status: {
    label: 'Статус',
  },
};
