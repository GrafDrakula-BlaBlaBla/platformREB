import React, {ChangeEvent, useState} from 'react';
import {FieldValues, FormProvider, useForm} from 'react-hook-form';
import {FormField, FormSection} from '../../Common/FormComponents';
import {Button} from '../../Common/SimpleComponents/Button';
import {
  SwitchFieldControl,
  SwitchFieldControlEditable,
  SwitchFieldControlUseForm,
} from '../../Common/FieldControls';

export const SwitchFieldControls = () => {
  const methods = useForm<FieldValues>({
    mode: 'onChange',
  });

  const submit = (data: any) => {
    console.log(data);
  };

  const [value, setValue] = useState<boolean>();

  return (
    <FormSection title="SwitchField">
      <FormField
        title="1. SwitchFieldControl"
        info="Зависит от @material-ui/core"
      >
        <SwitchFieldControl label="Выбрано" value={true} />
        <SwitchFieldControl
          label="Поле с ошибкой"
          error={true}
          helperText="Ошибка"
        />
        <SwitchFieldControl disabled label="Заблокировано" />
        <SwitchFieldControl disabled checked label="Выбрано и заблокировано" />
      </FormField>
      <FormField
        title="2. SwitchFieldControlEditable"
        info="Зависит от SwitchFieldControl"
      >
        <SwitchFieldControlEditable
          label="Редактируемое поле"
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setValue(e.target.checked)
          }
        />
        <SwitchFieldControlEditable
          label="Редактируемое поле с ошибкой"
          error={true}
          helperText="Ошибка"
        />
        <SwitchFieldControlEditable
          label="Нередактируемое поле"
          isEdit={false}
          value={value}
        />
      </FormField>
      <FormField
        title="3. SwitchFieldControlUseForm"
        info="Зависит от SwitchFieldControlEditable, react-hook-form"
      >
        <FormProvider {...methods}>
          <SwitchFieldControlUseForm
            name="noValidation"
            label="Поле без валидации"
          />
          <SwitchFieldControlUseForm
            name="validation"
            label="Валидация required"
            rules={{required: 'Поле обязательно для заполнения'}}
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
