import React, {useState} from 'react';
import {parse, isValid, isAfter} from 'date-fns';
import {FieldValues, FormProvider, useForm} from 'react-hook-form';
import {Button} from '../../Common/SimpleComponents/Button';
import {FormField, FormSection} from '../../Common/FormComponents';
import {
  IDateIntervalValue,
  dateIntervalDefaultValue,
  DateIntervalFieldControl,
  DateIntervalFieldControlEditable,
  DateIntervalFieldControlUseForm,
} from '../../Common/FieldControls';

export const DateIntervalFieldControls = () => {
  const methods = useForm<FieldValues>({
    mode: 'onChange',
  });

  const submit = (data: any) => {
    console.log(data);
  };

  const [value, setValue] = useState<IDateIntervalValue>(
    dateIntervalDefaultValue
  );

  return (
    <FormSection title="DateIntervalField">
      <FormField
        title="1. DateIntervalFieldControl"
        info="Зависит от @material-ui/pickers, DateFieldControl, CalendarIcon, date-fns"
      >
        <DateIntervalFieldControl
          name="d1"
          labelStart="Начало"
          labelEnd="Конец"
          onChange={(value, name) => {
            console.log(value, name);
          }}
          minDate={new Date()}
        />
        <DateIntervalFieldControl name="d2" helperText="Ошибка" error={true} />
        <DateIntervalFieldControl
          name="d3"
          value={{
            start: parse('01.01.2021', 'dd.MM.yyyy', new Date()),
            end: parse('01.02.2021', 'dd.MM.yyyy', new Date()),
          }}
        />
      </FormField>
      <FormField
        title="2. DateIntervalFieldControlEditable"
        info="Зависит от DateIntervalFieldControl"
      >
        <DateIntervalFieldControlEditable
          label="Заголовок"
          placeholder="Редактируемое поле пустое"
          value={value}
          onChange={(value) => setValue(value)}
        />
        <DateIntervalFieldControlEditable
          name="d2"
          placeholder="Редактируемое поле с ошибкой"
          error={true}
          helperText="Ошибка"
          onChange={(value, name) => {
            console.log(value, name);
          }}
        />
        <DateIntervalFieldControlEditable
          placeholder="Нередактируемое поле"
          isEdit={false}
          value={value}
        />
      </FormField>
      <FormField
        title="3. DateIntervalFieldControlUseForm"
        info="Зависит от DateIntervalFieldControlEditable, react-hook-form"
      >
        <FormProvider {...methods}>
          <DateIntervalFieldControlUseForm
            name="dateNoValidation"
            onChange={(value, name) => {
              console.log(value, name);
            }}
          />
          <DateIntervalFieldControlUseForm
            name="dateValidation"
            rules={{
              validate: {
                required: function (value: IDateIntervalValue) {
                  const valid = Boolean(value && value.start && value.end);
                  return valid || 'Поле обязательно для заполнения';
                },
                valid: function (value: IDateIntervalValue) {
                  const valid = Boolean(
                    value && isValid(value.start) && isValid(value.end)
                  );
                  return valid || 'Не верный формат даты';
                },
                startAfterEnd: function (value: IDateIntervalValue) {
                  const valid = Boolean(
                    value &&
                      value.start &&
                      value.end &&
                      !isAfter(value.start, value.end)
                  );
                  return (
                    valid || 'Дата начала не может быть больше даты окончания'
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
