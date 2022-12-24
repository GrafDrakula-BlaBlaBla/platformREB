import {ICreditDTO} from '../Credits';

/**
 * Модель данных для Реестра.
 *
 * @prop objectId Идентификатор реестра.
 * @prop createDate Дата создания реестра.
 * @prop status Статус реестра.
 * @prop loanCount Количество кредитов.
 * @prop loanAmount Объем фондирования (сумма размеров кредитов).
 * @prop loanIssuedAmount Запрашиваемая выборка (сумма выданых кредитов).
 * @prop credits Кредиты
 */
export interface IRegistriesDTO {
  objectId: string;
  createDate: string;
  status: string;
  loanCount: number;
  loanAmount: number;
  loanIssuedAmount: number;
  credits?: ICreditDTO[];
}
