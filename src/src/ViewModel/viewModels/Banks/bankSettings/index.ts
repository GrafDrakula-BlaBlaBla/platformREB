import {IBankSettingsViewModel} from '../interfaces';
import {
  EBankInteractionTypes,
  IBankAgreementDTO,
  IBankDTO,
  IBankProductDTO,
} from '../../../../Model/Banks';
import {TERRITORIAL_BANK_NEW} from '../../../../Model/Dictionary';
import {IBankService} from '../../../../BusinessLayer/services/Banks';
import {action, computed, makeObservable, observable} from 'mobx';
import {IDictionaryService} from '../../../../BusinessLayer/services/Dictionary/interfaces';
import {
  IDictionaryTerritorialBankDTO,
  IDictionaryTerritorialBankExtendedDTO,
} from '../../../../Model/Dictionary';
import {IUserDTO} from '../../../../Model/User';
import {IUserService} from '../../../../BusinessLayer/services/User/interfaces';
import {ISelectItem} from '../../../../ui/Common/FieldControls';
import {inject, injectable} from 'inversify';
import {SERVICE} from '../../../../BusinessLayer/identifiers';

@injectable()
export class BankSettingsViewModel implements IBankSettingsViewModel {
  @inject(SERVICE.Banks) protected serviceBank!: IBankService;
  @inject(SERVICE.Dictionary) protected serviceDictionary!: IDictionaryService;
  @inject(SERVICE.User) protected serviceUser!: IUserService;

  bank?: IBankDTO;
  products?: IBankProductDTO[];
  agreements?: IBankAgreementDTO[];
  territorialBanks?: IDictionaryTerritorialBankExtendedDTO[];
  territorialBankId?: string;
  users?: IUserDTO[];

  loadingBank: boolean = false;
  loadingProducts: boolean = false;
  loadingAgreements: boolean = false;
  loadingTerritorialBanks: boolean = false;
  loadingUsers: boolean = false;

  constructor() {
    makeObservable(this, {
      bank: observable,
      products: observable,
      agreements: observable,
      territorialBanks: observable,
      territorialBanksSelect: computed,
      territorialBankId: observable,
      users: observable,

      loadingBank: observable,
      loadingProducts: observable,
      loadingAgreements: observable,
      loadingTerritorialBanks: observable,
      loadingUsers: observable,

      isManual: computed,
      isTerritorialBankAdding: computed,

      setLoadingBank: action,
      setLoadingProducts: action,
      setLoadingAgreements: action,
      setLoadingTerritorialBanks: action,
      setLoadingUsers: action,

      setBank: action,
      setProducts: action,
      setAgreements: action,
      setTerritorialBanks: action,
      setTerritorialBankId: action,
      setUsers: action,

      getBank: action,
      getProducts: action,
      getAgreements: action,
      getTerritorialBanks: action,
      getUsers: action,

      territorialBankAdd: action,
      territorialBankSave: action,
      territorialBankCancel: action,
      territorialBankDelete: action,
      territorialBankSetIsDirty: action,
      territorialBankSetIsValid: action,
      territorialBankSetField: action,
      territorialBankSetLoading: action,
      territorialBanksReload: action,

      updateUsers: action,
      updateUserBank: action,
      removeUser: action,
    });
  }

  get isManual() {
    return this.bank?.settings?.interactionType === EBankInteractionTypes.API;
  }
  get isTerritorialBankAdding() {
    return this.territorialBanks
      ? this.territorialBanks?.filter((bank) => bank.isNew).length > 0
      : false;
  }

  setLoadingBank = (value: boolean) => {
    this.loadingBank = value;
  };
  setLoadingProducts = (value: boolean) => {
    this.loadingProducts = value;
  };
  setLoadingAgreements = (value: boolean) => {
    this.loadingAgreements = value;
  };
  setLoadingTerritorialBanks = (value: boolean) => {
    this.loadingTerritorialBanks = value;
  };
  setLoadingUsers = (value: boolean) => {
    this.loadingUsers = value;
  };

  setBank = (data?: IBankDTO) => {
    this.bank = data;
  };
  setProducts = (data?: IBankProductDTO[]) => {
    this.products = data;
  };
  setAgreements = (data?: IBankAgreementDTO[]) => {
    this.agreements = data;
  };
  setTerritorialBanks = (data?: IDictionaryTerritorialBankExtendedDTO[]) => {
    this.territorialBanks = data;
  };
  setTerritorialBankId = (value?: string) => {
    this.territorialBankId = value;
  };
  setUsers = (data?: IUserDTO[]) => {
    this.users = data;
  };

