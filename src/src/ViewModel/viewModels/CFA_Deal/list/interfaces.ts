import {
  IActualBankCFADTO,
  ICFABankUserDTO,
  ICFAItemDTO,
} from '../../../../Model/CFA_Deal';
import {IListViewModel} from '../../List/interfaces';
import {ISelectItem} from '../../../../ui/Common/FieldControls';

export interface ICFAListViewModel extends IListViewModel<ICFAItemDTO> {
  availableUsers?: ICFABankUserDTO[];
  getAvailableUsers: () => Promise<ICFABankUserDTO[]>;
}

export interface ICFAListComViewModel extends ICFAListViewModel {}

export interface ICFAListRebViewModel extends ICFAListViewModel {
  actualBankList?: IActualBankCFADTO[];
  getActualBankList: () => Promise<IActualBankCFADTO[]>;
  getBanksForFilter: (emptyItem: ISelectItem) => ISelectItem[];
}
