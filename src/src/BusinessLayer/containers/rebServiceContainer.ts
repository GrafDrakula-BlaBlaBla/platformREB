import {Container} from 'inversify';
import {SERVICE} from '../identifiers';
import {
  AccreditationREBService,
  IAccreditationREBService,
} from '../services/Accreditation';
import {
  CFA_ReportsRebService,
  ICFA_ReportsRebService,
} from '../services/CFA_Reports';
import {CFA_DealRebService} from '../services/CFA_Deal';
import {ICFA_DealRebService} from '../services/CFA_Deal';
import {IDiscussionRebService} from '../services/Discussion/interfaces';
import {DiscussionRebService} from '../services/Discussion';

export const rebServiceContainer = new Container();

rebServiceContainer
  .bind<ICFA_ReportsRebService>(SERVICE.CFA_Reports)
  .to(CFA_ReportsRebService);

rebServiceContainer
  .bind<IAccreditationREBService>(SERVICE.Accreditation)
  .to(AccreditationREBService);

rebServiceContainer
  .bind<ICFA_DealRebService>(SERVICE.CreditForAccreditive)
  .to(CFA_DealRebService);

rebServiceContainer
  .bind<IDiscussionRebService>(SERVICE.Discussion)
  .to(DiscussionRebService);
