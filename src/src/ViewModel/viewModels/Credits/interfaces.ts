import {IListViewModel} from '../List/interfaces';
import {ICreditDTO} from '../../../Model/Credits';

export interface ICreditsViewModel extends IListViewModel<ICreditDTO> {
  deleteCredit(id: string | number): void;
}
