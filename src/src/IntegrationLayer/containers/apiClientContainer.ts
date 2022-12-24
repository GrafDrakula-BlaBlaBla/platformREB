import {Container} from 'inversify';
import {API_CLIENT} from '../identifiers';
import {IAppAPIClient} from '../APIClients/App/interfaces';
import {AppAPIClient} from '../APIClients/App';
import {IAttachmentAPIClient} from '../APIClients/Attachment/interfaces';
import {AttachmentAPIClient} from '../APIClients/Attachment';
import {IRegistriesAPIClient} from '../APIClients/Registries/interfaces';
import {RegistriesAPIClient} from '../APIClients/Registries';
import {CreditAPIClient} from '../APIClients/Credits';
import {ReportsAPIClient} from '../APIClients/Reports';
import {IMessagesApiClient} from '../APIClients/Messages/interfaces';
import {IBankAPIClient, BankAPIClient} from '../APIClients/Banks';
import {IUserAPIClient} from '../APIClients/User/interfaces';
import {UserAPIClient} from '../APIClients/User';
import {BicApiClient} from '../APIClients/Bic';
import {SupportAPIClient} from '../APIClients/Support';
import {IReportsAPIClient} from '../APIClients/Reports/interfaces';
import {ICreditsAPIClient} from '../APIClients/Credits/interfaces';
import {MessagesApiClient} from '../APIClients/Messages';
import {DiscussionAPIClient} from '../APIClients/Discussion';
import {DictionaryAPIClient} from '../APIClients/Dictionary';
import {IBicApiClient} from '../APIClients/Bic/interfaces';
import {ISupportAPIClient} from '../APIClients/Support/interfaces';
import {IDiscussionAPIClient} from '../APIClients/Discussion/interfaces';
import {IDictionaryAPIClient} from '../APIClients/Dictionary/interfaces';

export const apiClientContainer = new Container();

apiClientContainer
  .bind<IAppAPIClient>(API_CLIENT.App)
  .to(AppAPIClient)
  .inSingletonScope();

apiClientContainer
  .bind<IAttachmentAPIClient>(API_CLIENT.Attachment)
  .to(AttachmentAPIClient);

apiClientContainer
  .bind<IRegistriesAPIClient>(API_CLIENT.Registries)
  .to(RegistriesAPIClient);

apiClientContainer
  .bind<ICreditsAPIClient>(API_CLIENT.Credits)
  .to(CreditAPIClient);

apiClientContainer
  .bind<IReportsAPIClient>(API_CLIENT.Reports)
  .to(ReportsAPIClient);

apiClientContainer
  .bind<IMessagesApiClient>(API_CLIENT.Messages)
  .to(MessagesApiClient);

apiClientContainer.bind<IBankAPIClient>(API_CLIENT.Banks).to(BankAPIClient);

apiClientContainer.bind<IUserAPIClient>(API_CLIENT.User).to(UserAPIClient);

apiClientContainer.bind<IBicApiClient>(API_CLIENT.Bic).to(BicApiClient);

apiClientContainer
  .bind<ISupportAPIClient>(API_CLIENT.Support)
  .to(SupportAPIClient);

apiClientContainer
  .bind<IDiscussionAPIClient>(API_CLIENT.Discussion)
  .to(DiscussionAPIClient);

apiClientContainer
  .bind<IDictionaryAPIClient>(API_CLIENT.Dictionary)
  .to(DictionaryAPIClient);
