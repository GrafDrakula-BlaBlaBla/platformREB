import {IBicDTO} from '../../../Model/Bic';

export interface IBicApiClient {
  search: (bicPart: string | null) => Promise<Array<IBicDTO>>;
  check: (bic: string | null) => Promise<{status: string}>;
}
