import React, {useState} from 'react';
import {FieldValues, FormProvider, useForm} from 'react-hook-form';
import {Button} from '../../Common/SimpleComponents/Button';
import {FormField, FormSection} from '../../Common/FormComponents';
import {
  CurrencyFieldControl,
  CurrencyFieldControlEditable,
  CurrencyFieldControlUseForm,
} from '../../Common/FieldControls';

export const CurrencyFieldControls = () => {
  const methods = useForm<FieldValues>({
    mode: 'onChange',
  });

  const submit = (data: any) => {
    console.log(data);
  };

  const [value, setValue] = useState<string>();

  return (
    <FormSection title="CurrencyField">
      <FormField
        title="1. CurrencyFieldControl"
        info="Зависит от @material-ui/core"
      >
        <CurrencyFieldControl
          label="Заголовок"
          placeholder="Поле пустое c колбэком onChange"
          onChange={(e) => {}}
        />
        <CurrencyFieldControl
          placeholder="Поле с ошибкой"
          error={true}
          helperText="Ошибка"
          codeLat="USD"
        />
        <CurrencyFieldControl
          placeholder="Поле со значением"
          value="1000000"
          codeLat="EUR"
        />
      </FormField>
      <FormField
        title="2. CurrencyFieldControlEditable"
        info="Зависит от CurrencyFieldControl, NumberFormat"
      >
        <CurrencyFieldControlEditable
          placeholder="Японская йена"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          codeLat="JPY"
        />
        <CurrencyFieldControlEditable
          placeholder="Редактируемое поле с ошибкой"
          error={true}
          helperText="Ошибка"
        />
        <CurrencyFieldControlEditable
          placeholder="Нередактируемое поле"
          isEdit={false}
          value={value}
          codeLat="JPY"
        />
        <CurrencyFieldControlEditable
          placeholder="Нередактируемое поле"
          isEdit={false}
          value={value}
          codeLat="RUB"
        />
      </FormField>
      <FormField
        title="3. CurrencyFieldControlUseForm"
        info="Зависит от CurrencyFieldControlEditable, react-hook-form"
      >
        <FormProvider {...methods}>
          <CurrencyFieldControlUseForm
            label="Заголовок"
            name="rubNoValidation"
            placeholder="Поле без валидации"
          />
          <CurrencyFieldControlUseForm
            name="rub"
            isEdit={true}
            placeholder="Валидация required"
            rules={{required: 'Поле обязательно для заполнения'}}
            onChange={() => {}}
          />
          <Button
            onClick={methods.handleSubmit(submit)}
            className="field-control"
          >
            Подтвердить
          </Button>
        </FormProvider>
      </FormField>
    </FormSection>
  );
};
