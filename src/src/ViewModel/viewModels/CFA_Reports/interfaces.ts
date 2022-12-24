import {Params} from 'router5/dist/types/base';
import {IBaseListDTO} from '../../../Model/BaseList';
import {ISelectItem} from '../../../ui/Common/FieldControls';
import {
  IActualBankCFA_ReportDTO,
  ICFA_ReportDealDTO,
  ICFA_ReportDetailedDTO,
  ICFA_ReportDTO,
} from '../../../Model/CFA_Reports';
import {IListViewModel} from '../List/interfaces';

export interface ICFA_ReportsViewModel extends IListViewModel<ICFA_ReportDTO> {
  report?: ICFA_ReportDetailedDTO;
  reports: Array<ICFA_ReportDTO>;
  reportGeneralAgreements?: IBaseListDTO<ICFA_ReportDealDTO>;
  reportCreditAgreements?: IBaseListDTO<ICFA_ReportDealDTO>;
  getReport: (reportId: string) => Promise<void>;
  getReportGeneralAgreements: (
    reportId: string,
    params?: Params
  ) => Promise<void>;
  getReportCreditAgreements: (
    reportId: string,
    params?: Params
  ) => Promise<void>;
  clearReport: () => void;
  loadingReport?: boolean;
}

export interface ICFA_ReportsCommercialViewModel extends ICFA_ReportsViewModel {
  createReportEnable: () => Promise<boolean>;
  createReport: () => Promise<ICFA_ReportDTO>;
}
export interface ICFA_ReportsRebViewModel extends ICFA_ReportsViewModel {
  actualBankList?: IActualBankCFA_ReportDTO[];
  getActualBankList: () => Promise<IActualBankCFA_ReportDTO[]>;
  getBanksForFilter: (emptyItem: ISelectItem) => ISelectItem[];
  acceptReport: (reportId: string) => Promise<void>;
}
