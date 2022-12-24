import React, {useState} from 'react';
import {FieldValues, FormProvider, useForm} from 'react-hook-form';
import {Button} from '../../Common/SimpleComponents/Button';
import {FormField, FormSection} from '../../Common/FormComponents';
import {
  PhoneFieldControl,
  PhoneFieldControlEditable,
  PhoneFieldControlUseForm,
} from '../../Common/FieldControls';

export const PhoneFieldControls = () => {
  const methods = useForm<FieldValues>({
    mode: 'onChange',
  });

  const submit = (data: any) => {
    console.log(data);
  };

  const [value, setValue] = useState<string>();

  return (
    <FormSection title="PhoneField">
      <FormField
        title="1. PhoneFieldControl"
        info="Зависит от @material-ui/core"
      >
        <PhoneFieldControl
          label="Заголовок"
          placeholder="Поле пустое c колбэком onChange"
          onChange={(e) => {}}
        />
        <PhoneFieldControl
          placeholder="Поле с ошибкой"
          error={true}
          helperText="Ошибка"
        />
        <PhoneFieldControl placeholder="Поле со значением" value="9261234567" />
      </FormField>
      <FormField
        title="2. PhoneFieldControlEditable"
        info="Зависит от PhoneFieldControl, NumberFormat"
      >
        <PhoneFieldControlEditable
          label="Заголовок"
          placeholder="Редактируемое поле пустое"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <PhoneFieldControlEditable
          placeholder="Редактируемое поле с ошибкой"
          error={true}
          helperText="Ошибка"
        />
        <PhoneFieldControlEditable
          placeholder="Нередактируемое поле"
          isEdit={false}
          value={value}
        />
      </FormField>
      <FormField
        title="3. PhoneFieldControlUseForm"
        info="Зависит от PhoneFieldControlEditable, react-hook-form"
      >
        <FormProvider {...methods}>
          <PhoneFieldControlUseForm
            label="Заголовок"
            name="phoneNoValidation"
            placeholder="Поле без валидации"
          />
          <PhoneFieldControlUseForm
            name="phone"
            isEdit={true}
            placeholder="Валидация телефона, required"
            rules={{required: 'Поле обязательно для заполнения'}}
            shouldValidate={true}
            onChange={(e) => {}}
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
