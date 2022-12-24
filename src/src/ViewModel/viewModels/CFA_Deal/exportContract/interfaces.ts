import {IBaseViewModel} from '../../Base/interfaces';
import {ICFAExportContractDTO} from '../../../../Model/CFA_Deal';

export interface ICFAExportContractViewModel extends IBaseViewModel {
  exportContractList?: ICFAExportContractDTO[];
  getExportContractList(creditForAccreditiveId: number): Promise<void>;
}
