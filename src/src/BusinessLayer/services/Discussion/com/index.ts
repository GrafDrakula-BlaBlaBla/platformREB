import {inject, injectable} from 'inversify';
import {SESSION} from '../../../../Bootstrap/Session';
import {ISession} from '../../../../Bootstrap/Session/interfaces';
import {IBankAPIClient} from '../../../../IntegrationLayer/APIClients/Banks';
import {IDiscussionAPIClient} from '../../../../IntegrationLayer/APIClients/Discussion/interfaces';
import {API_CLIENT} from '../../../../IntegrationLayer/identifiers';
import {
  IDiscussionMessageDTO,
  TDiscussionPostParams,
} from '../../../../Model/Discussion/Model';
import {DiscussionService} from '../base';
import {IDiscussionComService} from '../interfaces';

@injectable()
export class DiscussionComService
  extends DiscussionService
  implements IDiscussionComService {
  @inject(API_CLIENT.Discussion) protected APIClient!: IDiscussionAPIClient;
  @inject(API_CLIENT.Banks) protected bankApiClient!: IBankAPIClient;
  @inject(SESSION) protected session!: ISession;

  sendMessage = async (
    message: Pick<IDiscussionMessageDTO, 'text' | 'threadId' | 'threadType'>
  ): Promise<boolean> => {
    const session = await this.session.getSession();
    const bank = await this.bankApiClient.getReb();
    const messageSendParams: TDiscussionPostParams = {
      recipientBankId: bank.objectId,
      text: message.text,
      threadId: message.threadId,
      threadType: message.threadType,
    };

    return this.APIClient.sendMessage(session.user.id, messageSendParams);
  };
}
