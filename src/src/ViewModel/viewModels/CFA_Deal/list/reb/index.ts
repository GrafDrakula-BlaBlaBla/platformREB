import {
  IActualBankCFADTO,
  ICFABankUserDTO,
  ICFAItemDTO,
} from '../../../../../Model/CFA_Deal';
import {ISelectItem} from '../../../../../ui/Common/FieldControls';
import {ICFAListRebViewModel} from '../interfaces';
import {
  ICFA_DealRebService,
  ICFA_DealService,
} from '../../../../../BusinessLayer/services/CFA_Deal';
import {ListViewModel} from '../../../List';
import {inject, injectable} from 'inversify';
import {SERVICE} from '../../../../../BusinessLayer/identifiers';
import {action, makeObservable, observable} from 'mobx';

@injectable()
export class CFAListRebViewModel
  extends ListViewModel<ICFAItemDTO, ICFA_DealService>
  implements ICFAListRebViewModel {
  actualBankList?: IActualBankCFADTO[];
  availableUsers?: ICFABankUserDTO[];

  @inject(SERVICE.CreditForAccreditive) protected service!: ICFA_DealRebService;
  constructor() {
    super();

    makeObservable(this, {
      actualBankList: observable,
      setActualBankList: action,

      availableUsers: observable,
      setAvailableUsers: action,
    });
  }

  getActualBankList = async (): Promise<IActualBankCFADTO[]> => {
    const data = await this.service.getActualBankList();
    this.setActualBankList(data);
    return data;
  };
  setActualBankList = (data?: IActualBankCFADTO[]) => {
    this.actualBankList = data;
  };

  getBanksForFilter = (emptyItem?: ISelectItem): ISelectItem[] => {
    const items = [];
    this.actualBankList?.forEach((bank) => {
      items.push({
        label: bank.bankName,
        value: bank.objectId,
      });
    });
    if (emptyItem) {
      items.unshift(emptyItem);
    }
    return items;
  };

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
