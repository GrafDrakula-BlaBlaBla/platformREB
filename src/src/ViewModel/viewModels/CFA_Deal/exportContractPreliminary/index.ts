import {inject, injectable} from 'inversify';
import {action, makeObservable, observable} from 'mobx';
import {SERVICE} from '../../../../BusinessLayer/identifiers';
import {ICFA_DealService} from '../../../../BusinessLayer/services/CFA_Deal';
import {IBaseListDTO} from '../../../../Model/BaseList';
import {ICFAExportContractPreliminaryDTO} from '../../../../Model/CFA_Deal';
import {cloneDeep} from '../../../../Utils/Object/cloneDeep';
import {uuidv4} from '../../../../Utils/Uid';
import {BaseViewModel} from '../../Base';
import {
  ICFAExportContractPreliminaryExtendedDTO,
  ICFAExportContractPreliminaryViewModel,
} from './interfaces';

const generateInitialFormExportContractPreliminary = (
  id: string
): ICFAExportContractPreliminaryExtendedDTO => ({
  currency: '',
  contractNumber: '',
  dateOfContract: '',
  sumContract: 0,
  sumHiTech: 0,
  tnCode: [
    {
      code: '',
      id: uuidv4(),
    },
  ],
  productName: '',
  id: id,
  isInitial: true,
});
@injectable()
export class CFAExportContractPreliminaryViewModel
  extends BaseViewModel
  implements ICFAExportContractPreliminaryViewModel {
  exportContractPreliminaryList?: IBaseListDTO<
    ICFAExportContractPreliminaryExtendedDTO
  >;

  @inject(SERVICE.CreditForAccreditive) protected service!: ICFA_DealService;

  constructor() {
    super();
    makeObservable(this, {
      exportContractPreliminaryList: observable,
      setExportContractPreliminaryList: action,
      setField: action,
      createInitialFormExportContractPreliminary: action,
      createExportContractPreliminary: action,
      deleteExportContractPreliminary: action,
    });
  }

  getExportContractPreliminaryList = async (id: string): Promise<void> => {
    this.setLoading();
    const data = await this.service.getExportContractPreliminaryList(id);
    this.setExportContractPreliminaryList(data);
    this.unsetLoading();
  };

  createExportContractPreliminary = async (
    id: string,
    contractId: string
  ): Promise<void> => {
    if (!this.exportContractPreliminaryList) {
      return;
    }

    let [data] = this.exportContractPreliminaryList.items.filter((item) => {
      if (item.id === contractId) {
        return true;
      }
      return false;
    });

    const cloneData = cloneDeep<
      Partial<ICFAExportContractPreliminaryExtendedDTO>
    >(data);

    delete cloneData.id;
    delete cloneData.isInitial;

    const newData: ICFAExportContractPreliminaryExtendedDTO = await this.service.createExportContractPreliminary(
      id,
      cloneData as Omit<ICFAExportContractPreliminaryDTO, 'id'>
    );

    data.id = newData.id;
    delete data.isInitial;
  };

  createInitialFormExportContractPreliminary = (): void => {
    if (!this.exportContractPreliminaryList) {
      return;
    }

    this.exportContractPreliminaryList.items.push(
      generateInitialFormExportContractPreliminary(uuidv4())
    );
    this.exportContractPreliminaryList.total = this.exportContractPreliminaryList.items.length;
  };

  editExportContractPreliminary = async (
    id: string,
    contractId: string
  ): Promise<void> => {
    if (this.exportContractPreliminaryList) {
      const [data] = this.exportContractPreliminaryList.items.filter((item) => {
        if (item.id === contractId) {
          return true;
        }
        return false;
      });

      const cloneData = cloneDeep<ICFAExportContractPreliminaryExtendedDTO>(
        data
      );

      this.service.editExportContractPreliminary(id, contractId, cloneData);
    }
  };

  deleteExportContractPreliminary = async (
    id: string,
    contractId: string
  ): Promise<void> => {
    await this.service.deleteExportContractPreliminary(id, contractId);
    if (this.exportContractPreliminaryList) {
      const cloneData = cloneDeep(this.exportContractPreliminaryList.items);
      const filterData = cloneData.filter((item) => {
        if (item.id === contractId) {
          return false;
        }
        return true;
      });
      this.setExportContractPreliminaryList({
        items: filterData,
        total: filterData.length,
      });
    }
  };

  setExportContractPreliminaryList = (
    data: IBaseListDTO<ICFAExportContractPreliminaryExtendedDTO>
  ) => {
    this.exportContractPreliminaryList = data;
  };

  setField = <
    K extends keyof ICFAExportContractPreliminaryExtendedDTO,
    V extends ICFAExportContractPreliminaryExtendedDTO[K]
  >(
    idCurrent: string,
    name: K,
    value: V | ((prevValue: V) => V)
  ) => {
    if (!this.exportContractPreliminaryList) {
      return;
    }

    const [
      currentContractPreliminary,
    ] = this.exportContractPreliminaryList.items.filter((item): boolean => {
      if (item.id === idCurrent) {
        return true;
      }
      return false;
    });

    if (typeof value === 'function') {
      const callback = value;
      const prevValue = currentContractPreliminary[name] as V;
      const newValue = callback(prevValue);
      currentContractPreliminary[name] = newValue;
    } else {
      currentContractPreliminary[name] = value;
    }
  };
}
