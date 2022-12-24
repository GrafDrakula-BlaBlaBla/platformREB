import {computed, makeObservable} from 'mobx';
import {ICFAAccreditiveViewModel} from '../interfaces';
import {ICFACreditContractViewModel} from '../../creditContract';
import {ICFAGeneralAgreementViewModel} from '../../generalAgreement';
import {
  ICFAAccreditiveValueDTO,
  ICFACreditContractDTO,
  ICFAGeneralAgreementDTO,
} from '../../../../../Model/CFA_Deal';
import moment from 'moment';
import {diffDays} from '../../../../../Utils/Date/diffDays';
import {daysOfCurrentYear} from '../../../../../Utils/Date/daysOfCurrentYear';
import {injectable} from 'inversify';

@injectable()
export class CFAAccreditiveViewModel implements ICFAAccreditiveViewModel {
  gaViewModel!: ICFAGeneralAgreementViewModel;
  ccViewModel!: ICFACreditContractViewModel;

  constructor() {
    makeObservable(this, {
      gaData: computed,
      gaUnusedLimit: computed,
      gaBalance: computed,
      gaSumPercent: computed,
      gaLoanPeriod: computed,

      ccData: computed,
      ccUnusedLimit: computed,
      ccBalance: computed,
      ccSumPercent: computed,
      ccLoanPeriod: computed,
    });
  }

  get gaData() {
    const {isValid, isValidIssued, isValidPaidFor, ...ga} = {
      ...this.gaViewModel.data,
    } as ICFAGeneralAgreementDTO;
    if (ga.creditLineType?.revolving === true) {
      ga.creditLineTypeValue = 'VKL';
    } else if (ga.creditLineType?.revolving === false) {
      ga.creditLineTypeValue = 'NKL';
    }
    return ga;
  }
  get gaUnusedLimit() {
    let unusedLimit = 0;
    if (this.gaViewModel.data) {
      if (this.gaViewModel.data.creditLineType?.revolving === true) {
        unusedLimit = this.gaViewModel.data.limit - this.gaBalance;
      } else if (this.gaViewModel.data.creditLineType?.revolving === false) {
        unusedLimit =
          this.gaViewModel.data.limit -
          sum(this.gaViewModel.data.issued, 'amount');
      }
    }
    return unusedLimit;
  }
  get gaBalance() {
    let balance = 0;
    if (this.gaViewModel.data) {
      balance =
        sum(this.gaViewModel.data.issued, 'amount') -
        sum(this.gaViewModel.data.paidFor, 'amount');
    }
    return balance;
  }
  get gaSumPercent() {
    return this.ccSumPercent;
  }
  get gaLoanPeriod() {
    let loanPeriod = '';
    if (this.gaViewModel.data) {
      loanPeriod = diffDays(
        moment(this.gaViewModel.data.conclusionDt, 'DD.MM.YYYY').toDate(),
        moment(this.gaViewModel.data.endDate, 'DD.MM.YYYY').toDate()
      );
    }
    return loanPeriod;
  }

  get ccData() {
    const {isValid, isValidIssued, isValidPaidFor, ...cc} = {
      ...this.ccViewModel.data,
    } as ICFACreditContractDTO;
    if (cc.creditLineType?.revolving === true) {
      cc.creditLineTypeValue = 'VKL';
    } else if (cc.creditLineType?.revolving === false) {
      cc.creditLineTypeValue = 'NKL';
    }
    return cc;
  }
  get ccUnusedLimit() {
    let unusedLimit = 0;
    if (this.ccViewModel.data) {
      if (this.ccViewModel.data.creditLineType?.revolving === true) {
        unusedLimit = this.ccViewModel.data.limit - this.ccBalance;
      } else if (this.ccViewModel.data.creditLineType?.revolving === false) {
        unusedLimit =
          this.ccViewModel.data.limit -
          sum(this.ccViewModel.data.issued, 'amount');
      }
    }
    return unusedLimit;
  }
  get ccBalance() {
    let balance = 0;
    if (this.ccViewModel.data) {
      balance =
        sum(this.ccViewModel.data.issued, 'amount') -
        sum(this.ccViewModel.data.paidFor, 'amount');
    }
    return balance;
  }
  get ccSumPercent() {
    let sumPercent = 0;
    if (this.ccViewModel.data) {
      sumPercent =
        (this.ccViewModel.data.limit * 90 * this.ccViewModel.data.loanMPT) /
        100 /
        daysOfCurrentYear();
    }
    return sumPercent;
  }
  get ccLoanPeriod() {
    let loanPeriod = '';
    if (this.ccViewModel.data) {
      loanPeriod = diffDays(
        moment(this.ccViewModel.data.conclusionDt, 'DD.MM.YYYY').toDate(),
        moment(this.ccViewModel.data.endDate, 'DD.MM.YYYY').toDate()
      );
    }
    return loanPeriod;
  }
}

const sum = (
  data: ICFAAccreditiveValueDTO[],
  fieldName: keyof ICFAAccreditiveValueDTO
) => {
  return (
    data?.reduce((prev, cur) => {
      return prev + (Number(cur[fieldName]) || 0);
    }, 0) || 0
  );
};
