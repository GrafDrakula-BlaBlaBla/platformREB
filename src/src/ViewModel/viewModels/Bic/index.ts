import {inject, injectable} from 'inversify';
import {action, makeObservable, observable} from 'mobx';
import {SERVICE} from '../../../BusinessLayer/identifiers';
import {IBicService} from '../../../BusinessLayer/services/Bic/interfaces';
import {IBicDTO} from '../../../Model/Bic';
import {IBicViewModel} from './interfaces';

@injectable()
export class BicViewModel implements IBicViewModel {
  bics: Array<IBicDTO> = [];

  @inject(SERVICE.Bic) protected service!: IBicService;

  constructor() {
    makeObservable(this, {
      bics: observable,
      setBic: action,
    });
  }

  search = async (bicPart: string) => {
    const bics = await this.service.search(bicPart);
    this.setBic(bics);
    return bics;
  };

  check = async (bic: string) => {
    return await this.service.check(bic);
  };

  setBic = (bics: Array<IBicDTO>) => {
    this.bics = bics;
  };
}
