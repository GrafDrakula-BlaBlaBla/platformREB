import React, {useEffect, useState} from 'react';
import {observer} from 'mobx-react-lite';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import {ICFAAccreditiveValueDTO} from '../../../../../Model/CFA_Deal';
import {CurrencyFieldControlView} from '../../../../Common/FieldControls';
import {ClassNameInjection} from '../../../../../Utils/ClassNames/ClassNameInjection';
import {PaymentEdit} from '../PaymentEdit';
import {PaymentView} from '../PaymentView';
import './index.less';

/**
 * @title общий заголовок поля
 * @titleNew заголовок нового элемента поля
 * @titleDate заголовок поля вводы даты
 * @titleValue заголовок поля вводы суммы
 * @titleTranche заголовок поля "Номер транша" для Кредитного договора
 * @titleMaurityDate заголовок поля "Дата погашения"  для Кредитного договора
 */
export interface IPaymentProps {
  title: string;
  titleNew: string;
  titleDate: string;
  titleValue: string;
  titleTranche?: string;
  titleMaurityDate?: string;
  data?: ICFAAccreditiveValueDTO[];
  isDisabled?: boolean;
  isEdit?: boolean;
  isCollapsed?: boolean;
  isExtended?: boolean;
  rules?: Record<string, () => string | boolean>;
  onPaymentAdd?: () => void;
  onPaymentRemove?: (tempId: string) => void;
  onPaymentChange?: (
    tempId: string,
    name: string,
    value: number | string | null
  ) => void;
  onValidate?: (error: string) => void;
}

export const Payment = observer((props: IPaymentProps) => {
  const {
    title,
    titleNew,
    titleDate,
    titleValue,
    titleTranche,
    titleMaurityDate,
    data,
    isDisabled,
    isEdit,
    isCollapsed = true,
    isExtended,
    rules,
    onPaymentAdd,
    onPaymentRemove,
    onPaymentChange,
    onValidate,
  } = props;
  const amountTotal = data?.reduce((prev, curr) => {
    return prev + (curr.amount || 0);
  }, 0);

  const [collapsed, setCollapsed] = useState<boolean>(isCollapsed);

  const helperText = rules
    ? Object.values(rules).reduce((prev, rule) => {
        let result = prev;
        if (typeof rule() === 'string') {
          if (!result) result = rule() as string;
        }
        return result;
      }, '')
    : '';

  useEffect(() => {
    if (onValidate) {
      onValidate(helperText);
    }
    // eslint-disable-next-line
  }, [helperText]);

  const clsPayment = ClassNameInjection(
    'payment',
    collapsed ? 'payment_collapsed' : undefined,
    isEdit && !isDisabled && helperText ? 'payment_error' : undefined
  );

  return (
    <div className={clsPayment}>
      <div className="payment__block">
        <div
          className="payment__header"
          onClick={() => setCollapsed(!collapsed)}
        >
          <div className="payment__header-name">
            <div className="payment__header-title">{`${title}:`}</div>
            <div className="payment__header-amount">
              <CurrencyFieldControlView value={amountTotal} />
            </div>
          </div>
          <div className="payment__header-arrow">
            {collapsed ? <ExpandMoreIcon /> : <ExpandLessIcon />}
          </div>
        </div>
        {isEdit ? (
          <PaymentEdit
            className="payment__content"
            titleNew={titleNew}
            titleValue={titleValue}
            titleDate={titleDate}
            titleTranche={titleTranche}
            titleMaurityDate={titleMaurityDate}
            data={data}
            isDisabled={isDisabled}
            isExtended={isExtended}
            onPaymentAdd={onPaymentAdd}
            onPaymentRemove={onPaymentRemove}
            onPaymentChange={onPaymentChange}
          />
        ) : (
          <PaymentView
            className="payment__content"
            titleValue={titleValue}
            titleDate={titleDate}
            titleTranche={titleTranche}
            titleMaurityDate={titleMaurityDate}
            data={data}
            isExtended={isExtended}
          />
        )}
      </div>
      {isEdit && !isDisabled && helperText && (
        <div className="payment__helper-text">{helperText}</div>
      )}
    </div>
  );
});
