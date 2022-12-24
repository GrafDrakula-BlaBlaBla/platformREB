import {ICFARequestViewModel} from '../interfaces';
import {BaseCardViewModel} from '../../../BaseCard';
import {ICFA_DealService} from '../../../../../BusinessLayer/services/CFA_Deal';
import {
  ECFAGeneralAgreementStatus,
  ECFASourceType,
  ICFABankUserDTO,
  ICFARequestDTOExtend,
} from '../../../../../Model/CFA_Deal';
import {action, computed, makeObservable, observable} from 'mobx';
import {injectable} from 'inversify';
import {IRadioItem} from '../../../../../ui/Common/FieldControls';

@injectable()
export class CFARequestViewModel
  extends BaseCardViewModel<ICFARequestDTOExtend>
  implements ICFARequestViewModel {
  protected service!: ICFA_DealService;

  constructor() {
    super();
    makeObservable(this, {
      isManual: computed,
      isClosed: computed,
      loadingUsers: observable,
      setLoadingUsers: action,
      availableUsers: observable,
      setAvailableUsers: action,
      currenciesItems: computed,
    });
  }

  get isManual() {
    return this.data?.sourceType === ECFASourceType.MANUAL;
  }
  get isClosed() {
    return (
      this.data?.generalAgreementStatus === ECFAGeneralAgreementStatus.CLOSED
    );
  }
  get isDone() {
    return Boolean(this.data?.isDone);
  }

  getRequest = async (id: string) => {
    this.setLoading();
    try {
      const data = await this.service.getRequest(id);
      this.setData(data);
    } finally {
      this.unsetLoading();
    }
  };

  loadingUsers?: boolean = false;
  setLoadingUsers = (value: boolean) => {
    this.loadingUsers = value;
  };

  availableUsers?: ICFABankUserDTO[];
  getAvailableUsers = async (cfaId: string) => {
    this.setLoading();
    try {
      const data = await this.service.getAvailableCFAUsers(cfaId);
      this.setAvailableUsers(data);
    } finally {
      this.unsetLoading();
    }
  };
  setAvailableUsers = (data?: ICFABankUserDTO[]) => {
    this.availableUsers = data;
  };
  attachUsers = async (cfaId: string, ids: string[]) => {
    this.setLoadingUsers(true);
    try {
      await this.service.attachCFAUsers(cfaId, ids);
    } finally {
      this.setLoadingUsers(false);
    }
  };
  getRequestUsers = async (id: string) => {
    this.setLoadingUsers(true);
    try {
      const data = await this.service.getRequest(id);
      this.setData(data);
    } finally {
      this.setLoadingUsers(false);
    }
  };

  currencies: Record<string, {codeLat: string; name: string}> = {
    '643': {
      codeLat: 'RUB',
      name: 'Российский рубль',
    },
    '840': {
      codeLat: 'USD',
      name: 'Доллар США',
    },
    '978': {
      codeLat: 'EUR',
      name: 'Евро',
    },
  };
  get currenciesItems() {
    return Object.keys(this.currencies).map((value) => {
      return {
        value: value,
        label: this.currencies[value].name,
      };
    });
  }
  getCurrencyCodeLat = (codeDig?: string) => {
    return codeDig ? this.currencies[codeDig]?.codeLat : '';
  };

  financingTypeItems: IRadioItem[] = [
    {value: 'Предэкспорт', label: 'Предэкспорт'},
    {value: 'Постэкспорт', label: 'Постэкспорт'},
  ];
}
