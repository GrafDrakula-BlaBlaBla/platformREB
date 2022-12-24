import React, {ChangeEvent, useState} from 'react';
import {FieldValues, FormProvider, useForm} from 'react-hook-form';
import {Button} from '../../Common/SimpleComponents/Button';
import {FormField, FormSection} from '../../Common/FormComponents';
import {
  CheckboxFieldControl,
  CheckboxFieldControlEditable,
  CheckboxFieldControlUseForm,
} from '../../Common/FieldControls';
import {Favorite, FavoriteBorder} from '@material-ui/icons';

export const CheckboxFieldControls = () => {
  const methods = useForm<FieldValues>({
    mode: 'onChange',
  });

  const submit = (data: any) => {
    console.log(data);
  };

  const [value, setValue] = useState<boolean>();

  return (
    <FormSection title="CheckboxField">
      <FormField
        title="1. CheckboxFieldControl"
        info="Зависит от @material-ui/core"
      >
        <CheckboxFieldControl />
        <CheckboxFieldControl
          label="Поле с ошибкой"
          error={true}
          helperText="Ошибка"
        />
        <CheckboxFieldControl
          label="Кастомная иконка"
          value={true}
          icon={<FavoriteBorder />}
          checkedIcon={<Favorite />}
        />
      </FormField>
      <FormField
        title="2. CheckboxFieldControlEditable"
        info="Зависит от CheckboxFieldControl"
      >
        <CheckboxFieldControlEditable
          label="Редактируемое поле"
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setValue(e.target.checked)
          }
        />
        <CheckboxFieldControlEditable
          label="Редактируемое поле с ошибкой"
          error={true}
          helperText="Ошибка"
        />
        <CheckboxFieldControlEditable
          label="Нередактируемое поле"
          isEdit={false}
          value={value}
        />
      </FormField>
      <FormField
        title="3. CheckboxFieldControlUseForm"
        info="Зависит от CheckboxFieldControlEditable, react-hook-form"
      >
        <FormProvider {...methods}>
          <CheckboxFieldControlUseForm
            name="noValidation"
            label="Поле без валидации"
          />
          <CheckboxFieldControlUseForm
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
