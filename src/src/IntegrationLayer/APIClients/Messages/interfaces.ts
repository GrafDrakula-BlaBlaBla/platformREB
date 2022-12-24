import {Params} from 'router5/dist/types/base';
import {IMessageDTO} from '../../../Model/Messages';

export interface IMessagesApiClient {
  getItems: (searchParams?: Params) => Promise<IMessageDTO[]>;
}
