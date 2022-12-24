import React from 'react';
import {ICreditDTO} from '../../../Model/Credits';
import {MoneyWrapper} from '../../Common/SimpleComponents/MoneyWrapper';
import {ExportContracts} from '../ExportContract';

interface IProps {
  creditItem: ICreditDTO;
}

export const CreditDetails = ({creditItem}: IProps) => {
  return (
    <>
      <div className="CreditInfo">
        <div className="CreditInfo-Left">
          <div className="CreditInfo-Item Item">
            <div className="Item-Label">ОГРН заемщика</div>
            <div className="Item-Value">{creditItem.ogrn}</div>
          </div>
          <div className="CreditInfo-Item Item">
            <div className="Item-Label">Категория заемщика</div>
            <div className="Item-Value">{creditItem.individualCategory}</div>
          </div>
          <div className="CreditInfo-Item Item">
            <div className="Item-Label">Субъект РФ</div>
            <div className="Item-Value">{creditItem.individualAdress}</div>
          </div>
          <div className="CreditInfo-Item Item">
            <div className="Item-Label">Отрасль экономики</div>
            <div className="Item-Value">{creditItem.industry}</div>
          </div>
          <div className="CreditInfo-Item Item">
            <div className="Item-Label">
              Соответствие ПП-556 <br />и приказу 3092
            </div>
            <div className="Item-Value">Соответвует</div>
          </div>
        </div>
        <div className="CreditInfo-Rigth">
          <div className="CreditInfo-Item Item">
            <div className="Item-Label">Номер кредитного договора</div>
            <div className="Item-Value">{creditItem.loanContractNumber}</div>
          </div>
          <div className="CreditInfo-Item Item">
            <div className="Item-Label">
              Дата заключения кредитного договора
            </div>
            <div className="Item-Value">{creditItem.loanDate}</div>
          </div>

          <div className="CreditInfo-Item Item">
            <div className="Item-Label">Срок кредитного договора</div>
            <div className="Item-Value">
              {creditItem.loanDate && creditItem.loanEndDate
                ? `${creditItem.loanDate} - ${creditItem.loanEndDate}`
                : ''}
            </div>
          </div>
          <div className="CreditInfo-Item Item">
            <div className="Item-Label">Сумма экспортных контрактов</div>
            <div className="Item-Value">
              <MoneyWrapper value={creditItem.contractsSumm} />
            </div>
          </div>
          <div className="CreditInfo-Item Item">
            <div className="Item-Label">Сумма ТН ВЭДов (кол-во поставок)</div>
            <div className="Item-Value">
              <MoneyWrapper value={creditItem.tnsSumm} />
            </div>
          </div>
        </div>
      </div>
      <ExportContracts data={creditItem.contracts} />
    </>
  );
};
