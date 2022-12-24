import {INotificationDTO} from '../../../Model/Notification';
import {INotificationService} from './interfaces';

export class NotificationService implements INotificationService {
  getALLNotificationMoch(): INotificationDTO[] {
    return [
      {
        id: 1,
        isFresh: true,
        notificationTitle: 'Заявка на аккредитацию отправлена.',
        notificationText: '',
        notificationTime: 'Сегодня в 10:15',
      },
      {
        id: 2,
        isFresh: true,
        notificationTitle: 'Личный кабинет создан.',
        notificationText:
          'Пройдите аккредитацию для работы с продуктами и сервисами платформы.',
        notificationTime: 'Сегодня в 10:04',
      },
      {
        id: 3,
        isFresh: true,
        notificationTitle: 'Личный кабинет создан.',
        notificationText:
          'Пройдите аккредитацию для работы с продуктами и сервисами платформы.',
        notificationTime: 'Сегодня в 10:04',
      },
      {
        id: 4,
        isFresh: true,
        notificationTitle: 'Личный кабинет создан.',
        notificationText:
          'Пройдите аккредитацию для работы с продуктами и сервисами платформы.',
        notificationTime: 'Сегодня в 10:04',
      },
      {
        id: 5,
        isFresh: true,
        notificationTitle: 'Заявка на аккредитацию отправлена.',
        notificationText: '',
        notificationTime: 'Сегодня в 10:15',
      },
      {
        id: 6,
        isFresh: true,
        notificationTitle: 'Личный кабинет создан.',
        notificationText:
          'Пройдите аккредитацию для работы с продуктами и сервисами платформы.',
        notificationTime: 'Сегодня в 10:04',
      },
      {
        id: 7,
        isFresh: true,
        notificationTitle: 'Личный кабинет создан.',
        notificationText:
          'Пройдите аккредитацию для работы с продуктами и сервисами платформы.',
        notificationTime: 'Сегодня в 10:04',
      },
      {
        id: 8,
        isFresh: true,
        notificationTitle: 'Личный кабинет создан.',
        notificationText:
          'Пройдите аккредитацию для работы с продуктами и сервисами платформы.',
        notificationTime: 'Сегодня в 10:04',
      },
      {
        id: 9,
        isFresh: true,
        notificationTitle: 'Заявка на аккредитацию отправлена.',
        notificationText: '',
        notificationTime: 'Сегодня в 10:15',
      },
      {
        id: 10,
        isFresh: true,
        notificationTitle: 'Личный кабинет создан.',
        notificationText:
          'Пройдите аккредитацию для работы с продуктами и сервисами платформы.',
        notificationTime: 'Сегодня в 10:04',
      },
      {
        id: 11,
        isFresh: true,
        notificationTitle: 'Личный кабинет создан.',
        notificationText:
          'Пройдите аккредитацию для работы с продуктами и сервисами платформы.',
        notificationTime: 'Сегодня в 10:04',
      },
      {
        id: 12,
        isFresh: true,
        notificationTitle: 'Личный кабинет создан.',
        notificationText:
          'Пройдите аккредитацию для работы с продуктами и сервисами платформы.',
        notificationTime: 'Сегодня в 10:04',
      },
      {
        id: 13,
        isFresh: true,
        notificationTitle: 'Заявка на аккредитацию отправлена.',
        notificationText: '',
        notificationTime: 'Сегодня в 10:15',
      },
      {
        id: 14,
        isFresh: true,
        notificationTitle: 'Личный кабинет создан.',
        notificationText:
          'Пройдите аккредитацию для работы с продуктами и сервисами платформы.',
        notificationTime: 'Сегодня в 10:04',
      },
      {
        id: 15,
        isFresh: true,
        notificationTitle: 'Личный кабинет создан.',
        notificationText:
          'Пройдите аккредитацию для работы с продуктами и сервисами платформы.',
        notificationTime: 'Сегодня в 10:04',
      },
      {
        id: 16,
        isFresh: true,
        notificationTitle: 'Личный кабинет создан.',
        notificationText:
          'Пройдите аккредитацию для работы с продуктами и сервисами платформы.',
        notificationTime: 'Сегодня в 10:04',
      },
    ];
  }
}
