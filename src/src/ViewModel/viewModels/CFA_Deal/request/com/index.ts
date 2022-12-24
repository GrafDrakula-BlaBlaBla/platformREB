import {ICFARequestComViewModel} from '../interfaces';
import {ICFA_DealComService} from '../../../../../BusinessLayer/services/CFA_Deal';
import {action, makeObservable, observable} from 'mobx';
import {inject, injectable} from 'inversify';
import {SERVICE} from '../../../../../BusinessLayer/identifiers';
import {CFARequestViewModel} from '../base';
import {ICFABankUserDTO} from '../../../../../Model/CFA_Deal';

@injectable()
export class CFARequestComViewModel
  extends CFARequestViewModel
  implements ICFARequestComViewModel {
  @inject(SERVICE.CreditForAccreditive) protected service!: ICFA_DealComService;

  constructor() {
    super();
    makeObservable(this, {
      loadingParameters: observable,
      isEditParameters: observable,
      setIsEditParameters: action,
      setLoadingParameters: action,
      saveRequestParameters: action,
      reloadRequest: action,

      loadingConfirm: observable,
      setLoadingConfirm: action,

      controllers: observable,
      getControllers: action,
      setControllers: action,
      attachControllers: action,

      approveDeal: action,
      returnDeal: action,
    });
  }

  canEditParameters = true;

  isEditParameters = false;
  loadingParameters = false;

  setIsEditParameters = (value: boolean) => {
    this.isEditParameters = value;
  };
  setLoadingParameters = (value: boolean) => {
    this.loadingParameters = value;
  };

  saveRequestParameters = async () => {
    if (this.data) {
      this.setLoadingParameters(true);
      try {
        await this.service.saveRequestParameters(this.data.id, this.data);
      } finally {
        await this.reloadRequest(this.data.id);
        this.setLoadingParameters(false);
      }
    }
  };
  reloadRequest = async (id: string) => {
    this.setLoadingParameters(true);
    try {
      const data = await this.service.getRequest(id);
      this.setData(data);
    } finally {
      this.setLoadingParameters(false);
    }
  };

  loadingConfirm?: boolean;
  setLoadingConfirm = (value: boolean) => {
    this.loadingConfirm = value;
  };

  controllers?: ICFABankUserDTO[];
  getControllers = async () => {
    this.setLoadingConfirm(true);
    try {
      const data = await this.service.getControllers();
      this.setControllers(data);
    } finally {
      this.setLoadingConfirm(false);
    }
  };
  setControllers = (data?: ICFABankUserDTO[]) => {
    this.controllers = data;
  };
  attachControllers = async (cfaId: string, userIds: string[]) => {
    this.setLoadingConfirm(true);
    try {
      await this.service.attachControllers(cfaId, userIds);
    } finally {
      this.setLoadingConfirm(false);
    }
  };

  approveDeal = async () => {
    this.setLoadingConfirm(true);
    try {
      await this.service.approveDeal();
    } finally {
      this.setLoadingConfirm(false);
    }
  };
  returnDeal = async (value?: string) => {
    this.setLoadingConfirm(true);
    try {
      await this.service.returnDeal(value);
    } finally {
      this.setLoadingConfirm(false);
    }
  };
}
