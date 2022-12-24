import {BaseViewModel} from '../../Base';
import {ICFA_DealService} from '../../../../BusinessLayer/services/CFA_Deal';
import {action, makeObservable, observable} from 'mobx';
import {ICFAExportContractViewModel} from './interfaces';
import {ICFAExportContractDTO} from '../../../../Model/CFA_Deal';
import {inject, injectable} from 'inversify';
import {SERVICE} from '../../../../BusinessLayer/identifiers';

@injectable()
export class CFAExportContractViewModel
  extends BaseViewModel
  implements ICFAExportContractViewModel {
  exportContractList?: ICFAExportContractDTO[];

  @inject(SERVICE.CreditForAccreditive) protected service!: ICFA_DealService;

  constructor() {
    super();
    makeObservable(this, {
      exportContractList: observable,
      setExportContractList: action,
    });
  }

  getExportContractList = async (
    creditForAccreditiveId: number
  ): Promise<void> => {
    this.setLoading();
    const data = await this.service.getExportContractList(
      creditForAccreditiveId
    );
    this.setExportContractList(data);
    this.unsetLoading();
  };

  setExportContractList = (data: ICFAExportContractDTO[]) => {
    this.exportContractList = data;
  };
}
