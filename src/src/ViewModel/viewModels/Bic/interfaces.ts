import {IBicDTO} from '../../../Model/Bic';

export interface IBicViewModel {
  bics: Array<IBicDTO>;
  search: (bicPart: string) => Promise<IBicDTO[]>;
  check: (bic: string) => Promise<boolean>;
}
