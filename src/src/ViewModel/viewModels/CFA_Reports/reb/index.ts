import {ICFA_ReportsRebService} from '../../../../BusinessLayer/services/CFA_Reports';
import {ICFA_ReportsRebViewModel} from '../interfaces';
import {CFA_ReportsViewModel} from '../base';
import {action, makeObservable, observable} from 'mobx';
import {ISelectItem} from '../../../../ui/Common/FieldControls';
import {IActualBankCFA_ReportDTO} from '../../../../Model/CFA_Reports';
import {inject} from 'inversify';
import {SERVICE} from '../../../../BusinessLayer/identifiers';

export class CFA_ReportsRebViewModel
  extends CFA_ReportsViewModel
  implements ICFA_ReportsRebViewModel {
  actualBankList?: IActualBankCFA_ReportDTO[];

  @inject(SERVICE.CFA_Reports) protected service!: ICFA_ReportsRebService;
  constructor() {
    super();
    makeObservable(this, {
      actualBankList: observable,
      setActualBankList: action,
    });
  }

  acceptReport = (reportId: string): Promise<void> => {
    return this.service.acceptReport(reportId);
  };

  getActualBankList = async (): Promise<IActualBankCFA_ReportDTO[]> => {
    const data = await this.service.getActualBankList();
    this.setActualBankList(data);
    return data;
  };
  setActualBankList = (data: IActualBankCFA_ReportDTO[]) => {
    this.actualBankList = data;
  };

  getBanksForFilter = (emptyItem?: ISelectItem): ISelectItem[] => {
    const items = [];
    this.actualBankList?.forEach((bank) => {
      items.push({
        label: bank.bankName,
        value: bank.objectId,
      });
    });
    if (emptyItem) {
      items.unshift(emptyItem);
    }
    return items;
  };
}
