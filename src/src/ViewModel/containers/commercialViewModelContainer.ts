import {Container} from 'inversify';
import {VIEW_MODEL} from '../identifiers';
import {
  AccreditationCommercialViewModel,
  IAccreditationCommercialViewModel,
} from '../viewModels/Accreditation';
import {
  CFA_ReportsCommercialViewModel,
  ICFA_ReportsCommercialViewModel,
} from '../viewModels/CFA_Reports';
import {
  CFAGeneralAgreementComViewModel,
  ICFAGeneralAgreementComViewModel,
} from '../viewModels/CFA_Deal/generalAgreement';
import {
  CFACreditContractComViewModel,
  ICFACreditContractComViewModel,
} from '../viewModels/CFA_Deal/creditContract';
import {CFADraftComViewModel} from '../viewModels/CFA_Draft/draft';
import {ICFADraftComViewModel} from '../viewModels/CFA_Draft/draft/interfaces';
import {CFADraftDocumentComViewModel} from '../viewModels/CFA_Draft/document';
import {ICFADraftDocumentComViewModel} from '../viewModels/CFA_Draft/document/interfaces';
import {CFADraftExportContractComViewModel} from '../viewModels/CFA_Draft/exportContract';
import {ICFADraftExportContractComViewModel} from '../viewModels/CFA_Draft/exportContract/interfaces';
import {
  CFAListCommercialViewModel,
  ICFAListViewModel,
} from '../viewModels/CFA_Deal/list';
import {IDiscussionComViewModel} from '../viewModels/Discussion';
import {DiscussionComViewModel} from '../viewModels/Discussion';
import {ICFADraftListComViewModel} from '../viewModels/CFA_Draft/list/interfaces';
import {CFADraftListComViewModel} from '../viewModels/CFA_Draft/list';
import {
  CFAAccreditiveComViewModel,
  ICFAAccreditiveComViewModel,
} from '../viewModels/CFA_Deal/accreditive';
import {
  CFARequestComViewModel,
  ICFARequestComViewModel,
} from '../viewModels/CFA_Deal/request';

export const commercialViewModelContainer = new Container({
  defaultScope: 'Singleton',
});

commercialViewModelContainer
  .bind<IAccreditationCommercialViewModel>(VIEW_MODEL.Accreditation)
  .to(AccreditationCommercialViewModel);

commercialViewModelContainer
  .bind<ICFA_ReportsCommercialViewModel>(VIEW_MODEL.CFA_Reports)
  .to(CFA_ReportsCommercialViewModel);

commercialViewModelContainer
  .bind<IDiscussionComViewModel>(VIEW_MODEL.Discussion)
  .to(DiscussionComViewModel);

// CFARequest
commercialViewModelContainer
  .bind<ICFARequestComViewModel>(VIEW_MODEL.CFARequest)
  .to(CFARequestComViewModel);

// CFAList
commercialViewModelContainer
  .bind<ICFAListViewModel>(VIEW_MODEL.CFAList)
  .to(CFAListCommercialViewModel);

// CFAGeneralAgreement
commercialViewModelContainer
  .bind<ICFAGeneralAgreementComViewModel>(VIEW_MODEL.CFAGeneralAgreement)
  .to(CFAGeneralAgreementComViewModel);

// CFACreditContract
commercialViewModelContainer
  .bind<ICFACreditContractComViewModel>(VIEW_MODEL.CFACreditContract)
  .to(CFACreditContractComViewModel);

// CFAAccreditive
commercialViewModelContainer
  .bind<ICFAAccreditiveComViewModel>(VIEW_MODEL.CFAAccreditive)
  .to(CFAAccreditiveComViewModel);

// CFADraft
commercialViewModelContainer
  .bind<ICFADraftComViewModel>(VIEW_MODEL.CFADraft)
  .to(CFADraftComViewModel);

// CFADraftDocument
commercialViewModelContainer
  .bind<ICFADraftDocumentComViewModel>(VIEW_MODEL.CFADraftDocument)
  .to(CFADraftDocumentComViewModel);

// CFADraftExportContract
commercialViewModelContainer
  .bind<ICFADraftExportContractComViewModel>(VIEW_MODEL.CFADraftExportContract)
  .to(CFADraftExportContractComViewModel);

// CFADraftList
commercialViewModelContainer
  .bind<ICFADraftListComViewModel>(VIEW_MODEL.CFADraftList)
  .to(CFADraftListComViewModel);
