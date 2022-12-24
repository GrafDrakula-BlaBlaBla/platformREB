import {Params} from 'router5/dist/types/base';
import {IMessageDTO} from '../../../Model/Messages';
import {IMessagesApiClient} from './interfaces';
import {
  EventsMock,
  InboxMessages,
  OutboxMessages,
} from '../../../Model/Messages/mock';
import {injectable} from 'inversify';

@injectable()
export class MessagesApiClient implements IMessagesApiClient {
  getItems = (searchParams?: Params) => {
    if (searchParams?.tab === 'inbox') {
      return new Promise<IMessageDTO[]>((resolve) =>
        setTimeout(() => resolve(InboxMessages), 1000)
      );
    } else if (searchParams?.tab === 'outbox') {
      return new Promise<IMessageDTO[]>((resolve) =>
        setTimeout(() => resolve(OutboxMessages), 1000)
      );
    } else {
      return new Promise<IMessageDTO[]>((resolve) =>
        setTimeout(() => resolve(EventsMock), 1000)
      );
    }
  };
}
