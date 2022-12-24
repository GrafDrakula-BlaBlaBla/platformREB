import {IBaseListService} from '../BaseList/interfaces';
import {ICreditDTO} from '../../../Model/Credits';

export interface ICreditsService extends IBaseListService<ICreditDTO> {
  deleteCredit(id: string | number): Promise<void>;
}
