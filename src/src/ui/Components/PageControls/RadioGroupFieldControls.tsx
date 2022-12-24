import React, {ChangeEvent, useState} from 'react';
import {FieldValues, FormProvider, useForm} from 'react-hook-form';
import {Button} from '../../Common/SimpleComponents/Button';
import {FormField, FormSection} from '../../Common/FormComponents';
import {
  RadioGroupFieldControl,
  RadioGroupFieldControlEditable,
  RadioGroupFieldControlUseForm,
} from '../../Common/FieldControls';

export const RadioGroupFieldControls = () => {
  const methods = useForm<FieldValues>({
    defaultValues: {
      validation: '1',
    },
    mode: 'onChange',
  });

  const submit = (data: any) => {
    console.log(data);
  };

  const [value, setValue] = useState<string>();

  const items = [
    {value: '1', label: 'Пункт 1'},
    {value: '2', label: 'Пункт 2'},
  ];

  return (
    <FormSection title="RadioGroupField">
      <FormField
        title="1. RadioGroupFieldControl"
        info="Зависит от @material-ui/core"
      >
        <RadioGroupFieldControl items={items} />
        <RadioGroupFieldControl
          error={true}
          helperText="Ошибка"
          items={items}
        />
        <RadioGroupFieldControl value={'1'} items={items} />
      </FormField>
      <FormField
        title="2. RadioGroupFieldControlEditable"
        info="Зависит от RadioGroupFieldControl"
      >
        <RadioGroupFieldControlEditable
          items={items}
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setValue(e.target.value)
          }
        />
        <RadioGroupFieldControlEditable
          items={items}
          error={true}
          helperText="Ошибка"
        />
        <RadioGroupFieldControlEditable
          items={items}
          isEdit={false}
          value={value}
        />
      </FormField>
      <FormField
        title="3. RadioGroupFieldControlUseForm"
        info="Зависит от RadioGroupFieldControlEditable, react-hook-form"
      >
        <FormProvider {...methods}>
          <RadioGroupFieldControlUseForm name="noValidation" items={items} />
          <RadioGroupFieldControlUseForm
            name="validation"
            items={items}
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
