import {action, computed, makeObservable, observable} from 'mobx';
import {ICFA_DraftService} from '../../../../BusinessLayer/services/CFA_Draft/interfaces';
import {BaseViewModel} from '../../Base';
import {ICFADraftExportContractComViewModel} from './interfaces';
import {
  ICFADraftExportContractDTO,
  ICFADraftExportContractEmpty,
  ICFADraftExportContractExtendedDTO,
  IDraftConfirmedDocuments,
} from '../../../../Model/CFA_Draft';
import {uuidv4} from '../../../../Utils/Uid';
import {inject, injectable} from 'inversify';
import {SERVICE} from '../../../../BusinessLayer/identifiers';

@injectable()
export class CFADraftExportContractComViewModel
  extends BaseViewModel
  implements ICFADraftExportContractComViewModel {
  @inject(SERVICE.CFA_Draft) protected service!: ICFA_DraftService;

  constructor() {
    super();
    makeObservable(this, {
      isDirty: computed,
      isValid: computed,

      list: observable,
      setList: action,
      getList: action,

      add: action,
      save: action,
      delete: action,

      getContract: action,
      setContract: action,
      setContractIsDirty: action,
      setContractIsValid: action,

      setField: action,
      setFieldTnCode: action,
      setFieldConfirmedDocument: action,

      addTnCode: action,
      deleteTnCode: action,

      addConfirmedDocument: action,
      deleteConfirmedDocument: action,
    });
  }

  get isValid() {
    return Boolean(
      this.list &&
        this.list.length > 0 &&
        this.list.reduce((accumulator: boolean, curr) => {
          return accumulator && Boolean(curr.isValid);
        }, true)
    );
  }
  get isDirty() {
    return Boolean(
      this.list?.reduce((accumulator: boolean, curr) => {
        return accumulator || Boolean(curr.isDirty);
      }, false)
    );
  }

  list?: ICFADraftExportContractExtendedDTO[];
  setList = (list?: ICFADraftExportContractExtendedDTO[]) => {
    this.list = list;
  };
  getList = async (draftId: string) => {
    this.setLoading();
    try {
      const list = await this.service.getExportContracts(draftId);
      this.setList(list);
    } finally {
      this.unsetLoading();
    }
  };

  add = () => {
    const list = this.list ? [...this.list] : [];
    list.push({tempId: uuidv4(), ...ICFADraftExportContractEmpty});
    this.setList(list);
  };
  save = async (draftId: string, data: ICFADraftExportContractExtendedDTO) => {
    this.setLoading();
    try {
      const {tempId, isDirty, isValid, ...dataToSave} = data;
      if (dataToSave.id) {
        const newData = await this.service.updateExportContract(
          draftId,
          dataToSave
        );
        this.setContract(data.tempId as string, newData);
      } else {
        const newData = await this.service.createExportContract(
          draftId,
          dataToSave
        );
        this.setContract(data.tempId as string, newData);
      }
    } finally {
      this.unsetLoading();
    }
  };
  saveDirty = async (draftId: string) => {
    const promises: Promise<void>[] = [];
    this.list?.forEach((contract) => {
      if (contract.isDirty) {
        promises.push(this.save(draftId, contract));
      }
    });
    await Promise.all(promises);
  };
  delete = async (draftId: string, tempId: string) => {
    const contract = this.getContract(tempId);
    if (contract) {
      if (contract.id) {
        this.setLoading();
        try {
          await this.service.deleteExportContract(draftId, contract.id);
        } finally {
          this.unsetLoading();
        }
      }
      const list = this.list?.filter((c) => c.tempId !== tempId);
      this.setList(list);
    }
  };

  getContract = (tempId: string) => {
    return this.list?.find((contract) => contract.tempId === tempId);
  };
  setContract = (tempId: string, data: ICFADraftExportContractDTO) => {
    const list = this.list?.map((contract) => {
      if (contract.tempId === tempId) {
        contract = {...contract, ...data};
      }
      return contract;
    });
    this.setList(list);
  };
  setContractIsDirty = (tempId: string, value: boolean) => {
    const contract = this.getContract(tempId);
    if (contract) contract.isDirty = value;
  };
  setContractIsValid = (tempId: string, value: boolean) => {
    const contract = this.getContract(tempId);
    if (contract) contract.isValid = value;
  };

  setField = (
    tempId: string,
    name: string,
    value: string | Date | boolean | null
  ): void => {
    const contract = this.getContract(tempId);
    if (contract) {
      contract[name as keyof ICFADraftExportContractDTO] = value as never;
    }
  };
  setFieldTnCode = (
    tempId: string,
    field: string,
    value: string,
    index: number
  ): void => {
    const contract = this.getContract(tempId);
    if (contract) {
      contract.tnCodes[index].code = value;
    }
  };
  setFieldConfirmedDocument = (
    tempId: string,
    field: string,
    value: string | Date | boolean | null,
    index: number
  ): void => {
    const contract = this.getContract(tempId);
    if (contract) {
      contract.confirmedDocuments[index][
        field as keyof IDraftConfirmedDocuments
      ] = value as never;
    }
  };

  addTnCode = (tempId: string) => {
    const contract = this.getContract(tempId);
    contract?.tnCodes.push(ICFADraftExportContractEmpty.tnCodes[0]);
  };
  deleteTnCode = (tempId: string, index: number) => {
    const contract = this.getContract(tempId);
    contract?.tnCodes.splice(index, 1);
  };

  addConfirmedDocument = (tempId: string) => {
    const contract = this.getContract(tempId);
    contract?.confirmedDocuments.push(
      ICFADraftExportContractEmpty.confirmedDocuments[0]
    );
  };
  deleteConfirmedDocument = (tempId: string, index: number) => {
    const contract = this.getContract(tempId);
    contract?.confirmedDocuments.splice(index, 1);
  };
}
