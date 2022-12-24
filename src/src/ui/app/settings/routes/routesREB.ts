import {Router} from 'router5';
import {Params} from 'router5/dist/types/base';
import {
  DefaultParams,
  ECreditForAccreditiveTabs,
  routesBase,
} from './routesBase';
import {ROUTER_CONST_REB} from '../routerConst/RouterConstREB';
import {RouterDependencies} from '../../../../index';
import {IAccreditationViewModel} from '../../../../ViewModel/viewModels/Accreditation';
import {ICFA_ReportsRebViewModel} from '../../../../ViewModel/viewModels/CFA_Reports';
import {ICFACreditContractRebViewModel} from '../../../../ViewModel/viewModels/CFA_Deal/creditContract';
import {ICFAGeneralAgreementRebViewModel} from '../../../../ViewModel/viewModels/CFA_Deal/generalAgreement';
import {IRegistriesViewModel} from '../../../../ViewModel/viewModels/Registries/interfaces';
import {VIEW_MODEL} from '../../../../ViewModel/identifiers';
import {IReportsViewModel} from '../../../../ViewModel/viewModels/Reports/interfaces';
import {IBankViewModel} from '../../../../ViewModel/viewModels/Banks';
import {ICFARequestViewModel} from '../../../../ViewModel/viewModels/CFA_Deal/request';
import {IDictionaryViewModel} from '../../../../ViewModel/viewModels/Dictionary/interfaces';
import {EActiveTabsName} from '../../../REB/Accreditation';
import {ICFADocumentViewModel} from '../../../../ViewModel/viewModels/CFA_Deal/document/interfaces';
import {ICFAExportContractViewModel} from '../../../../ViewModel/viewModels/CFA_Deal/exportContract/interfaces';
import {ICFAListRebViewModel} from '../../../../ViewModel/viewModels/CFA_Deal/list';
import {IWidgetDealsViewModel} from '../../../../ViewModel/viewModels/Widgets/WidgetDeals/interfaces';
import {IWidgetCreditViewModel} from '../../../../ViewModel/viewModels/Widgets/WidgetCredit/interfaces';
import {IWidgetExportViewModel} from '../../../../ViewModel/viewModels/Widgets/WidgetExport/interfaces';

