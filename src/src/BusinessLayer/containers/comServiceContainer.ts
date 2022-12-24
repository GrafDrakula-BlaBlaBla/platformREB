import {Container} from 'inversify';
import {SERVICE} from '../identifiers';
import {
  AccreditationCommercialService,
  IAccreditationCommercialService,
} from '../services/Accreditation';
import {
  CFA_ReportsCommercialService,
  ICFA_ReportsCommercialService,
} from '../services/CFA_Reports';
import {CFA_DealComService} from '../services/CFA_Deal';
import {ICFA_DealComService} from '../services/CFA_Deal';
import {CFA_DraftService} from '../services/CFA_Draft';
import {ICFA_DraftService} from '../services/CFA_Draft/interfaces';
import {IDiscussionComService} from '../services/Discussion/interfaces';
import {DiscussionComService} from '../services/Discussion';

export const commercialServiceContainer = new Container();

commercialServiceContainer
  .bind<ICFA_ReportsCommercialService>(SERVICE.CFA_Reports)
  .to(CFA_ReportsCommercialService);

commercialServiceContainer
  .bind<IAccreditationCommercialService>(SERVICE.Accreditation)
  .to(AccreditationCommercialService);

commercialServiceContainer
  .bind<ICFA_DealComService>(SERVICE.CreditForAccreditive)
  .to(CFA_DealComService);

commercialServiceContainer
  .bind<ICFA_DraftService>(SERVICE.CFA_Draft)
  .to(CFA_DraftService);

commercialServiceContainer
  .bind<IDiscussionComService>(SERVICE.Discussion)
  .to(DiscussionComService);
