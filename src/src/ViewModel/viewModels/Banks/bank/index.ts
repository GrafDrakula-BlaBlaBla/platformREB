import {action, computed, makeObservable, observable} from 'mobx';
import {
  IBankForAccreditationViewModel,
  IBankForCFAViewModel,
  IBankViewModel,
} from '../interfaces';
import {BaseViewModel} from '../../Base';
import {BankForCFAViewModel} from '../bankForCFA';
import {BankForAccreditationViewModel} from '../bankForAccreditation';
import {IBankService} from '../../../../BusinessLayer/services/Banks';
import {
  IBankAdminDTO,
  IBankDTO,
  IBankProductDTO,
} from '../../../../Model/Banks';
import {inject, injectable, postConstruct} from 'inversify';
import {SERVICE} from '../../../../BusinessLayer/identifiers';

@injectable()
export class BankViewModel extends BaseViewModel implements IBankViewModel {
  bankInfo?: IBankDTO;
  currentBank?: IBankDTO;
  bankAdmins: IBankAdminDTO[] = [];
  bankProducts?: IBankProductDTO[];

  BankForCFA!: IBankForCFAViewModel;
  BankForAccreditation!: IBankForAccreditationViewModel;

  @inject(SERVICE.Banks) protected service!: IBankService;

  constructor() {
    super();
    makeObservable(this, {
      bankInfo: observable,
      currentBank: observable,
      bankAdmins: observable,
      bankProducts: observable,
      bankProductsSelectItems: computed,
      setBankInfo: action,
      clearBankInfo: action,
      setCurrentBank: action,
      setBankAdmins: action,
      setBankProducts: action,
    });
  }

  @postConstruct()
  postConstruct() {
    this.BankForCFA = new BankForCFAViewModel(this.service.BankForCFA);
    this.BankForAccreditation = new BankForAccreditationViewModel(
      this.service.BankForAccreditation
    );
  }

  setBankInfo = (bankInfo: IBankDTO) => {
    this.bankInfo = bankInfo;
  };
  setCurrentBank = (bankInfo: IBankDTO) => {
    this.currentBank = bankInfo;
  };
  clearBankInfo = () => {
    this.bankInfo = undefined;
  };

  getBankInfo = async (bankId?: string): Promise<IBankDTO> => {
    this.setLoading();
    const bankInfo = await this.service.getBankInfo(bankId);
    this.setBankInfo(bankInfo);
    this.unsetLoading();
    return bankInfo;
  };
  getBankInfoFromBic = async (bic: string): Promise<void> => {
    this.setLoading();
    const bankInfo = await this.service.getBankInfoFromBic(bic);
    this.setBankInfo(bankInfo);
    this.unsetLoading();
  };

  getCurrentBank = async (): Promise<IBankDTO> => {
    if (this.currentBank) {
      return Promise.resolve(this.currentBank);
    }
    this.setLoading();
    const bankInfo = await this.service.getCurrentBank();
    this.setCurrentBank(bankInfo);
    this.unsetLoading();
    return bankInfo;
  };

  getBankAdmins = async (): Promise<void> => {
    this.setLoading();
    const bankAdmins = await this.service.getBankAdmins();
    this.setBankAdmins(bankAdmins);
    this.unsetLoading();
  };
  setBankAdmins = (bankAdmins: IBankAdminDTO[]) => {
    this.bankAdmins = bankAdmins;
  };

  getBankProducts = async (): Promise<void> => {
    this.setLoading();
    const bankProducts = await this.service.getProducts();
    this.setBankProducts(bankProducts);
    this.unsetLoading();
  };
  setBankProducts = (bankProducts: IBankProductDTO[]) => {
    this.bankProducts = bankProducts;
  };
  get bankProductsSelectItems() {
    return this.bankProducts
      ?.filter((product) => product.isActivated)
      .map((product) => {
        return {
          label: product.title,
          value: product.type,
        };
      });
  }
}
