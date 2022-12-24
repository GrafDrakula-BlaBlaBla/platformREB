import {ListViewModel} from '../../List';
import {IBankForAccreditationViewModel} from '../interfaces';
import {IBankForAccreditationService} from '../../../../BusinessLayer/services/Banks';
import {IAccreditation_BankDTO} from '../../../../Model/Banks';

export class BankForAccreditationViewModel
  extends ListViewModel<IAccreditation_BankDTO, IBankForAccreditationService>
  implements IBankForAccreditationViewModel {
  constructor(protected service: IBankForAccreditationService) {
    super();
  }
}