  getBank = async () => {
    this.setLoadingBank(true);
    try {
      const data = await this.serviceBank.getCurrentBank();
      this.setBank(data);
    } finally {
      this.setLoadingBank(false);
    }
  };
  getProducts = async () => {
    this.setLoadingProducts(true);
    try {
      const data = await this.serviceBank.getProducts();
      this.setProducts(data);
    } finally {
      this.setLoadingProducts(false);
    }
  };
  getAgreements = async () => {
    this.setLoadingAgreements(true);
    try {
      const data = await this.serviceBank.getAgreements();
      this.setAgreements(data);
    } finally {
      this.setLoadingAgreements(false);
    }
  };
  getTerritorialBanks = async () => {
    this.setLoadingTerritorialBanks(true);
    try {
      const data = await this.serviceDictionary.getTerritorialBanks();
      if (data) {
        this.setTerritorialBanks(data.map(this.territorialBankMapToViewModel));
      }
    } finally {
      this.setLoadingTerritorialBanks(false);
    }
  };
  getUsers = async (territorialBankId: string): Promise<IUserDTO[]> => {
    let data;
    this.setTerritorialBankId(territorialBankId);
    this.territorialBankSetLoading(territorialBankId, true);
    try {
      data = await this.serviceUser.getUsersTB(territorialBankId);
      this.setUsers(data);
    } finally {
      this.territorialBankSetLoading(territorialBankId, false);
    }
    return data;
  };

  get territorialBanksSelect() {
    const empty: ISelectItem = {
      value: '',
      label: 'Выберите ТБ',
    };
    return [empty].concat(
      this.territorialBanks
        ?.filter((bank) => bank.id !== this.territorialBankId)
        .map((bank) => {
          return {
            value: bank.id,
            label: `${bank.shortName} - ${bank.fullName}`,
          };
        }) || []
    );
  }

  territorialBankAdd = () => {
    const data = [...(this.territorialBanks || [])];
    data.push(TERRITORIAL_BANK_NEW);
    this.setTerritorialBanks(data);
  };
  territorialBankCancel = (id: string) => {
    const data = this.territorialBankFind(id);
    if (data && data.isNew) {
      const banks = this.territorialBanks?.filter((f) => f.id !== id);
      this.setTerritorialBanks(banks);
    }
  };
  territorialBankSave = async (id: string) => {
    const data = this.territorialBankFind(id);
    if (data) {
      const {isNew, isValid, isDirty, isLoading, ...dataToSave} = data;
      this.territorialBankSetLoading(id, true);
      try {
        if (data.isNew) {
          await this.serviceDictionary.createTerritorialBank(dataToSave);
        } else {
          await this.serviceDictionary.updateTerritorialBank(dataToSave);
        }
        await this.territorialBanksReload();
      } finally {
        this.territorialBankSetLoading(id, false);
      }
    }
  };
  territorialBankDelete = async (id: string) => {
    const bank = this.territorialBankFind(id);
    if (bank) {
      this.territorialBankSetLoading(id, true);
      try {
        await this.serviceDictionary.deleteTerritorialBank(id);
        await this.territorialBanksReload();
      } finally {
        this.territorialBankSetLoading(id, false);
      }
    }
  };
  territorialBankSetIsDirty = (id: string, value: boolean) => {
    const data = this.territorialBankFind(id);
    if (data) data.isDirty = value;
  };
  territorialBankSetIsValid = (id: string, value: boolean) => {
    const data = this.territorialBankFind(id);
    if (data) data.isValid = value;
  };
  territorialBankSetField = (id: string, name: string, value: string) => {
    const data = this.territorialBankFind(id);
    if (data) {
      data[name as keyof IDictionaryTerritorialBankDTO] = value;
    }
  };

  territorialBankFind = (id: string) => {
    return this.territorialBanks?.find((bank) => bank.id === id);
  };
  territorialBankMapToViewModel = (bank: IDictionaryTerritorialBankDTO) => {
    return {
      ...bank,
      isNew: false,
      isDirty: false,
      isValid: true,
      isLoading: false,
    };
  };
  territorialBankSetLoading = (id: string, value: boolean) => {
    const data = this.territorialBankFind(id);
    if (data) {
      data.isLoading = value;
    }
  };
  territorialBanksReload = async () => {
    const data = await this.serviceDictionary.getTerritorialBanks();
    this.setTerritorialBanks(data.map(this.territorialBankMapToViewModel));
  };

  updateUsers = async (data?: IUserDTO[]) => {
    this.setLoadingUsers(true);
    try {
      const promise = data?.map((user) => this.serviceUser.saveUser(user));
      if (promise) await Promise.all(promise);
    } finally {
      this.setLoadingUsers(false);
    }
  };
  updateUserBank = (userId: string, bankId: string) => {
    const user = this.users?.find((user) => user.id === userId);
    if (user) user.tbId = bankId;
  };
  removeUser = async (userId: string) => {
    this.setLoadingUsers(true);
    try {
      await this.serviceUser.deleteUser(userId);
      if (this.territorialBankId) {
        const data = await this.serviceUser.getUsersTB(this.territorialBankId);
        this.setUsers(data);
      }
    } finally {
      this.setLoadingUsers(false);
    }
  };
}
