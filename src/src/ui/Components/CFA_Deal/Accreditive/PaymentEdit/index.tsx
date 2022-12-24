import React from 'react';
import {ICFAAccreditiveValueDTO} from '../../../../../Model/CFA_Deal';
import {ClassNameInjection} from '../../../../../Utils/ClassNames/ClassNameInjection';
import {PaymentEditValue} from '../PaymentEditValue';
import {observer} from 'mobx-react-lite';
import './index.less';

export interface IPaymentEditProps {
  className?: string;
  titleNew: string;
  titleDate: string;
  titleValue: string;
  titleTranche?: string;
  titleMaurityDate?: string;
  data?: ICFAAccreditiveValueDTO[];
  isDisabled?: boolean;
  isExtended?: boolean;
  onPaymentAdd?: () => void;
  onPaymentRemove?: (tempId: string) => void;
  onPaymentChange?: (
    tempId: string,
    name: string,
    value: number | string | null
  ) => void;
}

export const PaymentEdit = observer((props: IPaymentEditProps) => {
  const {
    className,
    titleNew,
    titleDate,
    titleValue,
    titleTranche,
    titleMaurityDate,
    data,
    isDisabled,
    isExtended,
    onPaymentAdd,
    onPaymentRemove,
    onPaymentChange,
  } = props;

  const cls = ClassNameInjection(
    'payment-edit',
    className ? className : undefined,
    !data || data?.length === 0 ? 'payment-edit_empty' : undefined
  );

  const onAdd = () => {
    if (onPaymentAdd) onPaymentAdd();
  };
  const onRemove = (tempId: string) => {
    if (onPaymentRemove && tempId) onPaymentRemove(tempId);
  };
  const onChange = (
    tempId: string,
    name: string,
    value: number | string | null
  ) => {
    if (onPaymentChange && tempId) onPaymentChange(tempId, name, value);
  };

  return (
    <div className={cls}>
      {data?.map((item, index) => (
        <PaymentEditValue
          key={index}
          value={item}
          titleNew={titleNew}
          titleValue={titleValue}
          titleDate={titleDate}
          titleTranche={titleTranche}
          titleMaurityDate={titleMaurityDate}
          isDisabled={isDisabled}
          isExtended={isExtended}
          onRemove={() => onRemove(item.tempId as string)}
          onChange={(name: string, value: number | string | null) =>
            onChange(item.tempId as string, name, value)
          }
        />
      ))}
      {!isDisabled && (
        <div className="payment-edit__add link" onClick={onAdd}>
          + Добавить
        </div>
      )}
    </div>
  );
});
