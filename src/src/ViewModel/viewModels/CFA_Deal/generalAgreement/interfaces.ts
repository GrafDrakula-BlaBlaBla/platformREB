import {ICFAGeneralAgreementDTO} from '../../../../Model/CFA_Deal';
import {IBaseCardViewModel} from '../../BaseCard/interfaces';

export interface ICFAGeneralAgreementViewModel
  extends IBaseCardViewModel<ICFAGeneralAgreementDTO> {
  isEmpty?: boolean;
  isLoaded?: boolean;
  getGeneralAgreement(creditForAccreditiveId: string): Promise<void>;
}

export interface ICFAGeneralAgreementComViewModel
  extends ICFAGeneralAgreementViewModel {}

export interface ICFAGeneralAgreementRebViewModel
  extends ICFAGeneralAgreementViewModel {}
