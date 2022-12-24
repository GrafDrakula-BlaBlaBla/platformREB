import {IDiscussionGETParams} from '../../../IntegrationLayer/APIClients/Discussion/interfaces';
import {IBaseListDTO} from '../../../Model/BaseList';
import {IDiscussionMessageDTO} from '../../../Model/Discussion/Model';

export interface IDiscussionService {
  getMessages(
    params: IDiscussionGETParams
  ): Promise<IBaseListDTO<IDiscussionMessageDTO>>;
  editMessage(message: IDiscussionMessageDTO): Promise<boolean>;
  deleteMessage(messageId: string): Promise<boolean>;
}

export type IMapMessagesOnDay = Map<string, Partial<IDiscussionMessageDTO>[]>;

export interface IDiscussionComService extends IDiscussionService {
  sendMessage(message: Partial<IDiscussionMessageDTO>): Promise<boolean>;
}

export interface IDiscussionRebService extends IDiscussionService {
  sendMessage(
    message: Partial<IDiscussionMessageDTO>,
    bankId: string
  ): Promise<boolean>;
}
