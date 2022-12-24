import {BaseCardViewModel} from '../BaseCard';
import {action, makeObservable, observable} from 'mobx';
import {ISupportService} from '../../../BusinessLayer/services/Support/interfaces';
import {ISupportDTO} from '../../../Model/Support';
import {ISupportViewModel} from './interfaces';
import {inject, injectable} from 'inversify';
import {SERVICE} from '../../../BusinessLayer/identifiers';

@injectable()
export class SupportViewModel
  extends BaseCardViewModel<ISupportDTO>
  implements ISupportViewModel {
  @inject(SERVICE.Support) protected service!: ISupportService;

  constructor() {
    super();
    makeObservable(this, {
      attachmentIds: observable,
      addAttachment: action,
      removeAttachment: action,
      unsetAttachments: action,
    });
  }

  attachmentIds: Array<string> = [];

  saveData = async (): Promise<void> => {
    this.setLoading();
    if (this.data) {
      try {
        const data = await this.service.send(this.data);
        this.setData(data);
      } finally {
        this.unsetLoading();
      }
    }
  };

  addAttachment = (id: string) => {
    this.attachmentIds = [...this.attachmentIds, `${id}`];
  };

  removeAttachment = (id: string) => {
    this.attachmentIds = this.attachmentIds.filter((item) => item !== id);
  };

  unsetAttachments = () => (this.attachmentIds = []);
}
