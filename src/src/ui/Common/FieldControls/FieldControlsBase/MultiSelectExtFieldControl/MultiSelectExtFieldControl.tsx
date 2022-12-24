import React, {useState, ChangeEvent, useMemo} from 'react';
import useUpdateEffect from '../../../../hooks/useUpdateEffect';
import {
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  Popover,
  Select,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import SearchIcon from '@material-ui/icons/Search';
import {MultiSelectFieldControlProps} from '../MultiSelectFieldControl';
import {TextFieldControl} from '../TextFieldControl';
import {ClassNameInjection} from '../../../../../Utils/ClassNames/ClassNameInjection';
import {CheckboxFieldControl} from '../CheckboxFieldControl';
import {Button} from '../../../SimpleComponents/Button';
import {multiSelectExtRenderValue} from './multiSelectExtRenderValue';

/**
 * Компонент MultiSelectExtFieldControl - "Расширенный выпадающий список".
 * Выпадающий список может быть как с единичным выбором, так и с множественным (параметр multiple)
 * Отличие от обычного выпадающего списка в следующем:
 * - в качестве механизма выбора элемента списка используются чекбоксы
 * - добавлен параметр рендер-функция для отображения выбранного значения
 * - добавлен параметр рендер-функция для отображения элементов списка
 * - добавлены кнопки на поповере и соответствубщие параметры колбэки (Отмена, Выбрать)
 *
 * @param items Список элементов выпадающего списка
 * @param valueField Наименование поля для значения элемента списка по-умолчанию
 * @param labelField Наименование поля для отображения элемента списка по-умолчанию
 * @param renderValue Рендер-функция отображения выбраных элементов в инпуте
 * @param renderOption Рендер-функция отображения элемента выпадающего списка
 * @param classNameMenu Наименование класса поповера
 * @param autoPopoverWidth Автоопределение ширины поповера, если true, то ширина поповера равна ширине инпута
 * @param onSave Колбэк кнопки "Выбрать" на выпадающем списке
 * @param onCancel Колбэк кнопки "Отмена" на выпадающем списке
 * @param onClose Колбэк закрытия выпадающего списка
 * @param onChange Колбэк изменения значения
 */

export type MultiSelectExtFieldControlProps<ItemType> = Omit<
  MultiSelectFieldControlProps,
  'items' | 'renderValue' | 'onChange' | 'onClose'
> & {
  items?: ItemType[];
  valueField?: keyof ItemType;
  labelField?: keyof ItemType;
  renderValue?: (items: ItemType[]) => JSX.Element | string;
  renderOption?: (item: ItemType) => JSX.Element | string;
  classNameMenu?: string;
  autoPopoverWidth?: boolean;
  displaySelectedFirst?: boolean;
  searchPlaceholder?: string;
  onSave?: (value?: unknown[], name?: string) => void;
  onCancel?: (value?: unknown[], name?: string) => void;
  onClose?: (value?: unknown[], name?: string) => void;
  onChange?: (value?: unknown[], name?: string) => void;
};

export const MultiSelectExtFieldControl = <ItemType,>(
  props: MultiSelectExtFieldControlProps<ItemType>
) => {
  const {
    className,
    variant,
    value,
    onChange,
    error,
    helperText,
    label,
    multiple,
    placeholder,
    displayEmpty,
    items,
    valueField = 'value' as keyof ItemType,
    labelField = 'label' as keyof ItemType,
    renderValue,
    renderOption,
    classNameMenu,
    onSave,
    onCancel,
    onClose,
    MenuProps,
    autoPopoverWidth,
    displaySelectedFirst,
    ...other
  } = props;

  const selectRef = React.useRef<HTMLDivElement>();

  const [open, setOpen] = useState<boolean>(false);
  const setClosed = () => setOpen(false);
  const setOpened = () => setOpen(true);

  const [state, setState] = useState<unknown[] | undefined>(value || []);
  useUpdateEffect(() => {
    setState(value);
  }, [value]);

  const cls = ClassNameInjection(
    'multi-select-ext-field-control',
    'multi-select-field-control',
    'field-control',
    'field-control_is-edit',
    className ? className : undefined,
    !state || state.length === 0 ? 'field-control_no-data' : undefined
  );

  const clsMenu = ClassNameInjection(
    'multi-select-ext-field-control__menu',
    classNameMenu ? classNameMenu : undefined
  );

  const clearAll = () => {
    setSearchText('');
    setState([]);
    if (onChange) onChange([], other.name);
  };
  const selectAll = () => {
    const values = items?.map((d) => {
      return d[valueField];
    });
    setState(values);
    if (onChange) onChange(values, other.name);
  };

  const [searchText, setSearchText] = useState<string>('');
  const search = (item: ItemType, searchText: string) => {
    let ret = false;
    for (let key in item) {
      if (
        key !== valueField &&
        typeof item[key] === 'string' &&
        ((item[key] as unknown) as string)
          .toLowerCase()
          .indexOf(searchText.toLowerCase()) >= 0
      ) {
        ret = true;
      }
    }
    return ret;
  };
  const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);
  };
  const itemsFiltered = useMemo(() => {
    const _items = items?.filter((item) => search(item, searchText));
    return displaySelectedFirst
      ? _items
          ?.filter((_item) => state?.includes(_item[valueField]))
          .concat(
            _items?.filter((_item) => !state?.includes(_item[valueField]))
          )
      : _items;
    // eslint-disable-next-line
  }, [searchText, state, items, valueField]);

  const onSaveHandler = () => {
    setClosed();
    setSearchText('');
    if (onSave) onSave(state, other.name);
  };
  const onCancelHandler = () => {
    setClosed();
    setSearchText('');
    if (onCancel) onCancel(state, other.name);
  };
  const onChangeHandler = (value: unknown) => {
    let values = [...(state || [])];
    if (multiple) {
      if (values.includes(value)) {
        values = values.filter((v) => v !== value);
      } else {
        values.push(value);
      }
    } else {
      values = [value];
    }
    setState(values);
    if (onChange) onChange(values, other.name);
  };
  const onCloseHandler = () => {
    setClosed();
    setSearchText('');
    if (onClose) onClose(state, other.name);
  };

  return (
    <FormControl variant="outlined" className={cls}>
      {label ? <InputLabel id="label">{label}</InputLabel> : null}
      <Select
        ref={selectRef}
        value={state}
        label={label}
        labelId="label"
        renderValue={(selected) =>
          multiSelectExtRenderValue(
            selected,
            valueField,
            labelField,
            items,
            placeholder,
            renderValue
          )
        }
        IconComponent={open ? ExpandLessIcon : ExpandMoreIcon}
        error={!!error}
        displayEmpty={Boolean(placeholder)}
        placeholder={placeholder}
        open={false}
        onClose={onCloseHandler}
        onOpen={setOpened}
        multiple
        {...other}
      />
      {helperText && (
        <FormHelperText error={!!error}>{helperText}</FormHelperText>
      )}
      <Popover
        open={open}
        anchorEl={selectRef.current}
        onClose={onCloseHandler}
        className={clsMenu}
        anchorOrigin={Object.assign(
          {vertical: 'bottom', horizontal: 'left'},
          MenuProps?.anchorOrigin
        )}
        transformOrigin={Object.assign(
          {vertical: -8, horizontal: 'left'},
          MenuProps?.transformOrigin
        )}
        PaperProps={
          autoPopoverWidth
            ? {
                style: {
                  width: selectRef?.current?.clientWidth,
                },
              }
            : undefined
        }
      >
        <div className="multi-select-ext-field-control__search">
          <TextFieldControl
            value={searchText}
            onChange={onChangeSearch}
            onKeyDown={(e) => e.stopPropagation()}
            placeholder={other.searchPlaceholder || 'Начните вводить имя'}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div className="multi-select-ext-field-control__content">
          {(!itemsFiltered || itemsFiltered?.length === 0) && (
            <div className="multi-select-ext-field-control__menu-item_no-data">
              Не найдено
            </div>
          )}
          {itemsFiltered?.map((item, index) => {
            return (
              <div
                key={index}
                data-value={
                  item[valueField]
                    ? ((item[valueField] as unknown) as string)
                    : ''
                }
                className="multi-select-ext-field-control__menu-item"
                onClick={() => onChangeHandler(item[valueField] as unknown)}
              >
                <CheckboxFieldControl
                  checked={state?.includes(item[valueField])}
                />
                {renderOption ? (
                  renderOption(item)
                ) : (
                  <div className="multi-select-ext-field-control__menu-item-label">
                    {item[labelField]}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="multi-select-ext-field-control__buttons">
          {onCancel ? (
            <Button
              size="small"
              variant="text"
              color="red"
              onClick={onCancelHandler}
            >
              Отмена
            </Button>
          ) : (
            <Button size="small" variant="text" color="red" onClick={clearAll}>
              Очистить
            </Button>
          )}
          {onSave ? (
            <Button
              size="small"
              variant="contained"
              color="blue"
              onClick={onSaveHandler}
            >
              Выбрать
            </Button>
          ) : (
            multiple && (
              <Button
                size="small"
                variant="contained"
                color="blue"
                onClick={selectAll}
              >
                Выбрать все
              </Button>
            )
          )}
        </div>
      </Popover>
    </FormControl>
  );
};
