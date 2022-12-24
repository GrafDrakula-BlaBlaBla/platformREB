import {IListViewModel} from '../List/interfaces';
import {IReportDTO} from '../../../Model/Reports';

export interface IReportsViewModel extends IListViewModel<IReportDTO> {
  report?: IReportDTO;

  getItem(id: string): Promise<void>;
  createItem(): Promise<void>;
  sendReportToReb(id: string): void;
  acceptReport(id: string): void;
}
