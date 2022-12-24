import {Params} from 'router5/dist/types/base';
import {IBaseListDTO} from '../../../Model/BaseList';
import {IReportDTO} from '../../../Model/Reports';

export interface IReportsAPIClient {
  getItems(searchParams?: Params): Promise<IBaseListDTO<IReportDTO>>;
  getItem(id: string): Promise<IReportDTO>;
  createItem(): Promise<IReportDTO>;
  updateItem(id: string, status: string): Promise<IReportDTO>;
}
