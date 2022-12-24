import {Container} from 'inversify';
import {VIEW_MODEL} from '../identifiers';
import {NotificationViewModel} from '../viewModels/Notification';
import {IAttachmentViewModel} from '../viewModels/Attachment/interfaces';
import {AttachmentViewModel} from '../viewModels/Attachment';
import {
  BankSettingsViewModel,
  BankViewModel,
  IBankSettingsViewModel,
  IBankViewModel,
} from '../viewModels/Banks';
import {ICFAExportContractViewModel} from '../viewModels/CFA_Deal/exportContract/interfaces';
import {CFAExportContractViewModel} from '../viewModels/CFA_Deal/exportContract';
import {IRegistriesViewModel} from '../viewModels/Registries/interfaces';
import {MessagesViewModel} from '../viewModels/Messages';
import {ReportsViewModel} from '../viewModels/Reports';
import {RegistriesViewModel} from '../viewModels/Registries';
import {IReportsViewModel} from '../viewModels/Reports/interfaces';
import {CreditsViewModel} from '../viewModels/Credits';
import {IMessagesViewModel} from '../viewModels/Messages/interfaces';
import {AppViewModel} from '../viewModels/App';
import {ICreditsViewModel} from '../viewModels/Credits/interfaces';
import {UserViewModel} from '../viewModels/User';
import {FilterViewModel} from '../viewModels/Filter';
import {IUserViewModel} from '../viewModels/User/interfaces';
import {IFilterViewModel} from '../viewModels/Filter/interfaces';
import {IMenuViewModel} from '../viewModels/Menu/interfaces';
import {MenuViewModel} from '../viewModels/Menu';
import {IBicViewModel} from '../viewModels/Bic/interfaces';
import {BicViewModel} from '../viewModels/Bic';
import {ISupportViewModel} from '../viewModels/Support/interfaces';
import {SupportViewModel} from '../viewModels/Support';
import {ICFADocumentViewModel} from '../viewModels/CFA_Deal/document/interfaces';
import {CFADocumentViewModel} from '../viewModels/CFA_Deal/document';
import {DictionaryViewModel} from '../viewModels/Dictionary';
import {
  IPageLifeCycle,
  PageLifeCycle,
} from '../../ui/app/LifeCycle/PageLifeCycle';
import {IDashboardViewModel} from '../viewModels/Dashboard/interfaces';
import {DashboardViewModel} from '../viewModels/Dashboard';
import {IWidgetDealsViewModel} from '../viewModels/Widgets/WidgetDeals/interfaces';
import {WidgetDealsViewModel} from '../viewModels/Widgets/WidgetDeals';
import {IWidgetCountriesViewModel} from '../viewModels/Widgets/WidgetCountries/interfaces';
import {WidgetCountriesViewModel} from '../viewModels/Widgets/WidgetCountries';
import {WidgetCreditViewModel} from '../viewModels/Widgets/WidgetCredit';
import {IWidgetCreditViewModel} from '../viewModels/Widgets/WidgetCredit/interfaces';
import {IWidgetIndustryViewModel} from '../viewModels/Widgets/WidgetIndustry/interfaces';
import {WidgetIndustryViewModel} from '../viewModels/Widgets/WidgetIndustry';
import {WidgetExportViewModel} from '../viewModels/Widgets/WidgetExport';
import {IWidgetExportViewModel} from '../viewModels/Widgets/WidgetExport/interfaces';
import {IDictionaryViewModel} from '../viewModels/Dictionary/interfaces';
import {CFAExportContractPreliminaryViewModel} from '../viewModels/CFA_Deal/exportContractPreliminary';
import {ICFAExportContractPreliminaryViewModel} from '../viewModels/CFA_Deal/exportContractPreliminary/interfaces';

const viewModelContainer = new Container({defaultScope: 'Singleton'});

viewModelContainer.bind(VIEW_MODEL.App).to(AppViewModel);

viewModelContainer
  .bind<NotificationViewModel>(VIEW_MODEL.Notifications)
  .to(NotificationViewModel);

viewModelContainer
  .bind<IAttachmentViewModel>(VIEW_MODEL.Attachments)
  .to(AttachmentViewModel);

viewModelContainer
  .bind<ICreditsViewModel>(VIEW_MODEL.Credits)
  .to(CreditsViewModel);

viewModelContainer
  .bind<IRegistriesViewModel>(VIEW_MODEL.Registries)
  .to(RegistriesViewModel);

viewModelContainer
  .bind<IReportsViewModel>(VIEW_MODEL.Reports)
  .to(ReportsViewModel);

viewModelContainer
  .bind<IMessagesViewModel>(VIEW_MODEL.Messages)
  .to(MessagesViewModel);

viewModelContainer.bind<IBankViewModel>(VIEW_MODEL.Banks).to(BankViewModel);

viewModelContainer.bind<IUserViewModel>(VIEW_MODEL.User).to(UserViewModel);

viewModelContainer
  .bind<IBankSettingsViewModel>(VIEW_MODEL.BankSettings)
  .to(BankSettingsViewModel);

viewModelContainer
  .bind<IFilterViewModel>(VIEW_MODEL.Filters)
  .to(FilterViewModel);

viewModelContainer.bind<IMenuViewModel>(VIEW_MODEL.Menu).to(MenuViewModel);

viewModelContainer.bind<IBicViewModel>(VIEW_MODEL.Bic).to(BicViewModel);

viewModelContainer
  .bind<ISupportViewModel>(VIEW_MODEL.Support)
  .to(SupportViewModel);

viewModelContainer
  .bind<IDictionaryViewModel>(VIEW_MODEL.Dictionary)
  .to(DictionaryViewModel);

// CFADocument
viewModelContainer
  .bind<ICFADocumentViewModel>(VIEW_MODEL.CFADocument)
  .to(CFADocumentViewModel);

// CFAExportContract
viewModelContainer
  .bind<ICFAExportContractViewModel>(VIEW_MODEL.CFAExportContract)
  .to(CFAExportContractViewModel);

viewModelContainer
  .bind<ICFAExportContractPreliminaryViewModel>(
    VIEW_MODEL.CFAExportContractPreliminary
  )
  .to(CFAExportContractPreliminaryViewModel);

viewModelContainer
  .bind<IPageLifeCycle>(VIEW_MODEL.PageLifeCycle)
  .to(PageLifeCycle);

viewModelContainer
  .bind<IDashboardViewModel>(VIEW_MODEL.Dashboard)
  .to(DashboardViewModel);

viewModelContainer
  .bind<IWidgetDealsViewModel>(VIEW_MODEL.WidgetDeals)
  .to(WidgetDealsViewModel);

viewModelContainer
  .bind<IWidgetIndustryViewModel>(VIEW_MODEL.WidgetIndustry)
  .to(WidgetIndustryViewModel);

viewModelContainer
  .bind<IWidgetCountriesViewModel>(VIEW_MODEL.WidgetCountries)
  .to(WidgetCountriesViewModel);

viewModelContainer
  .bind<IWidgetCreditViewModel>(VIEW_MODEL.WidgetCredit)
  .to(WidgetCreditViewModel);

viewModelContainer
  .bind<IWidgetExportViewModel>(VIEW_MODEL.WidgetExport)
  .to(WidgetExportViewModel);

export {VIEW_MODEL, viewModelContainer};
