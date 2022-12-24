import {IBaseListDTO} from '../../../Model/BaseList';
import {
  EThreadMessageType,
  IDiscussionMessageDTO,
  TDiscussionPostParams,
} from '../../../Model/Discussion/Model';

export interface IDiscussionAPIClient {
  getMessages(
    params: IDiscussionGETParams
  ): Promise<IBaseListDTO<IDiscussionMessageDTO>>;
  sendMessage(userId: string, message: TDiscussionPostParams): Promise<boolean>;
  editMessage(message: IDiscussionMessageDTO): Promise<boolean>;
  deleteMessage(messageId: string): Promise<boolean>;
}

export interface IDiscussionGETParams {
  bankId: string;
  threadId: string;
  threadType: EThreadMessageType;
  limit: number;
  offset: number;
}
