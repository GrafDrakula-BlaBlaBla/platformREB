import {Params} from 'router5/dist/types/base';
import {IBaseListDTO} from '../../../Model/BaseList';
import {IBaseListService} from '../BaseList/interfaces';
import {
  IActualBankCFA_ReportDTO,
  ICFA_ReportDealDTO,
  ICFA_ReportDetailedDTO,
  ICFA_ReportDTO,
} from '../../../Model/CFA_Reports';

export interface ICFA_ReportsService extends IBaseListService<ICFA_ReportDTO> {
  getReportDetailed: (reportId: string) => Promise<ICFA_ReportDetailedDTO>;
  getReportGeneralAgreements: (
    reportId: string,
    params?: Params
  ) => Promise<IBaseListDTO<ICFA_ReportDealDTO>>;
  getReportCreditAgreements: (
    reportId: string,
    params?: Params
  ) => Promise<IBaseListDTO<ICFA_ReportDealDTO>>;
}

export interface ICFA_ReportsCommercialService extends ICFA_ReportsService {
  createReportEnable: () => Promise<boolean>;
  createReport: () => Promise<ICFA_ReportDTO>;
}

export interface ICFA_ReportsRebService extends ICFA_ReportsService {
  getActualBankList: () => Promise<IActualBankCFA_ReportDTO[]>;
  acceptReport: (reportId: string) => Promise<void>;
}
