import {action, makeObservable} from 'mobx';
import {IAccreditationCommercialService} from '../../../../BusinessLayer/services/Accreditation';
import {IAccreditationCommercialViewModel} from '../interfaces';
import {AccreditationViewModel} from '../base';
import {inject, injectable} from 'inversify';
import {SERVICE} from '../../../../BusinessLayer/identifiers';

@injectable()
export class AccreditationCommercialViewModel
  extends AccreditationViewModel
  implements IAccreditationCommercialViewModel {
  @inject(SERVICE.Accreditation)
  protected service!: IAccreditationCommercialService;

  constructor() {
    super();
    makeObservable(this, {
      createItem: action,
      acceptMeeting: action,
      send: action,
    });
  }

  createItem = async () => {
    this.setLoading();
    const item = await this.service.createItem().finally(this.unsetLoading);
    this.setItem(item);
    return item;
  };
  acceptMeeting = async () => {
    if (this.item) {
      this.setLoading();
      try {
        await this.service.acceptMeeting(this.item.id);
      } finally {
        this.unsetLoading();
      }
    }
  };
  send = async () => {
    if (this.item) {
      this.setLoading();
      try {
        await this.service.send(this.item.id);
      } finally {
        this.unsetLoading();
      }
    }
  };
}
