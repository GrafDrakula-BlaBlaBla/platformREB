import {injectable} from 'inversify';
import {ISession} from '../../../../Bootstrap/Session/interfaces';
import {
  IDiscussionAPIClient,
  IDiscussionGETParams,
} from '../../../../IntegrationLayer/APIClients/Discussion/interfaces';
import {IBaseListDTO} from '../../../../Model/BaseList';
import {IDiscussionMessageDTO} from '../../../../Model/Discussion/Model';
import {IDiscussionService} from '../interfaces';

@injectable()
export class DiscussionService implements IDiscussionService {
  protected session!: ISession;
  protected APIClient!: IDiscussionAPIClient;

  getMessages = async (
    params: IDiscussionGETParams
  ): Promise<IBaseListDTO<IDiscussionMessageDTO>> => {
    const session = await this.session.getSession();
    const _params: {bankId: string} & IDiscussionGETParams = {
      ...params,
      bankId: session.bank.objectId,
    };
    const messages = await this.APIClient.getMessages(_params);

    messages.items.forEach((message, index) => {
      message.isSelf = session.user.id === message.senderUser.id;
    });

    return messages;
  };

  editMessage = async (message: IDiscussionMessageDTO): Promise<boolean> => {
    return this.APIClient.editMessage(message);
  };

  deleteMessage = async (messageId: string): Promise<boolean> => {
    return this.APIClient.deleteMessage(messageId);
  };
}
