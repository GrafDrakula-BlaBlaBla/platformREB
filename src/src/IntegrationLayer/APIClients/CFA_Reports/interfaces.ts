import {Params} from 'router5/dist/types/base';
import {
  IActualBankCFA_ReportDTO,
  ICFA_ReportDealDTO,
  ICFA_ReportDetailedDTO,
  ICFA_ReportDTO,
} from '../../../Model/CFA_Reports';
import {IBaseListDTO} from '../../../Model/BaseList';

export interface ICFA_ReportAPIClient {
  getReportDetailed(reportId: string): Promise<ICFA_ReportDetailedDTO>;
  getReportGeneralAgreements(
    reportId: string,
    params?: Params
  ): Promise<IBaseListDTO<ICFA_ReportDealDTO>>;
  getReportCreditAgreements(
    reportId: string,
    params?: Params
  ): Promise<IBaseListDTO<ICFA_ReportDealDTO>>;
  getItems(params?: Params): Promise<IBaseListDTO<ICFA_ReportDTO>>;
}

export interface ICFA_ReportCommercialAPIClient extends ICFA_ReportAPIClient {
  createReportEnable(): Promise<boolean>;
  createReport(): Promise<ICFA_ReportDTO>;
}

export interface ICFA_ReportRebAPIClient extends ICFA_ReportAPIClient {
  getActualBankList(): Promise<IActualBankCFA_ReportDTO[]>;
  acceptReport(reportId: string): Promise<void>;
}
