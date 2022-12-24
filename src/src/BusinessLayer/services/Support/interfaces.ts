import {ISupportDTO} from '../../../Model/Support';

export interface ISupportService {
  send: (data: ISupportDTO) => Promise<ISupportDTO>;
}
