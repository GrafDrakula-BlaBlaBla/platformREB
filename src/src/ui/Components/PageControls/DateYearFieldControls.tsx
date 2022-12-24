import React, {useState} from 'react';
import {FieldValues, FormProvider, useForm} from 'react-hook-form';
import {Button} from '../../Common/SimpleComponents/Button';
import {FormField, FormSection} from '../../Common/FormComponents';
import {
  DateYearFieldControl,
  DateYearFieldControlEditable,
  DateYearFieldControlUseForm,
} from '../../Common/FieldControls';

export const DateYearFieldControls = () => {
  const methods = useForm<FieldValues>({
    mode: 'onChange',
    defaultValues: {
      dateValidation: 2021,
      dateLessThen: '2022',
    },
  });

  const submit = (data: any) => {
    console.log(data);
  };

  const [value, setValue] = useState<number | undefined>(undefined);

  return (
    <FormSection title="DateYearField">
      <FormField
        title="1. DateYearFieldControl"
        info="Зависит от @material-ui/pickers, CalendarIcon, date-fns"
      >
        <DateYearFieldControl
          name="year1"
          label="Поле выбора года"
          onChange={(year, name) => {
            console.log(year, name);
          }}
          minDate={new Date()}
        />
        <DateYearFieldControl
          placeholder="Поле с ошибкой"
          helperText="Ошибка"
          error={true}
          value={2030}
        />
        <DateYearFieldControl
          placeholder="Поле со значением"
          value={new Date().getFullYear()}
          shouldValidate={true}
        />
      </FormField>
      <FormField
        title="2. DateYearFieldControlEditable"
        info="Зависит от DateYearFieldControl"
      >
        <DateYearFieldControlEditable
          label="Заголовок"
          placeholder="Редактируемое поле пустое"
          value={value}
          onChange={(value) => setValue(value)}
          shouldValidate={true}
        />
        <DateYearFieldControlEditable
          name="d2"
          placeholder="Редактируемое поле с ошибкой"
          error={true}
          helperText="Ошибка"
          onChange={(year, name) => {
            console.log(year, name);
          }}
        />
        <DateYearFieldControlEditable
          placeholder="Нередактируемое поле"
          isEdit={false}
          value={value}
        />
      </FormField>
      <FormField
        title="3. DateYearFieldControlUseForm"
        info="Зависит от DateYearFieldControlEditable, react-hook-form"
      >
        <FormProvider {...methods}>
          <DateYearFieldControlUseForm
            label="Поле без валидации"
            name="dateNoValidation"
          />
          <DateYearFieldControlUseForm
            name="dateValidation"
            placeholder="Валидация required"
            rules={{required: 'Поле обязательно для заполнения'}}
            onChange={(value, name) => {
              methods.trigger('dateLessThen');
              console.log(value, name);
            }}
          />
          <DateYearFieldControlUseForm
            name="dateLessThen"
            placeholder="Валидация lessThen"
            rules={{
              validate: {
                lessThen: (value: any) => {
                  const valueValidation = methods.getValues('dateValidation');
                  return (
                    value < valueValidation ||
                    `Год должен быть меньше ${valueValidation}`
                  );
                },
              },
            }}
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
