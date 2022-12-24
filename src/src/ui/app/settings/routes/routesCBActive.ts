import {Router} from 'router5';
import {Params} from 'router5/dist/types/base';
import {DefaultParams, ECreditForAccreditiveTabs} from './routesBase';
import {ROUTER_CONST_CB_ACTIVE} from '../routerConst/RouterConstCBActive';
import {RouterDependencies} from '../../../../index';
import {ICFA_ReportsCommercialViewModel} from '../../../../ViewModel/viewModels/CFA_Reports';
import {ICFACreditContractComViewModel} from '../../../../ViewModel/viewModels/CFA_Deal/creditContract';
import {ICFAGeneralAgreementComViewModel} from '../../../../ViewModel/viewModels/CFA_Deal/generalAgreement';
import {routesCB} from './routesCB';
import {IRegistriesViewModel} from '../../../../ViewModel/viewModels/Registries/interfaces';
import {VIEW_MODEL} from '../../../../ViewModel/identifiers';
import {IReportsViewModel} from '../../../../ViewModel/viewModels/Reports/interfaces';
import {ICFADraftComViewModel} from '../../../../ViewModel/viewModels/CFA_Draft/draft/interfaces';
import {ICFARequestViewModel} from '../../../../ViewModel/viewModels/CFA_Deal/request';
import {IDictionaryViewModel} from '../../../../ViewModel/viewModels/Dictionary/interfaces';
import {ICFAListComViewModel} from '../../../../ViewModel/viewModels/CFA_Deal/list';
import {ICFADocumentViewModel} from '../../../../ViewModel/viewModels/CFA_Deal/document/interfaces';
import {ICFAExportContractViewModel} from '../../../../ViewModel/viewModels/CFA_Deal/exportContract/interfaces';
import {ICFADraftExportContractComViewModel} from '../../../../ViewModel/viewModels/CFA_Draft/exportContract/interfaces';
import {ICFADraftDocumentComViewModel} from '../../../../ViewModel/viewModels/CFA_Draft/document/interfaces';
import {ICFADraftListComViewModel} from '../../../../ViewModel/viewModels/CFA_Draft/list/interfaces';
import {IWidgetDealsViewModel} from '../../../../ViewModel/viewModels/Widgets/WidgetDeals/interfaces';
import {IWidgetCreditViewModel} from '../../../../ViewModel/viewModels/Widgets/WidgetCredit/interfaces';
import {IWidgetExportViewModel} from '../../../../ViewModel/viewModels/Widgets/WidgetExport/interfaces';
import {IBankSettingsViewModel} from '../../../../ViewModel/viewModels/Banks';
import {IBankViewModel} from '../../../../ViewModel/viewModels/Banks';

