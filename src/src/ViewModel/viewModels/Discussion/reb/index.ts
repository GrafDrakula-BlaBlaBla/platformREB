import {inject, injectable} from 'inversify';
import {SERVICE} from '../../../../BusinessLayer/identifiers';
import {IDiscussionRebService} from '../../../../BusinessLayer/services/Discussion/interfaces';
import {IDiscussionMessageDTO} from '../../../../Model/Discussion/Model';
import {DiscussionViewModel} from '../base';
import {IDiscussionRebViewModel} from '../interfaces';

@injectable()
export class DiscussionRebViewModel
  extends DiscussionViewModel
  implements IDiscussionRebViewModel {
  @inject(SERVICE.Discussion) protected service!: IDiscussionRebService;

  sendMessage = async (
    message: Partial<IDiscussionMessageDTO>,
    bankId: string,
    callback?: () => void
  ): Promise<boolean> => {
    this.setLoading();
    this._data = [];
    this.offset = 0;
    this.scrollHeight = 0;
    return this.service.sendMessage(message, bankId).finally(() => {
      callback?.();
      this.unsetLoading();
    });
  };
}
