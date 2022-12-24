import {CFACreditContractViewModel} from '../base';
import {ICFACreditContractRebViewModel} from '../interfaces';
import {ICFA_DealRebService} from '../../../../../BusinessLayer/services/CFA_Deal';
import {inject, injectable} from 'inversify';
import {SERVICE} from '../../../../../BusinessLayer/identifiers';
import {action, makeObservable} from 'mobx';

@injectable()
export class CFACreditContractRebViewModel
  extends CFACreditContractViewModel
  implements ICFACreditContractRebViewModel {
  @inject(SERVICE.CreditForAccreditive) protected service!: ICFA_DealRebService;

  constructor() {
    super();
    makeObservable(this, {
      setDataCFAId: action,
    });
  }

  setDataCFAId = (id: string) => {
    if (this.data) {
      this.data.cfaId = id;
    }
  };
  saveData = async () => {
    this.setLoading();
    if (this.data) {
      try {
        this.setDataCFAId(this.creditForAccreditiveId as string);
        await this.service.saveCreditContract(this.data);
      } finally {
        this.unsetLoading();
      }
    }
  };
}
