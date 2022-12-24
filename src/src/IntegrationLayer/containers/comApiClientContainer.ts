import {Container} from 'inversify';
import {API_CLIENT} from '../identifiers';
import {
  CFA_ReportsCommercialAPIClient,
  ICFA_ReportCommercialAPIClient,
} from '../APIClients/CFA_Reports';
import {
  AccreditationCommercialAPIClient,
  IAccreditationCommercialAPIClient,
} from '../APIClients/Accreditation';
import {
  CFA_DealComAPIClient,
  ICFA_DealComAPIClient,
} from '../APIClients/CFA_Deal';
import {CFA_DraftAPIClient} from '../APIClients/CFA_Draft';
import {ICFA_DraftAPIClient} from '../APIClients/CFA_Draft/interfaces';
import {WidgetIndustryComAPIClient} from '../APIClients/Widgets/WidgetIndustry';
import {IWidgetIndustryAPIClient} from '../APIClients/Widgets/WidgetIndustry/interfaces';
import {WidgetCountriesComApiClient} from '../APIClients/Widgets/WidgetCountries';
import {WidgetExportComApiClient} from '../APIClients/Widgets/WidgetExport';
import {IWidgetCountriesApiClient} from '../APIClients/Widgets/WidgetCountries/interfaces';
import {IWidgetExportApiClient} from '../APIClients/Widgets/WidgetExport/interfaces';
import {IWidgetCreditApiClient} from '../APIClients/Widgets/WidgetCredit/interfaces';
import {WidgetCreditComApiClient} from '../APIClients/Widgets/WidgetCredit';
import {WidgetDealsComApiClient} from '../APIClients/Widgets/WidgetDeals';
import {IWidgetDealsApiClient} from '../APIClients/Widgets/WidgetDeals/interfaces';

export const ComApiClientContainer = new Container();

ComApiClientContainer.bind<ICFA_ReportCommercialAPIClient>(
  API_CLIENT.CFA_Reports
).to(CFA_ReportsCommercialAPIClient);

ComApiClientContainer.bind<IAccreditationCommercialAPIClient>(
  API_CLIENT.Accreditation
).to(AccreditationCommercialAPIClient);

ComApiClientContainer.bind<ICFA_DealComAPIClient>(
  API_CLIENT.CreditForAccreditive
).to(CFA_DealComAPIClient);

ComApiClientContainer.bind<ICFA_DraftAPIClient>(API_CLIENT.CFA_Draft).to(
  CFA_DraftAPIClient
);

ComApiClientContainer.bind<IWidgetDealsApiClient>(API_CLIENT.WidgetDeals).to(
  WidgetDealsComApiClient
);

ComApiClientContainer.bind<IWidgetIndustryAPIClient>(
  API_CLIENT.WidgetIndustry
).to(WidgetIndustryComAPIClient);

ComApiClientContainer.bind<IWidgetCountriesApiClient>(
  API_CLIENT.WidgetCountries
).to(WidgetCountriesComApiClient);

ComApiClientContainer.bind<IWidgetCreditApiClient>(API_CLIENT.WidgetCredit).to(
  WidgetCreditComApiClient
);

ComApiClientContainer.bind<IWidgetExportApiClient>(API_CLIENT.WidgetExport).to(
  WidgetExportComApiClient
);
