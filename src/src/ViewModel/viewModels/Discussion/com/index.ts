import {inject, injectable} from 'inversify';
import {SERVICE} from '../../../../BusinessLayer/identifiers';
import {IDiscussionComService} from '../../../../BusinessLayer/services/Discussion/interfaces';
import {IDiscussionMessageDTO} from '../../../../Model/Discussion/Model';
import {DiscussionViewModel} from '../base';
import {IDiscussionComViewModel} from '../interfaces';

@injectable()
export class DiscussionComViewModel
  extends DiscussionViewModel
  implements IDiscussionComViewModel {
  @inject(SERVICE.Discussion) protected service!: IDiscussionComService;

  sendMessage = async (
    message: Partial<IDiscussionMessageDTO>,
    callback?: () => void
  ): Promise<boolean> => {
    this.setLoading();
    this._data = [];
    this.offset = 0;
    this.scrollHeight = 0;
    return this.service.sendMessage(message).finally(() => {
      callback?.();
      this.unsetLoading();
    });
  };
}
