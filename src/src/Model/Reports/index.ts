import {IRegistriesDTO} from '../Registries';

/**
 * Модель данных для Отчетов наследует часть полей от Реестров.
 *
 * @prop period - Период
 * @prop loanRestAmount - Сумма остатков по кредитам
 */
export interface IReportDTO extends IRegistriesDTO {
  period: string;
  loanRestAmount: string;
}
