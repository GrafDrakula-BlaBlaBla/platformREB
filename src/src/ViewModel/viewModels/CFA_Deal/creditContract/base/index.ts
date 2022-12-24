import {action, computed, makeObservable} from 'mobx';
import {ICFACreditContractViewModel} from '../interfaces';
import {ICFACreditContractDTO} from '../../../../../Model/CFA_Deal';
import {ICFA_DealService} from '../../../../../BusinessLayer/services/CFA_Deal';
import {BaseCardViewModel} from '../../../BaseCard';
import {injectable} from 'inversify';

@injectable()
export class CFACreditContractViewModel
  extends BaseCardViewModel<ICFACreditContractDTO>
  implements ICFACreditContractViewModel {
  protected creditForAccreditiveId?: string;

  protected service!: ICFA_DealService;

  constructor() {
    super();
    makeObservable(this, {
      isEmpty: computed,
      isLoaded: computed,
      getCreditContract: action,
    });
  }

  get isEmpty() {
    let ret = true;
    if (this.data) {
      const {isValid, isValidPaidFor, isValidIssued, ...data} = this.data;
      ret = data
        ? !Object.keys(this.data).reduce<boolean>(
            (prev, next) =>
              Boolean(
                this.data
                  ? this.data[next as keyof ICFACreditContractDTO]
                  : false
              ) || prev,
            false
          )
        : true;
    }
    return ret;
  }

  get isLoaded() {
    let ret = false;
    if (this.data) {
      const {isValid, isValidPaidFor, isValidIssued, ...data} = this.data;
      ret = Object.keys(data).length > 0;
    }
    return ret;
  }

  getCreditContract = async (creditForAccreditiveId: string): Promise<void> => {
    this.creditForAccreditiveId = creditForAccreditiveId;
    this.setLoading();
    try {
      const data = await this.service.getCreditContract(creditForAccreditiveId);
      this.setData(data);
    } finally {
      this.unsetLoading();
    }
  };
}
