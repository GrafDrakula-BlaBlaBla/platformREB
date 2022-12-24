import {ListViewModel} from '../List';
import {IMessagesViewModel} from './interfaces';
import {IMessageDTO} from '../../../Model/Messages';
import {IMessagesService} from '../../../BusinessLayer/services/Messages/interfaces';
import {inject, injectable} from 'inversify';
import {SERVICE} from '../../../BusinessLayer/identifiers';

@injectable()
export class MessagesViewModel
  extends ListViewModel<IMessageDTO, IMessagesService>
  implements IMessagesViewModel {
  @inject(SERVICE.Messages) protected service!: IMessagesService;
}
