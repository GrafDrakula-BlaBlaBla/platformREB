import {IBaseViewModel} from '../../Base/interfaces';
import {ICFADraftExportContractExtendedDTO} from '../../../../Model/CFA_Draft';

export interface ICFADraftExportContractComViewModel extends IBaseViewModel {
  isDirty: boolean;
  isValid: boolean;

  list?: ICFADraftExportContractExtendedDTO[];
  getList: (draftId: string) => Promise<void>;
  setList: (list?: ICFADraftExportContractExtendedDTO[]) => void;

  add: () => void;
  save: (
    draftId: string,
    data: ICFADraftExportContractExtendedDTO
  ) => Promise<void>;
  saveDirty: (draftId: string) => Promise<void>;
  delete: (draftId: string, tempId: string) => Promise<void>;

  getContract: (
    tempId: string
  ) => ICFADraftExportContractExtendedDTO | undefined;
  setContractIsDirty: (tempId: string, value: boolean) => void;
  setContractIsValid: (tempId: string, value: boolean) => void;

  setField: (
    tempId: string,
    name: string,
    value: string | Date | boolean | null
  ) => void;
  setFieldTnCode: (
    tempId: string,
    name: string,
    value: string,
    index: number
  ) => void;
  setFieldConfirmedDocument: (
    tempId: string,
    name: string,
    value: string | Date | boolean | null,
    index: number
  ) => void;

  addTnCode: (tempId: string) => void;
  deleteTnCode: (tempId: string, index: number) => void;

  addConfirmedDocument: (tempId: string) => void;
  deleteConfirmedDocument: (tempId: string, index: number) => void;
}
