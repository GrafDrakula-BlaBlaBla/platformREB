import {CFA_DealService} from '../base';
import {ISession} from '../../../../Bootstrap/Session/interfaces';
import {ICFA_DealComService} from '../interfaces';
import {ICFA_DealComAPIClient} from '../../../../IntegrationLayer/APIClients/CFA_Deal';
import {inject, injectable} from 'inversify';
import {SESSION} from '../../../../Bootstrap/Session';
import {API_CLIENT} from '../../../../IntegrationLayer/identifiers';
import {
  ICFABankUserDTO,
  ICFARequestParametersDTO,
} from '../../../../Model/CFA_Deal';

@injectable()
export class CFA_DealComService
  extends CFA_DealService
  implements ICFA_DealComService {
  @inject(API_CLIENT.CreditForAccreditive)
  protected APIClient!: ICFA_DealComAPIClient;
  @inject(SESSION) protected session!: ISession;

  getAvailableUsers = async (): Promise<ICFABankUserDTO[]> => {
    const session = await this.session.getSession();
    return this.APIClient.getAvailableUsers(session.bank.objectId);
  };
  saveRequestParameters(
    id: string,
    data: ICFARequestParametersDTO
  ): Promise<ICFARequestParametersDTO> {
    const payload: ICFARequestParametersDTO = {
      limitCreditAgreement: data.limitCreditAgreement,
      revolving: data.revolving,
      currency: data.currency,
      loanRate: data.loanRate,
      loanCreditLine: data.loanCreditLine,
      loanTranche: data.loanTranche,
      financingType: data.financingType,
      limitGeneralAgreement: data.limitGeneralAgreement,
      loanPeriodGeneralAgreement: data.loanPeriodGeneralAgreement,
      commission: data.commission,
    };
    return this.APIClient.saveRequestParameters(id, payload);
  }

  getControllers = () => {
    return this.APIClient.getControllers();
  };
  attachControllers = (cfaId: string, userIds: string[]) => {
    return this.APIClient.attachControllers(cfaId, userIds);
  };

  approveDeal = () => {
    return this.APIClient.approveDeal();
  };
  returnDeal = (value?: string) => {
    return this.APIClient.returnDeal(value);
  };
}
