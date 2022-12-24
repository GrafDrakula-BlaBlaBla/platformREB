import {IBaseListService} from '../BaseList/interfaces';
import {IMessageDTO} from '../../../Model/Messages';

export interface IMessagesService extends IBaseListService<IMessageDTO> {}
