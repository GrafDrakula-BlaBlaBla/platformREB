import React from 'react';
import {observer} from 'mobx-react-lite';
import {ModalPage} from '../../../../Common/SimpleComponents/ModalPage';
import {LoaderWithBackdrop} from '../../../../Common/SimpleComponents/LoaderWithBackdrop';
import {FormField} from '../../../../Common/FormComponents';
import {MultiSelectExtFieldControlUseForm} from '../../../../Common/FieldControls';
import {getFullFIO} from '../../../../../Model/User/functions';
import {ICFABankUserDTO} from '../../../../../Model/CFA_Deal';
import {FieldValues, useForm, FormProvider} from 'react-hook-form';
import './index.less';

interface IDialogCuratorProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (value?: string, name?: string) => void;
  loading?: boolean;
  items?: ICFABankUserDTO[];
  fieldName: string;
}

export const DialogCurator = observer((props: IDialogCuratorProps) => {
  const {isOpen, onClose, onSuccess, loading, items, fieldName} = props;

  const renderOption = (item: ICFABankUserDTO) => {
    return getFullFIO(item.surname, item.name, item.patronymic);
  };
  const renderValue = (items: ICFABankUserDTO[]) => {
    return items
      .map((item) => getFullFIO(item.surname, item.name, item.patronymic))
      .join(',');
  };

  const methods = useForm<FieldValues>({
    mode: 'onChange',
  });

  const submit = async (data: any) => {
    const curatorValue = data[fieldName][0];
    if (onSuccess) await onSuccess(curatorValue, fieldName);
    closeHandler();
  };

  const closeHandler = () => {
    methods.reset({[fieldName]: []});
    if (onClose) onClose();
  };

  return (
    <ModalPage
      className="dialog-curator"
      onClose={closeHandler}
      isOpen={isOpen}
      header={{title: 'Выберите контролера'}}
      footerButtonConfig={[
        {
          children: 'Отмена',
          variant: 'outlined',
          color: 'default',
          onClick: closeHandler,
        },
        {
          children: 'Отправить',
          variant: 'contained',
          color: 'blue',
          onClick: methods.handleSubmit(submit),
        },
      ]}
    >
      <FormField title="Перед отправкой в РЭБ сделка будет направлена контролеру для проверки">
        <FormProvider {...methods}>
          <MultiSelectExtFieldControlUseForm
            placeholder="Выберите куратора"
            name={fieldName}
            items={items}
            valueField="id"
            labelField="surname"
            renderOption={renderOption}
            renderValue={renderValue}
            classNameMenu="dialog-curator__menu"
            autoPopoverWidth
            onSave={() => {}}
            rules={{required: 'Поле обязательно для заполнения'}}
          />
        </FormProvider>
      </FormField>
      <LoaderWithBackdrop loading={loading} />
    </ModalPage>
  );
});
