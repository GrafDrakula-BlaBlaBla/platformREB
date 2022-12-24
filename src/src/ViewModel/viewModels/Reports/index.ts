import {IReportDTO} from '../../../Model/Reports';
import {action, makeObservable, observable} from 'mobx';
import {EStatusCodes} from '../../../Model/Status';
import {ListViewModel} from '../List';
import {IReportsViewModel} from './interfaces';
import {IReportsService} from '../../../BusinessLayer/services/Reports/interfaces';
import {inject, injectable} from 'inversify';
import {SERVICE} from '../../../BusinessLayer/identifiers';

@injectable()
export class ReportsViewModel
  extends ListViewModel<IReportDTO, IReportsService>
  implements IReportsViewModel {
  @inject(SERVICE.Reports) protected service!: IReportsService;
  constructor() {
    super();
    makeObservable(this, {
      getItem: action,
      createItem: action,
      updateItem: action,
      report: observable,
      setReport: action,
    });
  }
  report: IReportDTO | undefined;

  getItem = async (id: string): Promise<void> => {
    this.setLoading();
    const report = await this.service.getItem(id);
    this.setReport(report);
    this.unsetLoading();
  };

  createItem = async (): Promise<void> => {
    this.setLoading();
    const report = await this.service.createItem();
    this.setReport(report);
    this.unsetLoading();
  };

  updateItem = async (id: string, status: string): Promise<void> => {
    this.setLoading();
    const report = await this.service.updateItem(id, status);
    this.setReport(report);
    this.unsetLoading();
  };

  sendReportToReb = (id: string) => {
    return this.updateItem(id, EStatusCodes.ON_CONSIDERATION);
  };

  acceptReport = (id: string) => {
    return this.updateItem(id, EStatusCodes.ACCEPTED);
  };

  setReport = (report: IReportDTO) => {
    this.report = report;
  };
}
