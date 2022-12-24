import {IBaseCardViewModel} from '../../BaseCard/interfaces';
import {
  ICFABankUserDTO,
  ICFARequestDTOExtend,
} from '../../../../Model/CFA_Deal';
import {IRadioItem} from '../../../../ui/Common/FieldControls';

export interface ICFARequestViewModel
  extends IBaseCardViewModel<ICFARequestDTOExtend> {
  isManual: boolean;
  isClosed: boolean;
  isDone: boolean;
  getRequest(id: string): Promise<void>;

  loadingUsers?: boolean;
  availableUsers?: ICFABankUserDTO[];
  setLoadingUsers(value: boolean): void;
  getAvailableUsers(cfaId: string): Promise<void>;
  attachUsers(cfaId: string, ids: string[]): Promise<void>;
  getRequestUsers(id: string): Promise<void>;

  canEditParameters?: boolean;
  currencies: Record<string, {codeLat: string; name: string}>;
  currenciesItems: IRadioItem[];
  getCurrencyCodeLat(codeDig?: string): string;

  financingTypeItems: IRadioItem[];
}

export interface ICFARequestComViewModel extends ICFARequestViewModel {
  loadingParameters: boolean;
  isEditParameters: boolean;
  setLoadingParameters(value: boolean): void;
  setIsEditParameters(value: boolean): void;
  saveRequestParameters(): Promise<void>;
  reloadRequest(id: string): Promise<void>;

  loadingConfirm?: boolean;
  setLoadingConfirm(value: boolean): void;

  controllers?: ICFABankUserDTO[];
  getControllers(): Promise<void>;
  attachControllers(cfaId: string, userIds: string[]): Promise<void>;

  approveDeal: () => Promise<void>;
  returnDeal: (value?: string) => Promise<void>;
}

export interface ICFARequestRebViewModel extends ICFARequestViewModel {}
