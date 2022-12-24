import moment from 'moment';
import {Params} from 'router5/dist/types/base';
import {
  IConfirmedDocument,
  ICreditDTO,
  IExportContractDTO,
} from '../../../Model/Credits';
import {BaseListService} from '../BaseList';
import {IBaseListDTO} from '../../../Model/BaseList';
import {ICreditsAPIClient} from '../../../IntegrationLayer/APIClients/Credits/interfaces';
import {ICreditsService} from './interfaces';
import {inject, injectable} from 'inversify';
import {API_CLIENT} from '../../../IntegrationLayer/identifiers';

const DATEFORMAT = 'DD.MM.YYYY';
const EMPTY_FIELD = '';

@injectable()
export class CreditsService
  extends BaseListService<ICreditDTO, ICreditsAPIClient>
  implements ICreditsService {
  @inject(API_CLIENT.Credits) protected APIClient!: ICreditsAPIClient;

  initList = async (
    searchParams?: Params
  ): Promise<IBaseListDTO<ICreditDTO>> => {
    const response = await super.initList(searchParams);
    response.items = response.items?.map(mapCreditToView);
    return response;
  };

  deleteCredit = (id: string | number) => this.APIClient.deleteCredit(id);
}

export function mapCreditToView(credit: ICreditDTO): ICreditDTO {
  return {
    ...credit,
    loanDate: getDateString(credit.loanDate),
    loanEndDate: getDateString(credit.loanEndDate),
    contracts: credit.contracts?.map(mapContractsToView),
  };
}
function mapContractsToView(contract: IExportContractDTO): IExportContractDTO {
  return {
    ...contract,
    dateOfExportContract: getDateString(contract.dateOfExportContract),
    revenuePlannedDate: getDateString(contract.revenuePlannedDate),
    confirmedDocuments: contract.confirmedDocuments?.map(
      mapConfirmedDocumentsToView
    ),
  };
}
function mapConfirmedDocumentsToView(
  document: IConfirmedDocument
): IConfirmedDocument {
  return {
    ...document,
    date: getDateString(document.date),
  };
}

function getDateString(date: Date | string): string {
  return date ? moment(date).format(DATEFORMAT) : EMPTY_FIELD;
}
