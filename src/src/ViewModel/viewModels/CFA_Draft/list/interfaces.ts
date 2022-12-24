import {IListViewModel} from '../../List/interfaces';
import {ICFADraftDTO} from '../../../../Model/CFA_Draft';
import {Params} from 'router5/dist/types/base';

export interface ICFADraftListComViewModel
  extends IListViewModel<ICFADraftDTO> {
  getDraftsCreated: (searchParams?: Params) => Promise<void>;
  getDraftsCancelled: (searchParams?: Params) => Promise<void>;
}
