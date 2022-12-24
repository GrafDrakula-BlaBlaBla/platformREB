import {ICFAAccreditiveComViewModel} from '../interfaces';
import {ICFACreditContractComViewModel} from '../../creditContract';
import {ICFAGeneralAgreementComViewModel} from '../../generalAgreement';
import {CFAAccreditiveViewModel} from '../base';
import {action, computed, makeObservable} from 'mobx';
import {
  CFAAccreditiveValueEmpty,
  ICFAAccreditiveValueDTO,
  ICFAGeneralAgreementDTO,
  TCFACreditLineType,
} from '../../../../../Model/CFA_Deal';
import {uuidv4} from '../../../../../Utils/Uid';
import {inject, injectable} from 'inversify';
import {VIEW_MODEL} from '../../../../identifiers';

@injectable()
export class CFAAccreditiveComViewModel
  extends CFAAccreditiveViewModel
  implements ICFAAccreditiveComViewModel {
  @inject(VIEW_MODEL.CFAGeneralAgreement)
  public gaViewModel!: ICFAGeneralAgreementComViewModel;
  @inject(VIEW_MODEL.CFACreditContract)
  public ccViewModel!: ICFACreditContractComViewModel;

  constructor() {
    super();
    makeObservable(this, {
      isValidForm: computed,
      setFormData: action,

      setIsValid: action,
      setIsValidIssued: action,
      setIsValidPaidFor: action,

      setCreditLineType: action,

      issuedGet: action,
      issuedSet: action,
      issuedAdd: action,
      issuedRemove: action,
      issuedSetField: action,

      paidForGet: action,
      paidForSet: action,
      paidForAdd: action,
      paidForRemove: action,
      paidForSetField: action,
    });
  }

  get isValidForm() {
    return (
      this.gaViewModel.data?.isValid &&
      this.gaViewModel.data?.isValidIssued &&
      this.gaViewModel.data?.isValidPaidFor
    );
  }
  setFormData = (data?: ICFAGeneralAgreementDTO) => {
    const _data = {...data} as ICFAGeneralAgreementDTO;
    if (this.gaViewModel.data) {
      _data.issued = this.gaViewModel.data?.issued;
      _data.paidFor = this.gaViewModel.data?.paidFor;
      _data.unusedLimit = this.gaUnusedLimit;
      _data.balance = this.gaBalance;
      _data.sumPercent = this.gaSumPercent;
      _data.loanPeriod = this.gaLoanPeriod;
    }
    this.gaViewModel.setData(_data);
  };

  setIsValid = (value: boolean) => {
    const _data = {...this.gaViewModel.data} as ICFAGeneralAgreementDTO;
    _data.isValid = value;
    this.gaViewModel.setData(_data);
  };
  setIsValidIssued = (value: boolean) => {
    const _data = {...this.gaViewModel.data} as ICFAGeneralAgreementDTO;
    _data.isValidIssued = value;
    this.gaViewModel.setData(_data);
  };
  setIsValidPaidFor = (value: boolean) => {
    const _data = {...this.gaViewModel.data} as ICFAGeneralAgreementDTO;
    _data.isValidPaidFor = value;
    this.gaViewModel.setData(_data);
  };

  setCreditLineType = (value: TCFACreditLineType) => {
    if (!this.gaViewModel.data?.creditLineType?.fixed) {
      const _data = {...this.gaViewModel.data} as ICFAGeneralAgreementDTO;
      _data.creditLineType = {revolving: Boolean(value === 'VKL')};
      this.gaViewModel.setData(_data);
    }
  };

  issuedGet = (tempId: string) => {
    return this.gaViewModel.data?.issued.find((d) => d.tempId === tempId);
  };
  issuedSet = (data?: ICFAAccreditiveValueDTO[]) => {
    const _data = {...this.gaViewModel.data} as ICFAGeneralAgreementDTO;
    _data.issued = data || [];
    this.gaViewModel.setData(_data);
  };
  issuedAdd = () => {
    const issued = this.gaViewModel.data?.issued
      ? [...this.gaViewModel.data?.issued]
      : [];
    issued.push({...CFAAccreditiveValueEmpty, tempId: uuidv4()});
    this.issuedSet(issued);
  };
  issuedRemove = (tempId: string) => {
    const value = this.issuedGet(tempId);
    if (value) {
      const issued = this.gaViewModel.data?.issued?.filter(
        (c) => c.tempId !== tempId
      );
      this.issuedSet(issued);
    }
  };
  issuedSetField = (
    tempId: string,
    name: string,
    value: number | string | null
  ) => {
    const issued = this.issuedGet(tempId);
    if (issued) issued[name as keyof ICFAAccreditiveValueDTO] = value as never;
  };

  paidForGet = (tempId: string) => {
    return this.gaViewModel.data?.paidFor.find((d) => d.tempId === tempId);
  };
  paidForSet = (data?: ICFAAccreditiveValueDTO[]) => {
    const _data = {...this.gaViewModel.data} as ICFAGeneralAgreementDTO;
    _data.paidFor = data || [];
    this.gaViewModel.setData(_data);
  };
  paidForAdd = () => {
    const paidFor = this.gaViewModel.data?.paidFor
      ? [...this.gaViewModel.data?.paidFor]
      : [];
    paidFor.push({...CFAAccreditiveValueEmpty, tempId: uuidv4()});
    this.paidForSet(paidFor);
  };
  paidForRemove = (tempId: string) => {
    const value = this.paidForGet(tempId);
    if (value) {
      const paidFor = this.gaViewModel.data?.paidFor?.filter(
        (c) => c.tempId !== tempId
      );
      this.paidForSet(paidFor);
    }
  };
  paidForSetField = (
    tempId: string,
    name: string,
    value: number | string | null
  ) => {
    const paidFor = this.paidForGet(tempId);
    if (paidFor)
      paidFor[name as keyof ICFAAccreditiveValueDTO] = value as never;
  };
}
