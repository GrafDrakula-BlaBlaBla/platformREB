import {Container} from 'inversify';
import {VIEW_MODEL} from '../identifiers';
import {
  AccreditationREBViewModel,
  IAccreditationREBViewModel,
} from '../viewModels/Accreditation';
import {
  CFA_ReportsRebViewModel,
  ICFA_ReportsRebViewModel,
} from '../viewModels/CFA_Reports';
import {
  CFAGeneralAgreementRebViewModel,
  ICFAGeneralAgreementRebViewModel,
} from '../viewModels/CFA_Deal/generalAgreement';
import {
  CFACreditContractRebViewModel,
  ICFACreditContractRebViewModel,
} from '../viewModels/CFA_Deal/creditContract';
import {
  CFAListRebViewModel,
  ICFAListRebViewModel,
} from '../viewModels/CFA_Deal/list';
import {IDiscussionRebViewModel} from '../viewModels/Discussion';
import {DiscussionRebViewModel} from '../viewModels/Discussion';
import {
  CFAAccreditiveRebViewModel,
  ICFAAccreditiveRebViewModel,
} from '../viewModels/CFA_Deal/accreditive';
import {
  CFARequestRebViewModel,
  ICFARequestRebViewModel,
} from '../viewModels/CFA_Deal/request';

export const rebViewModelContainer = new Container({defaultScope: 'Singleton'});

rebViewModelContainer
  .bind<ICFA_ReportsRebViewModel>(VIEW_MODEL.CFA_Reports)
  .to(CFA_ReportsRebViewModel);

rebViewModelContainer
  .bind<IAccreditationREBViewModel>(VIEW_MODEL.Accreditation)
  .to(AccreditationREBViewModel);

rebViewModelContainer
  .bind<IDiscussionRebViewModel>(VIEW_MODEL.Discussion)
  .to(DiscussionRebViewModel);

// CFARequest
rebViewModelContainer
  .bind<ICFARequestRebViewModel>(VIEW_MODEL.CFARequest)
  .to(CFARequestRebViewModel);

// CFAList
rebViewModelContainer
  .bind<ICFAListRebViewModel>(VIEW_MODEL.CFAList)
  .to(CFAListRebViewModel);

// CFAGeneralAgreement
rebViewModelContainer
  .bind<ICFAGeneralAgreementRebViewModel>(VIEW_MODEL.CFAGeneralAgreement)
  .to(CFAGeneralAgreementRebViewModel);

// CFACreditContract
rebViewModelContainer
  .bind<ICFACreditContractRebViewModel>(VIEW_MODEL.CFACreditContract)
  .to(CFACreditContractRebViewModel);

// CFAAccreditive
rebViewModelContainer
  .bind<ICFAAccreditiveRebViewModel>(VIEW_MODEL.CFAAccreditive)
  .to(CFAAccreditiveRebViewModel);
