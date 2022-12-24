import {action, makeObservable} from 'mobx';
import {IAccreditationREBService} from '../../../../BusinessLayer/services/Accreditation';
import {IAccreditationREBViewModel} from '../interfaces';
import {AccreditationViewModel} from '../base';
import {inject, injectable} from 'inversify';
import {SERVICE} from '../../../../BusinessLayer/identifiers';

@injectable()
export class AccreditationREBViewModel
  extends AccreditationViewModel
  implements IAccreditationREBViewModel {
  @inject(SERVICE.Accreditation) protected service!: IAccreditationREBService;

  constructor() {
    super();
    makeObservable(this, {
      accept: action,
      complete: action,
      consideration: action,
      createMeeting: action,
      reject: action,
      revision: action,
    });
  }

  accept = async () => {
    if (this.item) {
      this.setLoading();
      try {
        await this.service.accept(this.item.id);
      } finally {
        this.unsetLoading();
      }
    }
  };
  complete = async () => {
    if (this.item) {
      this.setLoading();
      try {
        await this.service.complete(this.item.id);
      } finally {
        this.unsetLoading();
      }
    }
  };
  consideration = async () => {
    if (this.item) {
      this.setLoading();
      try {
        await this.service.consideration(this.item.id);
      } finally {
        this.unsetLoading();
      }
    }
  };
  createMeeting = async () => {
    if (this.item) {
      this.setLoading();
      try {
        await this.service.createMeeting(this.item.id);
      } finally {
        this.unsetLoading();
      }
    }
  };
  reject = async () => {
    if (this.item) {
      this.setLoading();
      try {
        await this.service.reject(this.item.id);
      } finally {
        this.unsetLoading();
      }
    }
  };
  revision = async () => {
    if (this.item) {
      this.setLoading();
      try {
        await this.service.revision(this.item.id);
      } finally {
        this.unsetLoading();
      }
    }
  };
}
