import React, {useState} from 'react';
import {FormField, FormSection} from '../../Common/FormComponents';
import {
  MultiSelectExtFieldControl,
  MultiSelectExtFieldControlUseForm,
} from '../../Common/FieldControls';
import {getFullFIO} from '../../../Model/User/functions';
import {declOfNum} from '../../../Utils/Number/declOfNum';
import {Button} from '../../Common/SimpleComponents/Button';
import {DialogCurator} from '../Dialogs/CreditForAccreditive/DialogCurator';
import {MultiSelectExtFieldControlEditable} from '../../Common/FieldControls';
import {FieldValues, FormProvider, useForm} from 'react-hook-form';

const user_forms = ['человек', 'человека', 'человек'];

interface ItemType {
  id: string;
  name: string;
  surname: string;
  patronymic: string;
  totalDeals: number;
}
const items: ItemType[] = [
  {
    id: '1',
    name: 'Василий',
    surname: 'Быстроногов',
    patronymic: 'Михайлович',
    totalDeals: 5,
  },
  {
    id: '2',
    name: 'Константин',
    surname: 'Петров',
    patronymic: 'Николаевич',
    totalDeals: 10,
  },
  {
    id: '3',
    name: 'Максим',
    surname: 'Волков',
    patronymic: 'Сергеевич',
    totalDeals: 3,
  },
  {
    id: '4',
    name: 'Сергей',
    surname: 'Ветров',
    patronymic: 'Михайлович',
    totalDeals: 6,
  },
  {
    id: '5',
    name: 'Игорь',
    surname: 'Максименко',
    patronymic: 'Михайлов',
    totalDeals: 1,
  },
];

export const MultiSelectExtFieldControls = () => {
  const renderOption = (item: ItemType) => {
    return `${getFullFIO(item.surname, item.name, item.patronymic)}`;
  };
  const renderValue = (items: ItemType[]) => {
    return `${items.length} ${declOfNum(items.length, user_forms)} (${items
      .map((item) => item.surname)
      .join(', ')})`;
  };

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [value, setValue] = useState<unknown[] | undefined>();

  const methods = useForm<FieldValues>({mode: 'onChange'});
  const submit = (data: any) => console.log(data);

  return (
    <FormSection title="MultiSelectExtField">
      <FormField
        title="1. MultiSelectExtFieldControl"
        info="Зависит от @material-ui/core"
      >
        <MultiSelectExtFieldControl
          placeholder="Выберите людей"
          items={items}
          valueField="id"
          labelField="surname"
          renderOption={renderOption}
          renderValue={renderValue}
          autoPopoverWidth
        />
      </FormField>
      <FormField
        title="2. MultiSelectExtFieldControlEditable"
        info="Зависит от MultiSelectExtFieldControl"
      >
        <MultiSelectExtFieldControlEditable
          placeholder="Выберите людей"
          items={items}
          valueField="id"
          labelField="surname"
          renderOption={renderOption}
          renderValue={renderValue}
          onChange={(value?: unknown[]) => setValue(value)}
          autoPopoverWidth
          multiple
        />
        <MultiSelectExtFieldControlEditable
          error={true}
          helperText="Ошибка"
          placeholder="Выберите людей"
          items={items}
          valueField="id"
          labelField="surname"
          renderOption={renderOption}
          renderValue={renderValue}
          autoPopoverWidth
        />
        <MultiSelectExtFieldControlEditable
          isEdit={false}
          placeholder="Выберите людей"
          items={items}
          valueField="id"
          labelField="surname"
          renderOption={renderOption}
          renderValue={renderValue}
          autoPopoverWidth
          value={value}
        />
      </FormField>
      <FormField
        title="3. MultiSelectExtFieldControlUseForm"
        info="Зависит от MultiSelectExtFieldControlEditable, react-hook-form"
      >
        <FormProvider {...methods}>
          <MultiSelectExtFieldControlUseForm
            name="one"
            placeholder="Выберите людей"
            items={items}
            valueField="id"
            labelField="surname"
            renderOption={renderOption}
            renderValue={renderValue}
            autoPopoverWidth
          />
          <MultiSelectExtFieldControlUseForm
            name="two"
            placeholder="Выберите людей"
            items={items}
            valueField="id"
            labelField="surname"
            renderOption={renderOption}
            renderValue={renderValue}
            autoPopoverWidth
            rules={{required: 'Поле обязательно для заполнения'}}
          />
          <Button
            onClick={methods.handleSubmit(submit)}
            className="field-control"
          >
            Подтвердить
          </Button>
        </FormProvider>
      </FormField>
      <FormField title="4. DialogCurator - диалоговое окно с использованием MultiSelectExtField">
        <DialogCurator
          fieldName="curator"
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onSuccess={(value?: string, name?: string) => {
            const user = items.find((item) => item.id === value);
            console.log(name, user);
          }}
          loading={false}
          items={items}
        />
        <Button onClick={() => setIsOpen(true)} className="field-control">
          Диалог выбора куратора
        </Button>
      </FormField>
    </FormSection>
  );
};