export const routesREB = [
  ...routesBase,
  {
    name: ROUTER_CONST_REB.ACCREDITATION.name,
    path: ROUTER_CONST_REB.ACCREDITATION.path,
    defaultParams: DefaultParams.Pagination,
    onEnter: (params: Params, router: Router<RouterDependencies>) => {
      const container = router.getDependencies().container;
      const {getBankInfo} = container.get<IBankViewModel>(VIEW_MODEL.Banks);
      if (params.bankInfoId) getBankInfo(params.bankInfoId);
    },
    children: [
      {
        name: ROUTER_CONST_REB.ACCREDITATION.DETAILS.name,
        path: ROUTER_CONST_REB.ACCREDITATION.DETAILS.path,
        onEnter: (params: Params, router: Router<RouterDependencies>): void => {
          const container = router.getDependencies().container;
          const {item, getItem, initAttachments} = container.get<
            IAccreditationViewModel
          >(VIEW_MODEL.Accreditation);

          if (!item) getItem(params.id);

          switch (params.tab) {
            case EActiveTabsName.AccreditationParameters:
              initAttachments(params.id);
              break;
          }
        },
      },
      {
        name: ROUTER_CONST_REB.ACCREDITATION.BANKS.name,
        path: ROUTER_CONST_REB.ACCREDITATION.BANKS.path,
        defaultParams: DefaultParams.Pagination,
        onEnter: (params: Params, router: Router<RouterDependencies>) => {},
      },
    ],
  },
  {
    name: ROUTER_CONST_REB.STATISTICS.name,
    path: ROUTER_CONST_REB.STATISTICS.path,
    defaultParams: {product: 'ACCREDITIVE'},
    onEnter: async (
      params: Params,
      router: Router<RouterDependencies>
    ): Promise<void> => {
      const container = router.getDependencies().container;
      const {load: loadDeals} = container.get<IWidgetDealsViewModel>(
        VIEW_MODEL.WidgetDeals
      );
      const {load: loadCredit} = container.get<IWidgetCreditViewModel>(
        VIEW_MODEL.WidgetCredit
      );
      const {load: loadExport} = container.get<IWidgetExportViewModel>(
        VIEW_MODEL.WidgetExport
      );
      const {getBankProducts} = container.get<IBankViewModel>(VIEW_MODEL.Banks);

      loadDeals(params);
      loadCredit(params);
      loadExport(params);
      getBankProducts();
    },
  },

  {
    name: ROUTER_CONST_REB.CREDIT_FOR_ACCREDITIVE.name,
    path: ROUTER_CONST_REB.CREDIT_FOR_ACCREDITIVE.path,
    onEnter: (params: Params, router: Router<RouterDependencies>): void => {},
  },
  {
    name: ROUTER_CONST_REB.CFA_BANKS.name,
    path: ROUTER_CONST_REB.CFA_BANKS.path,
    defaultParams: DefaultParams.Pagination,
    onEnter: (params: Params, router: Router<RouterDependencies>): void => {},
  },
  {
    name: ROUTER_CONST_REB.CFA_DEAL.name,
    path: ROUTER_CONST_REB.CFA_DEAL.path,
    defaultParams: DefaultParams.Pagination,
    onEnter: (params: Params, router: Router<RouterDependencies>): void => {
      const container = router.getDependencies().container;
      const {getBankInfo} = container.get<IBankViewModel>(VIEW_MODEL.Banks);
      const {availableUsers, getAvailableUsers} = container.get<
        ICFAListRebViewModel
      >(VIEW_MODEL.CFAList);
      const {
        cfaStatuses,
        cfaIndustries,
        individualCategories,
        territorialBanks,
        getCFAStatuses,
        getCFAIndustries,
        getIndividualCategories,
        getTerritorialBanks,
      } = container.get<IDictionaryViewModel>(VIEW_MODEL.Dictionary);

      if (params.bankId) getBankInfo(params.bankId);
      if (!cfaStatuses) getCFAStatuses();
      if (!cfaIndustries) getCFAIndustries();
      if (!individualCategories) getIndividualCategories();
      if (!territorialBanks) getTerritorialBanks();
      if (!availableUsers) getAvailableUsers();
    },
    children: [
      {
        name: ROUTER_CONST_REB.CFA_DEAL.DETAILS.name,
        path: ROUTER_CONST_REB.CFA_DEAL.DETAILS.path,
        defaultParams: DefaultParams.Pagination,
        onEnter: (params: Params, router: Router<RouterDependencies>): void => {
          const container = router.getDependencies().container;

          const {
            data: request,
            availableUsers,
            getRequest,
            getAvailableUsers,
          } = container.get<ICFARequestViewModel>(VIEW_MODEL.CFARequest);

          const {getCreditContract} = container.get<
            ICFACreditContractRebViewModel
          >(VIEW_MODEL.CFACreditContract);

          const {getGeneralAgreement} = container.get<
            ICFAGeneralAgreementRebViewModel
          >(VIEW_MODEL.CFAGeneralAgreement);

          const {
            individualCategories,
            cfaStatuses,
            cfaIndustries,
            getIndividualCategories,
            getCFAStatuses,
            getCFAIndustries,
          } = container.get<IDictionaryViewModel>(VIEW_MODEL.Dictionary);

          const {getDocumentList} = container.get<ICFADocumentViewModel>(
            VIEW_MODEL.CFADocument
          );

          const {getExportContractList} = container.get<
            ICFAExportContractViewModel
          >(VIEW_MODEL.CFAExportContract);
          const {getExportContractPreliminaryList} = container.get(
            VIEW_MODEL.CFAExportContractPreliminary
          );

          if (!individualCategories) getIndividualCategories();
          if (!cfaStatuses) getCFAStatuses();
          if (!cfaIndustries) getCFAIndustries();
          if (!request) getRequest(params.id);
          if (!availableUsers) getAvailableUsers(params.id);

          switch (params.tab) {
            case ECreditForAccreditiveTabs.Request:
              break;
            case ECreditForAccreditiveTabs.Documents:
              getDocumentList(params.id, params);
              break;
            case ECreditForAccreditiveTabs.Accreditive:
              getCreditContract(params.id);
              getGeneralAgreement(params.id);
              break;
            case ECreditForAccreditiveTabs.ExportContracts:
              getExportContractList(params.id);
              getExportContractPreliminaryList(params.id);
              break;
          }
        },
      },
    ],
  },
  {
    name: ROUTER_CONST_REB.CFA_REPORTS.name,
    path: ROUTER_CONST_REB.CFA_REPORTS.path,
    defaultParams: DefaultParams.Pagination,
    onEnter: (params: Params, router: Router<RouterDependencies>) => {
      const container = router.getDependencies().container;
      const {getBankInfo} = container.get<IBankViewModel>(VIEW_MODEL.Banks);
      if (params.bankId) getBankInfo(params.bankId);
    },
    children: [
      {
        name: ROUTER_CONST_REB.CFA_REPORTS.DETAILS_GENERAL_AGREEMENT.name,
        path: ROUTER_CONST_REB.CFA_REPORTS.DETAILS_GENERAL_AGREEMENT.path,
        defaultParams: DefaultParams.Pagination,
        onEnter: (params: Params, router: Router<RouterDependencies>) => {
          const container = router.getDependencies().container;

          const {cfaStatuses, getCFAStatuses} = container.get<
            IDictionaryViewModel
          >(VIEW_MODEL.Dictionary);

          const {
            report,
            getReport,
            reportGeneralAgreements: deals,
            getReportGeneralAgreements: getDeals,
          } = container.get<ICFA_ReportsRebViewModel>(VIEW_MODEL.CFA_Reports);

          const {availableUsers, getAvailableUsers} = container.get<
            ICFAListRebViewModel
          >(VIEW_MODEL.CFAList);

          if (!cfaStatuses) getCFAStatuses();
          if (!report) getReport(params.id);
          if (!deals) getDeals(params.id, params);
          if (!availableUsers) getAvailableUsers();
        },
      },
      {
        name: ROUTER_CONST_REB.CFA_REPORTS.DETAILS_CREDIT_CONTRACT.name,
        path: ROUTER_CONST_REB.CFA_REPORTS.DETAILS_CREDIT_CONTRACT.path,
        defaultParams: DefaultParams.Pagination,
        onEnter: (params: Params, router: Router<RouterDependencies>) => {
          const container = router.getDependencies().container;

          const {cfaStatuses, getCFAStatuses} = container.get<
            IDictionaryViewModel
          >(VIEW_MODEL.Dictionary);

          const {
            report,
            getReport,
            reportCreditAgreements: deals,
            getReportCreditAgreements: getDeals,
          } = container.get<ICFA_ReportsRebViewModel>(VIEW_MODEL.CFA_Reports);

          const {availableUsers, getAvailableUsers} = container.get<
            ICFAListRebViewModel
          >(VIEW_MODEL.CFAList);

          if (!cfaStatuses) getCFAStatuses();
          if (!report) getReport(params.id);
          if (!deals) getDeals(params.id, params);
          if (!availableUsers) getAvailableUsers();
        },
      },
    ],
  },

  {
    name: ROUTER_CONST_REB.REGISTRIES.name,
    path: ROUTER_CONST_REB.REGISTRIES.path,
    defaultParams: DefaultParams.Pagination,
    onEnter: (params: Params, router: Router<RouterDependencies>) => {},
    children: [
      {
        name: ROUTER_CONST_REB.REGISTRIES.DETAILS.name,
        path: ROUTER_CONST_REB.REGISTRIES.DETAILS.path,
        onEnter: (params: Params, router: Router<RouterDependencies>): void => {
          const container = router.getDependencies().container;
          const state = container.get<IRegistriesViewModel>(
            VIEW_MODEL.Registries
          );
          state.getItem(params.id);
        },
      },
    ],
  },
  {
    name: ROUTER_CONST_REB.REPORTS.name,
    path: ROUTER_CONST_REB.REPORTS.path,
    defaultParams: DefaultParams.Pagination,
    onEnter: (params: Params, router: Router<RouterDependencies>) => {},
    children: [
      {
        name: ROUTER_CONST_REB.REPORTS.DETAILS.name,
        path: ROUTER_CONST_REB.REPORTS.DETAILS.path,
        onEnter: (params: Params, router: Router<RouterDependencies>): void => {
          const container = router.getDependencies().container;
          const state = container.get<IReportsViewModel>(VIEW_MODEL.Reports);
          state.getItem(params.id);
        },
      },
    ],
  },
];
