import {ICFADraftComViewModel} from './interfaces';
import {ICFA_DraftService} from '../../../../BusinessLayer/services/CFA_Draft/interfaces';
import {action, computed, makeObservable, observable} from 'mobx';
import {
  ECFADraftStatuses,
  ECFADraftTypes,
  ICFADraftDTO,
} from '../../../../Model/CFA_Draft';
import {BaseCardViewModel} from '../../BaseCard';
import {inject, injectable} from 'inversify';
import {SERVICE} from '../../../../BusinessLayer/identifiers';

@injectable()
export class CFADraftComViewModel
  extends BaseCardViewModel<ICFADraftDTO>
  implements ICFADraftComViewModel {
  @inject(SERVICE.CFA_Draft) protected service!: ICFA_DraftService;

  constructor() {
    super();
    makeObservable(this, {
      isDirty: observable,
      isValid: observable,
      setIsDirty: action,
      setIsValid: action,

      isBankManual: computed,
      isCreation: computed,
      isEdit: computed,

      isCreated: computed,
      isFinished: computed,
      isCanceled: computed,

      getDraft: action,
      createDraft: action,
      updateDraft: action,
      executeDraft: action,
      deleteDraft: action,
    });
  }

  isDirty: boolean = false;
  isValid: boolean = true;
  setIsDirty = (value: boolean) => {
    this.isDirty = value;
  };
  setIsValid = (value: boolean) => {
    this.isValid = value;
  };

  get isBankManual() {
    return this.service.isManual();
  }
  get isCreation() {
    return this.data?.draftType === ECFADraftTypes.CREATION;
  }
  get isEdit() {
    return this.data?.draftType === ECFADraftTypes.EDIT;
  }

  get isCreated() {
    return this.data?.draftStatus === ECFADraftStatuses.CREATED;
  }
  get isFinished() {
    return this.data?.draftStatus === ECFADraftStatuses.FINISHED;
  }
  get isCanceled() {
    return this.data?.draftStatus === ECFADraftStatuses.CANCELED;
  }

  getDraft = async (id: string) => {
    this.setLoading();
    try {
      const data = await this.service.getDraft(id);
      this.setData(data);
    } finally {
      this.unsetLoading();
    }
  };
  createDraft = async () => {
    this.setLoading();
    try {
      return await this.service.createDraft(this.data as ICFADraftDTO);
    } finally {
      this.setData();
      this.unsetLoading();
    }
  };
  createDraftFromDeal = async (dealId: string) => {
    this.setLoading();
    try {
      return await this.service.createDraftFromDeal(dealId);
    } finally {
      this.setData();
      this.unsetLoading();
    }
  };
  updateDraft = async () => {
    if (this.data) {
      this.setLoading();
      try {
        await this.service.updateDraft(this.data);
        this.setIsDirty(false);
      } finally {
        this.unsetLoading();
      }
    }
  };
  executeDraft = async () => {
    if (this.data) {
      this.setLoading();
      try {
        await this.service.executeDraft(this.data.id);
      } finally {
        this.unsetLoading();
      }
    }
  };
  deleteDraft = async (id: string) => {
    this.setLoading();
    try {
      await this.service.deleteDraft(id);
    } finally {
      this.unsetLoading();
    }
  };
}
