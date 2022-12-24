import {ECFADraftStatuses, ICFADraftDTO} from '.';
import {CFA_REQUEST_MOCK} from '../CFA_Deal/mock';

export const CFA_DRAFT_MOCK: ICFADraftDTO = {
  ...CFA_REQUEST_MOCK,
  draftStatus: ECFADraftStatuses.CREATED,
};
