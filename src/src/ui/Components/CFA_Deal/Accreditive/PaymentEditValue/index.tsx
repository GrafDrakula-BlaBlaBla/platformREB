import React, {ChangeEvent, useState} from 'react';
import {
  ICFAAccreditiveValueDTO,
  ICFARequestDTO,
} from '../../../../../Model/CFA_Deal';
import {ClassNameInjection} from '../../../../../Utils/ClassNames/ClassNameInjection';
import {
  DateFieldControlView,
  CurrencyFieldControlView,
  DateFieldControl,
  CurrencyFieldControl,
  TextFieldControl,
} from '../../../../Common/FieldControls';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import {FormField} from '../../../../Common/FormComponents';
import moment from 'moment';
import {observer} from 'mobx-react-lite';
import {ConfirmDialog} from '../../../Dialogs/ConfirmDialog';
import './index.less';

export interface IPaymentEditValueProps {
  titleNew: string;
  titleDate: string;
  titleValue: string;
  titleTranche?: string;
  titleMaurityDate?: string;
  value?: ICFAAccreditiveValueDTO;
  className?: string;
  isDisabled?: boolean;
  isCollapsed?: boolean;
  isExtended?: boolean;
  onRemove?: () => void;
  onChange?: (name: string, value: number | string | null) => void;
}

export const PaymentEditValue = observer((props: IPaymentEditValueProps) => {
  const {
    value,
    titleValue,
    titleDate,
    titleNew,
    titleMaurityDate,
    titleTranche,
    className,
    isCollapsed = true,
    isDisabled,
    isExtended,
    onRemove,
    onChange,
  } = props;

  const [collapsed, setCollapsed] = useState<boolean>(isCollapsed);

  const clsPaymentEditValue = ClassNameInjection(
    'payment-edit-value',
    className ? className : undefined,
    collapsed ? 'payment-edit-value_collapsed' : undefined,
    isExtended ? 'payment-edit-value_extended' : undefined
  );

  const onChangeTextField = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name as keyof ICFARequestDTO;
    const value = Number(e.target.value);
    if (onChange) onChange(name, value);
  };
  const onChangeDateField = (value: Date | null, name?: string | null) => {
    if (onChange)
      onChange(
        name as string,
        value ? moment(value).format('DD.MM.YYYY') : null
      );
  };

  const [modalDelete, setModalDelete] = useState<boolean>(false);
  const onDeleteOpen = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    setModalDelete(true);
  };
  const onDeleteClose = () => setModalDelete(false);
  const onDelete = () => {
    if (onRemove) onRemove();
  };

  return (
    <div className={clsPaymentEditValue}>
      <div
        className="payment-edit-value__header"
        onClick={() => setCollapsed(!collapsed)}
      >
        <div className="payment-edit-value__header-button payment-edit-value__header-button_collapse">
          {collapsed ? <AddCircleIcon /> : <RemoveCircleIcon />}
        </div>
        {value &&
        value.amount &&
        moment(value.changedDate, 'DD.MM.YYYY').isValid() ? (
          <div className="payment-edit-value__header-name">
            <div className="payment-edit-value__header-amount">
              <CurrencyFieldControlView value={value.amount || 0} />
            </div>
            <div className="payment-edit-value__header-date">от</div>
            <div className="payment-edit-value__header-date">
              <DateFieldControlView value={value.changedDate} />
            </div>
          </div>
        ) : (
          <div className="payment-edit-value__header-name">{titleNew}</div>
        )}
        {!isDisabled && (
          <div
            className="payment-edit-value__header-button payment-edit-value__header-button_delete"
            onClick={onDeleteOpen}
          >
            <DeleteIcon />
          </div>
        )}
      </div>
      <div className="payment-edit-value__content">
        {isExtended && (
          <FormField
            title={titleTranche}
            disabled={isDisabled}
            className="full"
          >
            <TextFieldControl
              name="tranchNumber"
              value={value?.tranchNumber}
              disabled={isDisabled}
              onChange={onChangeTextField}
            />
          </FormField>
        )}
        <FormField title={titleValue} disabled={isDisabled} className="full">
          <CurrencyFieldControl
            name="amount"
            value={value?.amount}
            disabled={isDisabled}
            onChange={onChangeTextField}
          />
        </FormField>
        {isExtended && (
          <FormField
            title={titleMaurityDate}
            disabled={isDisabled}
            className="half"
          >
            <DateFieldControl
              name="maurityDate"
              value={value?.maurityDate}
              disabled={isDisabled}
              onChange={onChangeDateField}
            />
          </FormField>
        )}
        <FormField title={titleDate} disabled={isDisabled} className="half">
          <DateFieldControl
            name="changedDate"
            value={value?.changedDate}
            disabled={isDisabled}
            onChange={onChangeDateField}
          />
        </FormField>
      </div>
      <ConfirmDialog
        isOpen={modalDelete}
        onClose={onDeleteClose}
        title="Уверены что хотите удалить выдачу?"
        buttons={[
          {
            children: 'Удалить',
            variant: 'outlined',
            color: 'red',
            onClick: onDelete,
          },
          {
            children: 'Не удалять',
            variant: 'outlined',
            color: 'default',
          },
        ]}
      />
    </div>
  );
});
