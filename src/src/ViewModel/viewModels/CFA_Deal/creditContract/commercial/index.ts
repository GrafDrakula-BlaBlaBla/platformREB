import {ICFACreditContractComViewModel} from '../interfaces';
import {CFACreditContractViewModel} from '../base';
import {ICFA_DealComService} from '../../../../../BusinessLayer/services/CFA_Deal';
import {inject, injectable} from 'inversify';
import {SERVICE} from '../../../../../BusinessLayer/identifiers';

@injectable()
export class CFACreditContractComViewModel
  extends CFACreditContractViewModel
  implements ICFACreditContractComViewModel {
  @inject(SERVICE.CreditForAccreditive) protected service!: ICFA_DealComService;
}
