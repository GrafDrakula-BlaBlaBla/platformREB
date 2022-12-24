import {IBaseListService} from '../BaseList/interfaces';
import {IReportDTO} from '../../../Model/Reports';

export interface IReportsService extends IBaseListService<IReportDTO> {
  getItem(id: string): Promise<IReportDTO>;
  createItem(): Promise<IReportDTO>;
  updateItem(id: string, status: string): Promise<IReportDTO>;
}
