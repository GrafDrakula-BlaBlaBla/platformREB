import {ISupportDTO} from '../../../Model/Support';

export interface ISupportAPIClient {
  send: (data: ISupportDTO) => Promise<ISupportDTO>;
}
