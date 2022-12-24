import {inject, injectable} from 'inversify';
import {CFARequestViewModel} from '../base';
import {ICFARequestRebViewModel} from '../interfaces';
import {SERVICE} from '../../../../../BusinessLayer/identifiers';
import {ICFA_DealRebService} from '../../../../../BusinessLayer/services/CFA_Deal';

@injectable()
export class CFARequestRebViewModel
  extends CFARequestViewModel
  implements ICFARequestRebViewModel {
  @inject(SERVICE.CreditForAccreditive)
  protected service!: ICFA_DealRebService;

  canEditParameters = false;
}
