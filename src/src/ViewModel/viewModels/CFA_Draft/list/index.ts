import {ListViewModel} from '../../List';
import {ECFADraftStatuses, ICFADraftDTO} from '../../../../Model/CFA_Draft';
import {ICFA_DraftService} from '../../../../BusinessLayer/services/CFA_Draft/interfaces';
import {ICFADraftListComViewModel} from './interfaces';
import {Params} from 'router5/dist/types/base';
import {inject, injectable} from 'inversify';
import {SERVICE} from '../../../../BusinessLayer/identifiers';

@injectable()
export class CFADraftListComViewModel
  extends ListViewModel<ICFADraftDTO, ICFA_DraftService>
  implements ICFADraftListComViewModel {
  @inject(SERVICE.CFA_Draft) protected service!: ICFA_DraftService;

  getDraftsCreated = async (searchParams?: Params) => {
    this.setLoading();
    try {
      const response = await this.service.initList({
        ...searchParams,
        draftStatuses: ECFADraftStatuses.CREATED,
      });
      this.setTotal(response?.total);
      this.setList(response?.items);
    } finally {
      this.unsetLoading();
    }
  };

  getDraftsCancelled = async (searchParams?: Params) => {
    this.setLoading();
    try {
      const response = await this.service.initList({
        ...searchParams,
        draftStatuses: ECFADraftStatuses.CANCELED,
      });
      this.setTotal(response?.total);
      this.setList(response?.items);
    } finally {
      this.unsetLoading();
    }
  };
}