export const routesCBActive = [
  ...routesCB,
  {
    name: ROUTER_CONST_CB_ACTIVE.STATISTICS.name,
    path: ROUTER_CONST_CB_ACTIVE.STATISTICS.path,
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
    name: ROUTER_CONST_CB_ACTIVE.BANK_SETTINGS.name,
    path: ROUTER_CONST_CB_ACTIVE.BANK_SETTINGS.path,
    onEnter: async (
      params: Params,
      router: Router<RouterDependencies>
    ): Promise<void> => {
      const container = router.getDependencies().container;
      const {
        getBank,
        getProducts,
        getAgreements,
        getTerritorialBanks,
      } = container.get<IBankSettingsViewModel>(VIEW_MODEL.BankSettings);

      getBank();
      getProducts();
      getAgreements();
      getTerritorialBanks();
    },
  },

  {
    name: ROUTER_CONST_CB_ACTIVE.CREDIT_FOR_ACCREDITIVE.name,
    path: ROUTER_CONST_CB_ACTIVE.CREDIT_FOR_ACCREDITIVE.path,
    onEnter: (params: Params, router: Router<RouterDependencies>) => {},
  },
  {
    name: ROUTER_CONST_CB_ACTIVE.CFA_DEAL.name,
    path: ROUTER_CONST_CB_ACTIVE.CFA_DEAL.path,
    defaultParams: DefaultParams.Pagination,
    onEnter: async (
      params: Params,
      router: Router<RouterDependencies>
    ): Promise<void> => {
      const container = router.getDependencies().container;
      const {availableUsers, getAvailableUsers} = container.get<
        ICFAListComViewModel
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

      if (!cfaStatuses) getCFAStatuses();
      if (!cfaIndustries) getCFAIndustries();
      if (!individualCategories) getIndividualCategories();
      if (!availableUsers) getAvailableUsers();
      if (!territorialBanks) getTerritorialBanks();
    },
    children: [
      {
        name: ROUTER_CONST_CB_ACTIVE.CFA_DEAL.DETAILS.name,
        path: ROUTER_CONST_CB_ACTIVE.CFA_DEAL.DETAILS.path,
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
            ICFACreditContractComViewModel
          >(VIEW_MODEL.CFACreditContract);

          const {getGeneralAgreement} = container.get<
            ICFAGeneralAgreementComViewModel
          >(VIEW_MODEL.CFAGeneralAgreement);

          const {
            individualCategories,
            cfaStatuses,
            cfaIndustries,
            getIndividualCategories,
            getCFAStatuses,
            getCFAIndustries,
          } = container.get<IDictionaryViewModel>(VIEW_MODEL.Dictionary);

          const {getDocumentList, documentList} = container.get<
            ICFADocumentViewModel
          >(VIEW_MODEL.CFADocument);

          const {getExportContractList, exportContractList} = container.get<
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
          if (!documentList) getDocumentList(params.id, params);
          if (!exportContractList) getExportContractList(params.id);

          switch (params.tab) {
            case ECreditForAccreditiveTabs.Request:
              break;
            case ECreditForAccreditiveTabs.Documents:
              break;
            case ECreditForAccreditiveTabs.Accreditive:
              getCreditContract(params.id);
              getGeneralAgreement(params.id);
              break;
            case ECreditForAccreditiveTabs.ExportContracts:
              getExportContractList(params.id);
              getExportContractPreliminaryList(params.id);
              break;
            case ECreditForAccreditiveTabs.Comments:
              break;
          }
        },
      },
    ],
  },
  {
    name: ROUTER_CONST_CB_ACTIVE.CFA_DRAFT.name,
    path: ROUTER_CONST_CB_ACTIVE.CFA_DRAFT.path,
    defaultParams: DefaultParams.Pagination,
    onEnter: async (params: Params, router: Router<RouterDependencies>) => {
      const container = router.getDependencies().container;
      const {
        cfaStatuses,
        cfaIndustries,
        individualCategories,
        getCFAStatuses,
        getCFAIndustries,
        getIndividualCategories,
      } = container.get<IDictionaryViewModel>(VIEW_MODEL.Dictionary);
      if (!cfaStatuses) getCFAStatuses();
      if (!cfaIndustries) getCFAIndustries();
      if (!individualCategories) getIndividualCategories();

      const {getDraftsCreated, setList} = container.get<
        ICFADraftListComViewModel
      >(VIEW_MODEL.CFADraftList);
      setList([]);
      getDraftsCreated(params);
    },
    children: [
      {
        name: ROUTER_CONST_CB_ACTIVE.CFA_DRAFT.DETAILS.name,
        path: ROUTER_CONST_CB_ACTIVE.CFA_DRAFT.DETAILS.path,
        defaultParams: DefaultParams.Pagination,
        onEnter: (params: Params, router: Router<RouterDependencies>) => {
          const container = router.getDependencies().container;

          const {data, getDraft} = container.get<ICFADraftComViewModel>(
            VIEW_MODEL.CFADraft
          );

          const {
            individualCategories,
            cfaStatuses,
            cfaIndustries,
            getIndividualCategories,
            getCFAStatuses,
            getCFAIndustries,
          } = container.get<IDictionaryViewModel>(VIEW_MODEL.Dictionary);

          const {documentList, getDocumentList} = container.get<
            ICFADraftDocumentComViewModel
          >(VIEW_MODEL.CFADraftDocument);

          const {list: exportContractList, getList} = container.get<
            ICFADraftExportContractComViewModel
          >(VIEW_MODEL.CFADraftExportContract);

          if (!data) getDraft(params.id);
          if (!individualCategories) getIndividualCategories();
          if (!cfaStatuses) getCFAStatuses();
          if (!cfaIndustries) getCFAIndustries();
          if (!documentList) getDocumentList(params.id, params);
          if (!exportContractList) getList(params.id);
        },
      },
    ],
  },
  {
    name: ROUTER_CONST_CB_ACTIVE.CFA_DRAFT_CANCELLED.name,
    path: ROUTER_CONST_CB_ACTIVE.CFA_DRAFT_CANCELLED.path,
    defaultParams: DefaultParams.Pagination,
    onEnter: (params: Params, router: Router<RouterDependencies>) => {
      const container = router.getDependencies().container;
      const {
        cfaStatuses,
        cfaIndustries,
        individualCategories,
        getCFAStatuses,
        getCFAIndustries,
        getIndividualCategories,
      } = container.get<IDictionaryViewModel>(VIEW_MODEL.Dictionary);
      if (!cfaStatuses) getCFAStatuses();
      if (!cfaIndustries) getCFAIndustries();
      if (!individualCategories) getIndividualCategories();

      const {getDraftsCancelled, setList} = container.get<
        ICFADraftListComViewModel
      >(VIEW_MODEL.CFADraftList);
      //@todo: разделить хранение данных на draft и draftsCancelled
      setList([]);
      getDraftsCancelled(params);
    },
    children: [
      {
        name: ROUTER_CONST_CB_ACTIVE.CFA_DRAFT.DETAILS.name,
        path: ROUTER_CONST_CB_ACTIVE.CFA_DRAFT.DETAILS.path,
        defaultParams: DefaultParams.Pagination,
        onEnter: (params: Params, router: Router<RouterDependencies>) => {
          const container = router.getDependencies().container;

          const {data, getDraft} = container.get<ICFADraftComViewModel>(
            VIEW_MODEL.CFADraft
          );
          const {list, getList} = container.get<
            ICFADraftExportContractComViewModel
          >(VIEW_MODEL.CFADraftExportContract);
          const {documentList, getDocumentList} = container.get<
            ICFADraftDocumentComViewModel
          >(VIEW_MODEL.CFADraftDocument);

          const {
            individualCategories,
            cfaStatuses,
            cfaIndustries,
            getIndividualCategories,
            getCFAStatuses,
            getCFAIndustries,
          } = container.get<IDictionaryViewModel>(VIEW_MODEL.Dictionary);

          if (!data) getDraft(params.id);
          if (!individualCategories) getIndividualCategories();
          if (!cfaStatuses) getCFAStatuses();
          if (!cfaIndustries) getCFAIndustries();
          if (!documentList) getDocumentList(params.id, params);
          if (!list) getList(params.id);
        },
      },
    ],
  },
  {
    name: ROUTER_CONST_CB_ACTIVE.CFA_REPORTS.name,
    path: ROUTER_CONST_CB_ACTIVE.CFA_REPORTS.path,
    defaultParams: DefaultParams.Pagination,
    onEnter: (params: Params, router: Router<RouterDependencies>) => {},
    children: [
      {
        name: ROUTER_CONST_CB_ACTIVE.CFA_REPORTS.DETAILS_GENERAL_AGREEMENT.name,
        path: ROUTER_CONST_CB_ACTIVE.CFA_REPORTS.DETAILS_GENERAL_AGREEMENT.path,
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
          } = container.get<ICFA_ReportsCommercialViewModel>(
            VIEW_MODEL.CFA_Reports
          );

          const {availableUsers, getAvailableUsers} = container.get<
            ICFAListComViewModel
          >(VIEW_MODEL.CFAList);

          if (!cfaStatuses) getCFAStatuses();
          if (!report) getReport(params.id);
          if (!deals) getDeals(params.id, params);
          if (!availableUsers) getAvailableUsers();
        },
      },
      {
        name: ROUTER_CONST_CB_ACTIVE.CFA_REPORTS.DETAILS_CREDIT_CONTRACT.name,
        path: ROUTER_CONST_CB_ACTIVE.CFA_REPORTS.DETAILS_CREDIT_CONTRACT.path,
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
          } = container.get<ICFA_ReportsCommercialViewModel>(
            VIEW_MODEL.CFA_Reports
          );

          const {availableUsers, getAvailableUsers} = container.get<
            ICFAListComViewModel
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
    name: ROUTER_CONST_CB_ACTIVE.FOUNDATION.name,
    path: ROUTER_CONST_CB_ACTIVE.FOUNDATION.path,
    defaultParams: DefaultParams.Pagination,
    onEnter: (params: Params, router: Router<RouterDependencies>) => {},
  },
  {
    name: ROUTER_CONST_CB_ACTIVE.CREDITS.name,
    path: ROUTER_CONST_CB_ACTIVE.CREDITS.path,
    defaultParams: DefaultParams.Pagination,
    onEnter: (params: Params, router: Router<RouterDependencies>) => {},
  },
  {
    name: ROUTER_CONST_CB_ACTIVE.REGISTRIES.name,
    path: ROUTER_CONST_CB_ACTIVE.REGISTRIES.path,
    defaultParams: DefaultParams.Pagination,
    onEnter: (params: Params, router: Router<RouterDependencies>) => {},
    children: [
      {
        name: ROUTER_CONST_CB_ACTIVE.REGISTRIES.DETAILS.name,
        path: ROUTER_CONST_CB_ACTIVE.REGISTRIES.DETAILS.path,
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
    name: ROUTER_CONST_CB_ACTIVE.REPORTS.name,
    path: ROUTER_CONST_CB_ACTIVE.REPORTS.path,
    defaultParams: DefaultParams.Pagination,
    onEnter: (params: Params, router: Router<RouterDependencies>) => {},
    children: [
      {
        name: ROUTER_CONST_CB_ACTIVE.REPORTS.DETAILS.name,
        path: ROUTER_CONST_CB_ACTIVE.REPORTS.DETAILS.path,
        onEnter: (params: Params, router: Router<RouterDependencies>): void => {
          const container = router.getDependencies().container;
          const state = container.get<IReportsViewModel>(VIEW_MODEL.Reports);
          state.getItem(params.id);
        },
      },
    ],
  },
];
