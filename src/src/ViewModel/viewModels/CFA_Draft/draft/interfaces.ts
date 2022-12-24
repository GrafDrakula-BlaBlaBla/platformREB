import {IBaseCardViewModel} from '../../BaseCard/interfaces';
import {ICFADraftDTO} from '../../../../Model/CFA_Draft';

export interface ICFADraftComViewModel
  extends IBaseCardViewModel<ICFADraftDTO> {
  isDirty: boolean;
  isValid: boolean;
  setIsDirty(valid: boolean): void;
  setIsValid(valid: boolean): void;

  isBankManual: boolean;
  isCreation: boolean;
  isEdit: boolean;

  isCreated: boolean;
  isFinished: boolean;
  isCanceled: boolean;

  getDraft(id: string): void;

  createDraft(): Promise<ICFADraftDTO>;
  createDraftFromDeal(dealId: string): Promise<ICFADraftDTO>;
  updateDraft(): Promise<void>;
  executeDraft(): Promise<void>;
  deleteDraft(id: string): Promise<void>;
}
