import {
  ICFACreditContractDTO,
  ICFAGeneralAgreementDTO,
  TCFACreditLineType,
} from '../../../../Model/CFA_Deal';
import {
  ICFAGeneralAgreementComViewModel,
  ICFAGeneralAgreementRebViewModel,
} from '../generalAgreement';
import {
  ICFACreditContractComViewModel,
  ICFACreditContractRebViewModel,
} from '../creditContract';

export interface ICFAAccreditiveViewModel {
  gaData: ICFAGeneralAgreementDTO;
  gaUnusedLimit: number;
  gaBalance: number;
  gaSumPercent: number;
  gaLoanPeriod: string;

  ccData: ICFACreditContractDTO;
  ccUnusedLimit: number;
  ccBalance: number;
  ccSumPercent: number;
  ccLoanPeriod: string;
}

export interface ICFAAccreditiveComViewModel extends ICFAAccreditiveViewModel {
  gaViewModel: ICFAGeneralAgreementComViewModel;
  ccViewModel: ICFACreditContractComViewModel;

  isValidForm?: boolean;

  setFormData(data?: ICFAGeneralAgreementDTO): void;

  setIsValid(value: boolean): void;
  setIsValidIssued(value: boolean): void;
  setIsValidPaidFor(value: boolean): void;

  setCreditLineType(value: TCFACreditLineType): void;

  issuedAdd(): void;
  issuedRemove(tempId: string): void;
  issuedSetField(
    tempId: string,
    name: string,
    value: number | string | null
  ): void;

  paidForAdd(): void;
  paidForRemove(tempId: string): void;
  paidForSetField(
    tempId: string,
    name: string,
    value: number | string | null
  ): void;
}

export interface ICFAAccreditiveRebViewModel extends ICFAAccreditiveViewModel {
  gaViewModel: ICFAGeneralAgreementRebViewModel;
  ccViewModel: ICFACreditContractRebViewModel;

  isValidForm?: boolean;

  setFormData(data?: ICFACreditContractDTO): void;

  setIsValid(value: boolean): void;
  setIsValidIssued(value: boolean): void;
  setIsValidPaidFor(value: boolean): void;

  setCreditLineType(value: TCFACreditLineType): void;

  issuedAdd(): void;
  issuedRemove(tempId: string): void;
  issuedSetField(
    tempId: string,
    name: string,
    value: number | string | null
  ): void;

  paidForAdd(): void;
  paidForRemove(tempId: string): void;
  paidForSetField(
    tempId: string,
    name: string,
    value: number | string | null
  ): void;
}
