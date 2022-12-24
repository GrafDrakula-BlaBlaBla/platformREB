import {IBicDTO} from '../../../Model/Bic';

export interface IBicService {
  search: (bicPart: string) => Promise<Array<IBicDTO>>;
  check: (bic: string) => Promise<boolean>;
}
