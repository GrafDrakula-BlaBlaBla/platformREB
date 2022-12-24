import {Container} from 'inversify';
import {API_CLIENT} from '../identifiers';
import {
  CFA_ReportsREBAPIClient,
  ICFA_ReportRebAPIClient,
} from '../APIClients/CFA_Reports';
import {
  AccreditationREBAPIClient,
  IAccreditationREBAPIClient,
} from '../APIClients/Accreditation';
import {
  CFA_DealRebAPIClient,
  ICFA_DealRebAPIClient,
} from '../APIClients/CFA_Deal';
import {WidgetCreditRebApiClient} from '../APIClients/Widgets/WidgetCredit';
import {WidgetIndustryRebAPIClient} from '../APIClients/Widgets/WidgetIndustry';
import {IWidgetIndustryAPIClient} from '../APIClients/Widgets/WidgetIndustry/interfaces';
import {WidgetCountriesRebApiClient} from '../APIClients/Widgets/WidgetCountries';
import {IWidgetExportApiClient} from '../APIClients/Widgets/WidgetExport/interfaces';
import {WidgetExportRebApiClient} from '../APIClients/Widgets/WidgetExport';
import {IWidgetCountriesApiClient} from '../APIClients/Widgets/WidgetCountries/interfaces';
import {IWidgetCreditApiClient} from '../APIClients/Widgets/WidgetCredit/interfaces';
import {IWidgetDealsApiClient} from '../APIClients/Widgets/WidgetDeals/interfaces';
import {WidgetDealsRebApiClient} from '../APIClients/Widgets/WidgetDeals';

export const RebApiClientContainer = new Container();

RebApiClientContainer.bind<ICFA_ReportRebAPIClient>(API_CLIENT.CFA_Reports).to(
  CFA_ReportsREBAPIClient
);

RebApiClientContainer.bind<IAccreditationREBAPIClient>(
  API_CLIENT.Accreditation
).to(AccreditationREBAPIClient);

RebApiClientContainer.bind<ICFA_DealRebAPIClient>(
  API_CLIENT.CreditForAccreditive
).to(CFA_DealRebAPIClient);

RebApiClientContainer.bind<IWidgetDealsApiClient>(API_CLIENT.WidgetDeals).to(
  WidgetDealsRebApiClient
);

RebApiClientContainer.bind<IWidgetIndustryAPIClient>(
  API_CLIENT.WidgetIndustry
).to(WidgetIndustryRebAPIClient);

RebApiClientContainer.bind<IWidgetCountriesApiClient>(
  API_CLIENT.WidgetCountries
).to(WidgetCountriesRebApiClient);

RebApiClientContainer.bind<IWidgetCreditApiClient>(API_CLIENT.WidgetCredit).to(
  WidgetCreditRebApiClient
);

RebApiClientContainer.bind<IWidgetExportApiClient>(API_CLIENT.WidgetExport).to(
  WidgetExportRebApiClient
);
