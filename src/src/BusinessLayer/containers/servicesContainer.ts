import {Container} from 'inversify';
import {SERVICE} from '../identifiers';
import {BankService, IBankService} from '../services/Banks';
import {BicService} from '../services/Bic';
import {IBicService} from '../services/Bic/interfaces';
import {SupportService} from '../services/Support';
import {AppService} from '../services/App';
import {ICreditsService} from '../services/Credits/interfaces';
import {UserService} from '../services/User';
import {INotificationService} from '../services/Notification/interfaces';
import {NotificationService} from '../services/Notification';
import {IAttachmentService} from '../services/Attachment/interfaces';
import {CreditsService} from '../services/Credits';
import {ReportsService} from '../services/Reports';
import {IAppService} from '../services/App/interfaces';
import {RegistriesService} from '../services/Registries';
import {IRegistriesService} from '../services/Registries/interfaces';
import {IReportsService} from '../services/Reports/interfaces';
import {IUserService} from '../services/User/interfaces';
import {ISupportService} from '../services/Support/interfaces';
import {IMessagesService} from '../services/Messages/interfaces';
import {AttachmentService} from '../services/Attachment';
import {MessagesService} from '../services/Messages';
import {DictionaryService} from '../services/Dictionary';
import {IDictionaryService} from '../services/Dictionary/interfaces';
import {IWidgetDealsService} from '../services/Widgets/WidgetDeals/interfaces';
import {WidgetDealsService} from '../services/Widgets/WidgetDeals';
import {IWidgetCountriesService} from '../services/Widgets/WIdgetCountries/interfaces';
import {WidgetCountriesService} from '../services/Widgets/WIdgetCountries';
import {WidgetCreditService} from '../services/Widgets/WidgetCredit';
import {IWidgetCreditService} from '../services/Widgets/WidgetCredit/interfaces';
import {IWidgetIndustryService} from '../services/Widgets/WidgetIndustry/interfaces';
import {WidgetIndustryService} from '../services/Widgets/WidgetIndustry';
import {WidgetExportService} from '../services/Widgets/WidgetExport';
import {IWidgetExportService} from '../services/Widgets/WidgetExport/interfaces';

export const servicesContainer = new Container();

servicesContainer.bind<IAppService>(SERVICE.App).to(AppService);

servicesContainer
  .bind<IAttachmentService>(SERVICE.Attachment)
  .to(AttachmentService);

servicesContainer
  .bind<INotificationService>(SERVICE.Notification)
  .to(NotificationService);

servicesContainer.bind<ICreditsService>(SERVICE.Credits).to(CreditsService);

servicesContainer
  .bind<IRegistriesService>(SERVICE.Registries)
  .to(RegistriesService);

servicesContainer.bind<IReportsService>(SERVICE.Reports).to(ReportsService);

servicesContainer.bind<IMessagesService>(SERVICE.Messages).to(MessagesService);

servicesContainer.bind<IBankService>(SERVICE.Banks).to(BankService);

servicesContainer.bind<IUserService>(SERVICE.User).to(UserService);

servicesContainer.bind<IBicService>(SERVICE.Bic).to(BicService);

servicesContainer.bind<ISupportService>(SERVICE.Support).to(SupportService);

servicesContainer
  .bind<IDictionaryService>(SERVICE.Dictionary)
  .to(DictionaryService);

servicesContainer
  .bind<IWidgetDealsService>(SERVICE.WidgetDeals)
  .to(WidgetDealsService);

servicesContainer
  .bind<IWidgetCountriesService>(SERVICE.WidgetCountries)
  .to(WidgetCountriesService);

servicesContainer
  .bind<IWidgetCreditService>(SERVICE.WidgetCredit)
  .to(WidgetCreditService);

servicesContainer
  .bind<IWidgetIndustryService>(SERVICE.WidgetIndustry)
  .to(WidgetIndustryService);

servicesContainer
  .bind<IWidgetExportService>(SERVICE.WidgetExport)
  .to(WidgetExportService);
