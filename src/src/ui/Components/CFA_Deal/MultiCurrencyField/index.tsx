import React, {useEffect, useState} from 'react';
import {observer} from 'mobx-react-lite';
import {Controller, UseControllerProps, useFormContext} from 'react-hook-form';
import {Autocomplete} from '@material-ui/lab';
import {TextFieldControlUseForm} from '../../../Common/FieldControls';
import {VIEW_MODEL} from '../../../../ViewModel/identifiers';
import {ClassNameInjection} from '../../../../Utils/ClassNames/ClassNameInjection';
import useViewModel from '../../../hooks/useViewModel';
import {IDictionaryViewModel} from '../../../../ViewModel/viewModels/Dictionary/interfaces';
import {ICurrencyDTO} from '../../../../Model/Dictionary';
import {throttle} from '../../../../Utils/Function/throttle';

export type typeValue = Pick<ICurrencyDTO, 'name' | 'codeDig' | 'codeLat'>;

export type MultiCurrencyFieldProps<K, V> = UseControllerProps & {
  name: string;
  type: K;
  value?: V;
  onChange: (value: V | undefined, name: string) => void;
  isEdit?: boolean;
  isDisable?: boolean;
  className?: string;
};

const convertCurrencyToString = ({name, codeDig, codeLat}: ICurrencyDTO) => {
  return codeDig ? `${codeDig} - ${name} (${codeLat})` : '';
};
const MAP_TEXT_ERROR = {
  isEmpty: 'Поле обязательно для заполнения',
  isNotSelected: 'Валюта не выбрана',
};

export const MultiCurrencyField = observer(
  <K extends keyof typeValue, V extends typeValue[K]>({
    className,
    type,
    name,
    value,
    isEdit,
    isDisable: isDisableDefault = false,
    onChange,
  }: MultiCurrencyFieldProps<K, V>) => {
    const {currencies: options, getCurrencies, getCurrency} = useViewModel<
      IDictionaryViewModel
    >(VIEW_MODEL.Dictionary);

    const {control, trigger} = useFormContext();

    const [currentCurrency, setCurrentCurrency] = useState<ICurrencyDTO | null>(
      null
    );
    const [inputValue, setInputValue] = useState<string>('');
    const [isDisableInput, setIsDisableInput] = useState<boolean>(
      isDisableDefault
    );
    const [isInitial, setIsInitial] = useState<boolean>(true);
    const throttleGetCurrencies = throttle(getCurrencies, 100);

    useEffect(() => {
      const loadCurrentCurrency = async () => {
        setIsDisableInput(true);
        const currentCurrency = await getCurrency({[type]: value});
        if (currentCurrency) {
          setInputValue(convertCurrencyToString(currentCurrency));
          setCurrentCurrency(currentCurrency);
        }
        setIsDisableInput(false);
      };
      if (value) {
        loadCurrentCurrency();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
      if (currentCurrency) {
        onChange(currentCurrency[type] as V, name);
      } else {
        onChange(undefined, name);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentCurrency]);

    useEffect(() => {
      if (!isInitial) {
        trigger(name);
      } else {
        setIsInitial(false);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentCurrency, inputValue]);

    return (
      <Controller
        name={name}
        control={control}
        render={({field}) => (
          <Autocomplete
            freeSolo
            className={ClassNameInjection(
              'multi-currency-field-control',
              className
            )}
            value={currentCurrency}
            options={options?.items.map((item) => item) || []}
            getOptionLabel={convertCurrencyToString}
            inputValue={inputValue}
            onChange={(event, value) => {
              field.onChange(event);
              if (typeof value === 'object') {
                setCurrentCurrency(value);
              } else {
                setCurrentCurrency(null);
              }
            }}
            onInputChange={(_, value) => {
              throttleGetCurrencies({limit: 5, query: value});
              setInputValue(value);
            }}
            getOptionSelected={(option, value) => {
              return option[type] === value[type];
            }}
            renderInput={(options) => {
              return (
                <TextFieldControlUseForm
                  {...options}
                  name={name}
                  isEdit={isEdit}
                  disabled={isDisableInput}
                  style={{width: 400}}
                  placeholder="Начните вводить код или название валюты"
                  rules={{
                    validate: {
                      validation: () => {
                        if (!inputValue && !currentCurrency) {
                          return MAP_TEXT_ERROR.isEmpty;
                        }
                        if (
                          !currentCurrency ||
                          (currentCurrency &&
                            inputValue !==
                              convertCurrencyToString(currentCurrency))
                        ) {
                          return MAP_TEXT_ERROR.isNotSelected;
                        }
                        return true;
                      },
                    },
                  }}
                />
              );
            }}
          />
        )}
      />
    );
  }
);
