import {action, computed, makeObservable, observable} from 'mobx';
import {SERVICE} from '../../../../BusinessLayer/identifiers';
import {Params} from 'router5/dist/types/base';
import {IWidgetCreditService} from '../../../../BusinessLayer/services/Widgets/WidgetCredit/interfaces';
import {
  IWidgetCreditInfoDTO,
  IWidgetCreditMappedInfo,
  IWidgetCreditMappedInfoKey,
} from '../../../../Model/Widgets/WidgetCredit';
import {BaseViewModel} from '../../Base';
import {IWidgetCreditViewModel} from './interfaces';
import {inject, injectable} from 'inversify';

const order: IWidgetCreditMappedInfoKey[] = [
  'limitAgreement',
  'issued',
  'balance',
  'unusedLimit',
  'paidFor',
];

@injectable()
export class WidgetCreditViewModel
  extends BaseViewModel
  implements IWidgetCreditViewModel {
  @inject(SERVICE.WidgetCredit) protected service!: IWidgetCreditService;

  constructor() {
    super();
    makeObservable(this, {
      creditInfo: observable,
      mappedCreditInfo: computed,
      setCreditInfo: action,
      load: action,
    });
  }

  creditInfo: IWidgetCreditInfoDTO | null = null;

  get mappedCreditInfo(): IWidgetCreditMappedInfo | null {
    if (!this.creditInfo) {
      return null;
    }

    const {creditAgreement, generalAgreement} = this.creditInfo;
    const result: IWidgetCreditMappedInfo = [];

    for (let key of order) {
      if (key === 'limitAgreement') {
        result.push({
          name: key,
          creditAgreement: +creditAgreement.limitCreditAgreement,
          generalAgreement: +generalAgreement.limitGeneralAgreement,
        });
        continue;
      }
      result.push({
        name: key,
        creditAgreement: +creditAgreement[key],
        generalAgreement: +generalAgreement[key],
      });
    }

    return result;
  }

  setCreditInfo = (creditInfo: IWidgetCreditInfoDTO) => {
    this.creditInfo = creditInfo;
  };

  load = async (params: Params) => {
    this.setLoading();
    const creditInfo = await this.service.getCreditInfo(params);
    this.setCreditInfo(creditInfo);
    this.unsetLoading();
  };
}
