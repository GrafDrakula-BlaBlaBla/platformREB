import {ICFAAccreditiveRebViewModel} from '../interfaces';
import {ICFACreditContractRebViewModel} from '../../creditContract';
import {ICFAGeneralAgreementRebViewModel} from '../../generalAgreement';
import {CFAAccreditiveViewModel} from '../base';
import {action, computed, makeObservable} from 'mobx';
import {
  CFAAccreditiveCCValueEmpty,
  CFAAccreditiveValueEmpty,
  ICFAAccreditiveValueDTO,
  ICFACreditContractDTO,
  TCFACreditLineType,
} from '../../../../../Model/CFA_Deal';
import {uuidv4} from '../../../../../Utils/Uid';
import {inject, injectable} from 'inversify';
import {VIEW_MODEL} from '../../../../identifiers';

@injectable()
export class CFAAccreditiveRebViewModel
  extends CFAAccreditiveViewModel
  implements ICFAAccreditiveRebViewModel {
  @inject(VIEW_MODEL.CFAGeneralAgreement)
  public gaViewModel!: ICFAGeneralAgreementRebViewModel;
  @inject(VIEW_MODEL.CFACreditContract)
  public ccViewModel!: ICFACreditContractRebViewModel;

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
      this.ccViewModel.data?.isValid &&
      this.ccViewModel.data?.isValidIssued &&
      this.ccViewModel.data?.isValidPaidFor
    );
  }
  setFormData = (data?: ICFACreditContractDTO) => {
    const _data = {...data} as ICFACreditContractDTO;
    if (this.ccViewModel.data) {
      _data.issued = this.ccViewModel.data?.issued;
      _data.paidFor = this.ccViewModel.data?.paidFor;
      _data.unusedLimit = this.ccUnusedLimit;
      _data.balance = this.ccBalance;
      _data.sumPercent = this.ccSumPercent;
      _data.loanPeriod = this.ccLoanPeriod;
    }
    this.ccViewModel.setData(_data);
  };

  setIsValid = (value: boolean) => {
    const _data = {...this.ccViewModel.data} as ICFACreditContractDTO;
    _data.isValid = value;
    this.ccViewModel.setData(_data);
  };
  setIsValidIssued = (value: boolean) => {
    const _data = {...this.ccViewModel.data} as ICFACreditContractDTO;
    _data.isValidIssued = value;
    this.ccViewModel.setData(_data);
  };
  setIsValidPaidFor = (value: boolean) => {
    const _data = {...this.ccViewModel.data} as ICFACreditContractDTO;
    _data.isValidPaidFor = value;
    this.ccViewModel.setData(_data);
  };

  setCreditLineType = (value: TCFACreditLineType) => {
    if (!this.ccViewModel.data?.creditLineType?.fixed) {
      const _data = {...this.ccViewModel.data} as ICFACreditContractDTO;
      _data.creditLineType = {revolving: Boolean(value === 'VKL')};
      this.ccViewModel.setData(_data);
    }
  };

  issuedGet = (tempId: string) => {
    return this.ccViewModel.data?.issued.find((d) => d.tempId === tempId);
  };
  issuedSet = (data?: ICFAAccreditiveValueDTO[]) => {
    const _data = {...this.ccViewModel.data} as ICFACreditContractDTO;
    _data.issued = data || [];
    this.ccViewModel.setData(_data);
  };
  issuedAdd = () => {
    const issued = this.ccViewModel.data?.issued
      ? [...this.ccViewModel.data?.issued]
      : [];
    issued.push({...CFAAccreditiveCCValueEmpty, tempId: uuidv4()});
    this.issuedSet(issued);
  };
  issuedRemove = (tempId: string) => {
    const value = this.issuedGet(tempId);
    if (value) {
      const issued = this.ccViewModel.data?.issued?.filter(
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
    return this.ccViewModel.data?.paidFor.find((d) => d.tempId === tempId);
  };
  paidForSet = (data?: ICFAAccreditiveValueDTO[]) => {
    const _data = {...this.ccViewModel.data} as ICFACreditContractDTO;
    _data.paidFor = data || [];
    this.ccViewModel.setData(_data);
  };
  paidForAdd = () => {
    const paidFor = this.ccViewModel.data?.paidFor
      ? [...this.ccViewModel.data?.paidFor]
      : [];
    paidFor.push({...CFAAccreditiveValueEmpty, tempId: uuidv4()});
    this.paidForSet(paidFor);
  };
  paidForRemove = (tempId: string) => {
    const value = this.paidForGet(tempId);
    if (value) {
      const paidFor = this.ccViewModel.data?.paidFor?.filter(
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
