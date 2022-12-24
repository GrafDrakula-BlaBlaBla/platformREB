import {ICreditDTO} from '../../../Model/Credits';
import {ListViewModel} from '../List';
import {ICreditsService} from '../../../BusinessLayer/services/Credits/interfaces';
import {ICreditsViewModel} from './interfaces';
import {inject, injectable} from 'inversify';
import {SERVICE} from '../../../BusinessLayer/identifiers';

@injectable()
export class CreditsViewModel
  extends ListViewModel<ICreditDTO, ICreditsService>
  implements ICreditsViewModel {
  @inject(SERVICE.Credits) protected service!: ICreditsService;

  deleteCredit = async (id: string | number) => {
    this.setLoading();
    await this.service.deleteCredit(id);
    await this.initList();
    this.unsetLoading();
  };
}
