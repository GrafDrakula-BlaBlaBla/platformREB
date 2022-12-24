import {ListViewModel} from '../../../List';
import {ICFABankUserDTO, ICFAItemDTO} from '../../../../../Model/CFA_Deal';
import {
  ICFA_DealComService,
  ICFA_DealService,
} from '../../../../../BusinessLayer/services/CFA_Deal';
import {inject, injectable} from 'inversify';
import {SERVICE} from '../../../../../BusinessLayer/identifiers';
import {ICFAListComViewModel} from '..';
import {action, makeObservable, observable} from 'mobx';

@injectable()
export class CFAListCommercialViewModel
  extends ListViewModel<ICFAItemDTO, ICFA_DealService>
  implements ICFAListComViewModel {
  availableUsers?: ICFABankUserDTO[];

  @inject(SERVICE.CreditForAccreditive) protected service!: ICFA_DealComService;
  constructor() {
    super();

    makeObservable(this, {
      availableUsers: observable,
      setAvailableUsers: action,
    });
  }

  getAvailableUsers = async (): Promise<ICFABankUserDTO[]> => {
    this.setLoading();
    try {
      const data = await this.service.getAvailableUsers();
      this.setAvailableUsers(data);
      return data;
    } finally {
      this.unsetLoading();
    }
  };
  setAvailableUsers = (data?: ICFABankUserDTO[]) => {
    this.availableUsers = data;
  };
}
