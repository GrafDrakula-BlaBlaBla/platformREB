import React from 'react';
import {observer} from 'mobx-react-lite';
import {ClassNameInjection} from '../../../../../Utils/ClassNames/ClassNameInjection';
import {ICFAAccreditiveValueDTO} from '../../../../../Model/CFA_Deal';
import './index.less';
import {
  DateFieldControlView,
  CurrencyFieldControlView,
} from '../../../../Common/FieldControls';

export interface IPaymentViewProps {
  className?: string;
  titleDate: string;
  titleValue: string;
  titleTranche?: string;
  titleMaurityDate?: string;
  data?: ICFAAccreditiveValueDTO[];
  isExtended?: boolean;
}

export const PaymentView = observer((props: IPaymentViewProps) => {
  const {
    className,
    titleDate,
    titleValue,
    titleTranche,
    titleMaurityDate,
    data,
    isExtended,
  } = props;

  const cls = ClassNameInjection(
    'payment-view',
    className ? className : undefined
  );

  return (
    <div className={cls}>
      <table>
        <thead>
          {isExtended ? (
            <tr>
              <th align="left">{titleTranche}</th>
              <th align="left">{titleMaurityDate}</th>
              <th align="left">{titleDate}</th>
              <th align="right">{titleValue}</th>
            </tr>
          ) : (
            <tr>
              <th align="left">{titleDate}</th>
              <th align="right">{titleValue}</th>
            </tr>
          )}
        </thead>
        <tbody>
          {data?.map((item, index) =>
            isExtended ? (
              <tr key={index}>
                <td align="left">{item.tranchNumber}</td>
                <td align="left">
                  <DateFieldControlView value={item.maurityDate} />
                </td>
                <td align="left">
                  <DateFieldControlView value={item.changedDate} />
                </td>
                <td align="right">
                  <CurrencyFieldControlView value={item.amount} />
                </td>
              </tr>
            ) : (
              <tr key={index}>
                <td align="left">
                  <DateFieldControlView value={item.changedDate} />
                </td>
                <td align="right">
                  <CurrencyFieldControlView value={item.amount} />
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
});
