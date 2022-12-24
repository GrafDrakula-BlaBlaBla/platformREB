import {BaseListService} from '../BaseList';
import {IMessagesApiClient} from '../../../IntegrationLayer/APIClients/Messages/interfaces';
import {IMessagesService} from './interfaces';
import {IMessageDTO} from '../../../Model/Messages';
import {inject, injectable} from 'inversify';
import {API_CLIENT} from '../../../IntegrationLayer/identifiers';

@injectable()
export class MessagesService
  extends BaseListService<IMessageDTO, IMessagesApiClient>
  implements IMessagesService {
  @inject(API_CLIENT.Messages) protected APIClient!: IMessagesApiClient;
}
