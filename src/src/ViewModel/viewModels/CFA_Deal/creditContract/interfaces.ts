import {ICFACreditContractDTO} from '../../../../Model/CFA_Deal';
import {IBaseCardViewModel} from '../../BaseCard/interfaces';

export interface ICFACreditContractViewModel
  extends IBaseCardViewModel<ICFACreditContractDTO> {
  isEmpty?: boolean;
  isLoaded?: boolean;
  getCreditContract(creditForAccreditiveId: string): Promise<void>;
}

export interface ICFACreditContractComViewModel
  extends ICFACreditContractViewModel {}

export interface ICFACreditContractRebViewModel
  extends ICFACreditContractViewModel {}
