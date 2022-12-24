/**
 * @creditId Номер кредита
 * @fullName Наименование заёмщика
 * @inn Инн
 * @ogrn ОГРН
 * @individualAdress Адрес заемщика
 * @individualCategory Категория заемщика ( ММБ/МСП/Крупный/Крупнейший )
 * @industry Отрасль экономики заемщика
 * @businessSegmentsHistory История отнесения к сегментам бизнеса
 * @loanAmount Размер кредита по кредитному договору
 * @loanContractNumber Номер кредитного договора (соглашения)
 * @loanDate Дата заключения кредитного договора
 * @loanIssuedAmount Сумма выданного кредита заемщику по кредитному договору
 * @loanRestAmount Сумма остатка
 * @loanUnusedLimit Неиспользуемый лимит
 * @loanEndDate Дата закрытия кредитного договора
 * @loanTerm Срок кредитного договора
 * @notes Примичания
 * @objectId Id в базе
 * @requestId Ид заявления
 */
export interface ICreditDTO {
  objectId: string;
  contracts: IExportContractDTO[];
  creditId: number;
  fullName: string;
  inn: string;
  ogrn: string;
  individualAdress: string;
  individualCategory: string;
  industry: string;
  businessSegmentsHistory: string;
  loanAmount: number;
  loanContractNumber: number;
  loanDate: string;
  loanIssuedAmount: number;
  loanRestAmount: number;
  loanUnusedLimit: number;
  loanEndDate: string;
  loanTerm: number;
  notes: string;
  requestId: number;
  creditStatus: string;
  contractsSumm: number;
  tnsSumm: number;
}

/**
 * Экспотный контракт.
 *
 * @param buyerCompanyName Имя компании покупателя
 * @param confirmedDocuments Документы подтверждающие отгрузку
 * @param contractSumm Сумма контракта
 * @param dateOfExportContract Дата контракта
 * @param revenuePlannedDate Планируемая дата выручки
 * @param tnSumm Сумма ТН ВЭДов
 */
export interface IExportContractDTO {
  buyerCompanyName: string;
  tnCodes: number[];
  contractSumm: string;
  dateOfExportContract: string;
  deliveryCountry: string;
  numberOfExportContract: number;
  revenuePlannedDate: string;
  tnSumm: number;
  confirmedDocuments: Array<IConfirmedDocument>;
}

/**
 * Подтверждающий документ
 *
 * @param amount Сумма
 * @param confirmedId Ид
 * @param date Дата
 * @param isTransport Транспортный или нет
 * @param name Имя
 * @param thCodes Коды ТН ВЭДов
 */
export interface IConfirmedDocument {
  amount: number;
  confirmedId: number;
  date: Date | string;
  isTransport: boolean;
  name: string;
  objectId: string;
}
