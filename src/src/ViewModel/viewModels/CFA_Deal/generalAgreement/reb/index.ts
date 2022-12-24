import {CFAGeneralAgreementViewModel} from '../base';
import {ICFAGeneralAgreementRebViewModel} from '../interfaces';
import {ICFA_DealRebService} from '../../../../../BusinessLayer/services/CFA_Deal';
import {inject, injectable} from 'inversify';
import {SERVICE} from '../../../../../BusinessLayer/identifiers';

@injectable()
export class CFAGeneralAgreementRebViewModel
  extends CFAGeneralAgreementViewModel
  implements ICFAGeneralAgreementRebViewModel {
  @inject(SERVICE.CreditForAccreditive) protected service!: ICFA_DealRebService;
}
