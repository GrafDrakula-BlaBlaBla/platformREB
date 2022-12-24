import {ListViewModel} from '../../List';
import {IBankForCFAViewModel} from '../interfaces';
import {ICFA_BankDTO} from '../../../../Model/Banks';
import {IBankForCFAService} from '../../../../BusinessLayer/services/Banks';

export class BankForCFAViewModel
  extends ListViewModel<ICFA_BankDTO, IBankForCFAService>
  implements IBankForCFAViewModel {
  constructor(protected service: IBankForCFAService) {
    super();
  }
}
