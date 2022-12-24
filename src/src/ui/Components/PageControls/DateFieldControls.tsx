import React, {useState} from 'react';
import {isBefore, isValid, parse} from 'date-fns';
import format from 'date-fns/format';
import {ParsableDate} from '@material-ui/pickers/constants/prop-types';
import {FieldValues, FormProvider, useForm} from 'react-hook-form';
import {Button} from '../../Common/SimpleComponents/Button';
import {FormField, FormSection} from '../../Common/FormComponents';
import {
  DateFieldControl,
  DateFieldControlEditable,
  DateFieldControlUseForm,
} from '../../Common/FieldControls';

export const DateFieldControls = () => {
  const methods = useForm<FieldValues>({
    mode: 'onChange',
    defaultValues: {
      dateValidation: '27.06.2021',
      dateLessThen: '28.06.2021',
    },
  });

  const submit = (data: any) => {
    console.log(data);
  };

  const [value, setValue] = useState<ParsableDate>(null);

  return (
    <FormSection title="DateField">
      <FormField
        title="1. DateFieldControl"
        info="Зависит от @material-ui/pickers, CalendarIcon, date-fns"
      >
        <DateFieldControl
          name="d1"
          label="Заголовок"
          placeholder="Поле пустое c колбэком onChange"
          onChange={(date, name) => {
            console.log(date, name);
          }}
          minDate={new Date()}
        />
        <DateFieldControl
          placeholder="Поле с ошибкой"
          helperText="Ошибка"
          error={true}
          value={'01.01.2021'}
        />
        <DateFieldControl
          placeholder="Поле со значением"
          value={new Date()}
          shouldValidate={true}
        />
      </FormField>
      <FormField
        title="2. DateFieldControlEditable"
        info="Зависит от DateFieldControl"
      >
        <DateFieldControlEditable
          label="Заголовок"
          placeholder="Редактируемое поле пустое"
          value={value}
          onChange={(value) => setValue(value)}
          shouldValidate={true}
        />
        <DateFieldControlEditable
          name="d2"
          placeholder="Редактируемое поле с ошибкой"
          error={true}
          helperText="Ошибка"
          onChange={(date, name) => {
            console.log(date, name);
          }}
        />
        <DateFieldControlEditable
          placeholder="Нередактируемое поле"
          isEdit={false}
          value={value}
        />
      </FormField>
      <FormField
        title="3. DateFieldControlUseForm"
        info="Зависит от DateFieldControlEditable, react-hook-form"
      >
        <FormProvider {...methods}>
          <DateFieldControlUseForm
            label="Заголовок"
            name="dateNoValidation"
            placeholder="Поле без валидации"
          />
          <DateFieldControlUseForm
            name="dateValidation"
            placeholder="Валидация required"
            shouldValidate={true}
            rules={{required: 'Поле обязательно для заполнения'}}
            onChange={(value, name) => {
              methods.trigger('dateLessThen');
              console.log(value, name);
            }}
          />
          <DateFieldControlUseForm
            name="dateLessThen"
            placeholder="Валидация lessThen"
            shouldValidate={true}
            rules={{
              validate: {
                lessThen: (value: any) => {
                  const dateLessThen =
                    typeof value === 'string'
                      ? parse(value, 'dd.MM.yyyy', new Date())
                      : value;
                  const valueValidation = methods.getValues('dateValidation');
                  const dateValidation =
                    typeof valueValidation === 'string'
                      ? parse(valueValidation, 'dd.MM.yyyy', new Date())
                      : valueValidation;
                  const stringValidation =
                    typeof valueValidation !== 'string' &&
                    isValid(valueValidation)
                      ? format(valueValidation, 'dd.MM.yyyy')
                      : valueValidation;
                  return (
                    isBefore(dateLessThen, dateValidation) ||
                    `Дата должна быть меньше ${stringValidation}`
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
