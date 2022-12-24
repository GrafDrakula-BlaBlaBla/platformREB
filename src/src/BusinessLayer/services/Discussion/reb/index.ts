import {inject, injectable} from 'inversify';
import {IDiscussionAPIClient} from '../../../../IntegrationLayer/APIClients/Discussion/interfaces';
import {
  IDiscussionMessageDTO,
  TDiscussionPostParams,
} from '../../../../Model/Discussion/Model';
import {DiscussionService} from '../base';
import {IDiscussionRebService} from '../interfaces';
import {API_CLIENT} from '../../../../IntegrationLayer/identifiers';
import {SESSION} from '../../../../Bootstrap/Session';
import {ISession} from '../../../../Bootstrap/Session/interfaces';

@injectable()
export class DiscussionRebService
  extends DiscussionService
  implements IDiscussionRebService {
  @inject(API_CLIENT.Discussion) protected APIClient!: IDiscussionAPIClient;
  @inject(SESSION) protected session!: ISession;

  sendMessage = async (
    message: Pick<IDiscussionMessageDTO, 'text' | 'threadId' | 'threadType'>,
    bankId: string
  ): Promise<boolean> => {
    const session = await this.session.getSession();
    const messageSendParams: TDiscussionPostParams = {
      recipientBankId: bankId,
      text: message.text,
      threadId: message.threadId,
      threadType: message.threadType,
    };

    return this.APIClient.sendMessage(session.user.id, messageSendParams);
  };
}
