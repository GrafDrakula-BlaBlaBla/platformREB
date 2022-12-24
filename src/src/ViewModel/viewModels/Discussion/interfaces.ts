import {IMapMessagesOnDay} from '../../../BusinessLayer/services/Discussion/interfaces';
import {IDiscussionGETParams} from '../../../IntegrationLayer/APIClients/Discussion/interfaces';
import {IDiscussionMessageDTO} from '../../../Model/Discussion/Model';
import {IBaseViewModel} from '../Base/interfaces';

type TPickMessageGetParams = 'threadId' | 'threadType' | 'limit' | 'offset';
// type TPickMessagePostParams = 'text' | 'threadType' | 'threadId';

export interface IDiscussionViewModel extends IBaseViewModel {
  mapMessagesOnDay: IMapMessagesOnDay;
  scrollHeight: number;
  offset: number;
  total: number;
  actualTotal: number;
  haveNew: boolean;
  setHaveNew(isNew: boolean): void;
  setOffset: (offset?: number) => void;
  setScrollHeight: (height?: number) => void;
  getMessages(
    params: Pick<IDiscussionGETParams, TPickMessageGetParams>
  ): Promise<void>;
  updateMessages(
    params: Pick<IDiscussionGETParams, TPickMessageGetParams>
  ): Promise<void>;
  editMessage(message: Partial<IDiscussionMessageDTO>): Promise<boolean>;
  deleteMessage(messageId: string): Promise<boolean>;
  setMessages: (data: IMapMessagesOnDay) => void;
  clearMessages: () => void;
}

export interface IDiscussionComViewModel extends IDiscussionViewModel {
  sendMessage(message: Partial<IDiscussionMessageDTO>): Promise<boolean>;
}

export interface IDiscussionRebViewModel extends IDiscussionViewModel {
  sendMessage(
    message: Partial<IDiscussionMessageDTO>,
    bankId?: string
  ): Promise<boolean>;
}
