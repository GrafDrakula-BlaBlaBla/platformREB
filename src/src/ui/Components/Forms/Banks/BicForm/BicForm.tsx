import React from 'react';
import {useFormContext} from 'react-hook-form';
import {Form, FormField, FormSection} from '../../../../Common/FormComponents';
import {Autocomplete} from '@material-ui/lab';
import CloseIcon from '@material-ui/icons/Close';
import {observer} from 'mobx-react-lite';
import {TextFieldControlUseForm} from '../../../../Common/FieldControls';
import {IBicDTO} from '../../../../../Model/Bic';
import {DialogSupport} from '../../../Dialogs/DialogSupport';
import useViewModel from '../../../../hooks/useViewModel';
import {VIEW_MODEL} from '../../../../../ViewModel/identifiers';
import {IBicViewModel} from '../../../../../ViewModel/viewModels/Bic/interfaces';
import {ISupportViewModel} from '../../../../../ViewModel/viewModels/Support/interfaces';
import './index.less';

export const BicForm = observer(() => {
  const support = useViewModel<ISupportViewModel>(VIEW_MODEL.Support);
  const {bics, search, check} = useViewModel<IBicViewModel>(VIEW_MODEL.Bic);

  const methods = useFormContext();
  const bic_error = methods.formState.errors.bic;

  const onSupport = () => {
    support.setIsOpenCard(true);
  };

  return (
    <Form className="bic-form">
      <FormSection title="Регистрация">
        <FormField>
          <Autocomplete
            noOptionsText="Нет данных"
            freeSolo
            options={bics}
            renderOption={(options) => <AutoCompleteItem options={options} />}
            getOptionLabel={(option) => option.code || String(option)}
            onChange={(_, value, reason) => {
              if (value && reason === 'select-option') {
                methods.clearErrors();
                methods.setValue('canSubmitOnEnter', false);
                methods.setValue('bic', (value as IBicDTO).code);
              }
            }}
            popupIcon={false}
            closeIcon={
              <CloseIcon
                onClick={() => {
                  methods.clearErrors();
                  methods.setValue('bic', '');
                  search('');
                }}
              />
            }
            renderInput={(option) => {
              return (
                <TextFieldControlUseForm
                  {...option}
                  name="bic"
                  className="bic-form__text-field"
                  placeholder="Введите БИК банка"
                  onChange={(e) => search(e.target.value)}
                  rules={{
                    required: 'Поле обязательно для заполнения',
                    validate: {
                      checkLength: (value) => {
                        return (
                          (value && value.length === 9) ||
                          'БИК банка должен соделжать 9 цифр'
                        );
                      },
                      checkBicFound: async (value) => {
                        const searchList = await search(value);
                        return searchList.length > 0;
                      },
                      checkBicExist: async (value) => {
                        return await check(value);
                      },
                    },
                  }}
                />
              );
            }}
          />
          {bic_error ? (
            bic_error.type === 'checkBicExist' ? (
              <div className="bic-form__error">
                К сожалению, мы не можем зарегистрировать вас на платформе.{' '}
                <span onClick={onSupport} className="link">
                  Обратитесь в службу поддержки
                </span>
              </div>
            ) : bic_error.type === 'checkBicFound' ? (
              <div className="bic-form__error">
                Введенный БИК банка не обнаружен в системе. Проверьте
                корректность ввода БИК или{' '}
                <span onClick={onSupport} className="link">
                  обратитесь в службу поддержки
                </span>
              </div>
            ) : null
          ) : null}
        </FormField>
      </FormSection>
      <DialogSupport />
    </Form>
  );
});

const AutoCompleteItem = ({options}: {options: IBicDTO}) => {
  return (
    <div className="bic-form__list-item">
      <div className="bic-form__list-item-code">{options.code}</div>
      <div className="bic-form__list-item-name">{options.shortName}</div>
    </div>
  );
};
