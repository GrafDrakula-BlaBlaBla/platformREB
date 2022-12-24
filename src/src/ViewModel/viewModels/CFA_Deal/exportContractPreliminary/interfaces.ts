import {IBaseListDTO} from '../../../../Model/BaseList';
import {ICFAExportContractPreliminaryDTO} from '../../../../Model/CFA_Deal';
import {IBaseViewModel} from '../../Base/interfaces';

export interface ICFAExportContractPreliminaryViewModel extends IBaseViewModel {
  exportContractPreliminaryList?: IBaseListDTO<
    ICFAExportContractPreliminaryDTO
  >;
  getExportContractPreliminaryList(id: string): Promise<void>;
  createExportContractPreliminary(
    id: string,
    contractId: string
  ): Promise<void>;
  createInitialFormExportContractPreliminary(): void;
  editExportContractPreliminary(id: string, contractId: string): Promise<void>;
  deleteExportContractPreliminary(
    id: string,
    contractId: string
  ): Promise<void>;
  setField<
    K extends keyof ICFAExportContractPreliminaryExtendedDTO,
    V extends ICFAExportContractPreliminaryExtendedDTO[K]
  >(
    idCurrent: string,
    name: K,
    value: V | ((prevValue: V) => V)
  ): void;
}

export interface ICFAExportContractPreliminaryExtendedDTO
  extends ICFAExportContractPreliminaryDTO {
  isInitial?: boolean;
}
