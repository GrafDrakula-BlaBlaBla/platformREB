import {CFAGeneralAgreementViewModel} from '../base';
import {ICFAGeneralAgreementComViewModel} from '../interfaces';
import {ICFA_DealComService} from '../../../../../BusinessLayer/services/CFA_Deal';
import {inject, injectable} from 'inversify';
import {SERVICE} from '../../../../../BusinessLayer/identifiers';
import {action, makeObservable} from 'mobx';

@injectable()
export class CFAGeneralAgreementComViewModel
  extends CFAGeneralAgreementViewModel
  implements ICFAGeneralAgreementComViewModel {
  @inject(SERVICE.CreditForAccreditive) protected service!: ICFA_DealComService;

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
  saveData = async (): Promise<void> => {
    this.setLoading();
    if (this.data) {
      try {
        this.setDataCFAId(this.creditForAccreditiveId as string);
        await this.service.saveGeneralAgreement(this.data);
      } finally {
        this.unsetLoading();
      }
    }
  };
}
