import React, {useState} from 'react';
import {MultiSelectExtFieldControl} from '../../../Common/FieldControls';
import {getFullFIO} from '../../../../Model/User/functions';
import {declOfNum} from '../../../../Utils/Number/declOfNum';
import useUpdateEffect from '../../../hooks/useUpdateEffect';
import {ICFABankUserDTO} from '../../../../Model/CFA_Deal';
import './index.less';

const user_forms = ['сотрудник', 'сотрудника', 'сотрудников'];
const deal_forms = ['сделка', 'сделки', 'сделок'];

export interface ICFAUsersSelectFieldControlProps {
  value?: unknown[];
  items?: ICFABankUserDTO[];
  onSave?: (value?: unknown[], name?: string) => void;
  onCancel?: (value?: unknown[], name?: string) => void;
  onChange?: (value?: unknown[], name?: string) => void;
  onClose?: (value?: unknown[], name?: string) => void;
  disabled?: boolean;
}
export const CFAUsersSelectFieldControl = (
  props: ICFAUsersSelectFieldControlProps
) => {
  const {value, items, onChange, onCancel, onSave, onClose, disabled} = props;

  const [state, setState] = useState<unknown[] | undefined>(value || []);
  useUpdateEffect(() => {
    setState(value);
  }, [value]);

  const [stateItems, setStateItems] = useState<ICFABankUserDTO[] | undefined>(
    items
  );
  useUpdateEffect(() => {
    setStateItems(items);
  }, [items]);

  const renderOption = (item: ICFABankUserDTO) => {
    return (
      <React.Fragment>
        <div className="cfa-users-select-field-control__fio">
          {getFullFIO(item.surname, item.name, item.patronymic)}
        </div>
        <div className="cfa-users-select-field-control__deals">
          {`${item.totalDeals} ${declOfNum(item.totalDeals, deal_forms)}`}
        </div>
      </React.Fragment>
    );
  };
  const renderValue = (items: ICFABankUserDTO[]) => {
    const ValueElementSingle = () => {
      return (
        <div className="cfa-users-select-field-control__value">
          {`Ответственный: ${getFullFIO(
            items[0].surname,
            items[0].name,
            items[0].patronymic
          )}`}
        </div>
      );
    };
    const ValueElementMultiple = () => {
      return (
        <div className="cfa-users-select-field-control__value">
          <div className="cfa-users-select-field-control__value-title">
            {`Ответственные: ${items.length} ${declOfNum(
              items.length,
              user_forms
            )}`}
          </div>
          <div className="cfa-users-select-field-control__value-names">
            {`(${items.map((item) => item.surname).join(', ')})`}
          </div>
        </div>
      );
    };
    return items.length === 1 ? (
      <ValueElementSingle />
    ) : (
      <ValueElementMultiple />
    );
  };

  const onChangeHandler = (value?: unknown[], name?: string) => {
    setState(value);
    if (onChange) onChange(value, name);
  };

  return (
    <MultiSelectExtFieldControl
      className="cfa-users-select-field-control"
      classNameMenu="cfa-users-select-field-control__menu"
      placeholder="Выберите сотрудников"
      items={stateItems?.slice().sort((a, b) => a.totalDeals - b.totalDeals)}
      valueField="id"
      labelField="surname"
      renderOption={renderOption}
      renderValue={renderValue}
      value={state}
      onChange={onChangeHandler}
      onSave={onSave}
      onCancel={onCancel}
      onClose={onClose}
      autoPopoverWidth
      MenuProps={{
        anchorOrigin: {vertical: 'bottom', horizontal: 'right'},
        transformOrigin: {vertical: -8, horizontal: 'right'},
      }}
      disabled={disabled}
      multiple
      displaySelectedFirst
    />
  );
};
