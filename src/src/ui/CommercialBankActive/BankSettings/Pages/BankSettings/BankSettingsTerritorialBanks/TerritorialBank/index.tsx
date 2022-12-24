import React, {useState} from 'react';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import {Button} from '../../../../../../Common/SimpleComponents/Button';
import useViewModel from '../../../../../../hooks/useViewModel';
import {IBankSettingsViewModel} from '../../../../../../../ViewModel/viewModels/Banks';
import {VIEW_MODEL} from '../../../../../../../ViewModel/identifiers';
import {observer} from 'mobx-react-lite';
import {LoaderWithBackdrop} from '../../../../../../Common/SimpleComponents/LoaderWithBackdrop';
import {TerritorialBankForm} from '../TerritorialBankForm';
import {FormProvider, useForm} from 'react-hook-form';
import {ConfirmDialog} from '../../../../../../Components/Dialogs/ConfirmDialog';
import {DialogAssignUsersToBank} from '../../../../../../Components/Dialogs/BankSettings/DialogAssignUsersToBank';
import {IDictionaryTerritorialBankExtendedDTO} from '../../../../../../../Model/Dictionary';
import './index.less';

export interface ITerritorialBankProps {
  data: IDictionaryTerritorialBankExtendedDTO;
}

export const TerritorialBank = observer((props: ITerritorialBankProps) => {
  const {data} = props;
  const [collapsed, setCollapsed] = useState<boolean>(!data.isNew);
  const cls = ['territorial-bank'];
  if (collapsed) cls.push('territorial-bank_collapsed');

  const {
    territorialBankCancel,
    territorialBankSave,
    territorialBankDelete,
    territorialBankSetIsDirty,
    getUsers,
    users,
    updateUsers,
  } = useViewModel<IBankSettingsViewModel>(VIEW_MODEL.BankSettings);

  const formSaveMethods = useForm<IDictionaryTerritorialBankExtendedDTO>({
    defaultValues: {},
    mode: 'onChange',
  });
  const onSave = async () => {
    await formSaveMethods.trigger();
    if (data.isValid && data.isDirty) {
      await territorialBankSave(data.id);
      territorialBankSetIsDirty(data.id, false);
    }
  };
  const onCancel = () => {
    territorialBankCancel(data.id);
  };

  const onDeleteOpen = () => {
    setModalDelete(true);
  };
  const onDeleteGetUsers = async () => {
    const users = await getUsers(data.id);
    if (users) {
      setModalAssign(true);
    } else {
      await onDelete();
    }
  };
  const onDelete = async () => {
    await territorialBankDelete(data.id);
  };
  const onDeleteClose = () => {
    setModalDelete(false);
  };

  const formUsersMethods = useForm<IDictionaryTerritorialBankExtendedDTO>({
    defaultValues: {},
    mode: 'onChange',
  });
  const onAssignUsers = async () => {
    await updateUsers(users);
    onAssignClose();
    await onDelete();
  };
  const onAssignClose = () => {
    setModalAssign(false);
  };

  const title = data.isNew ? (
    <div className="territorial-bank__name_no-data">Новый банк</div>
  ) : data.shortName && data.fullName ? (
    `${data.shortName} - ${data.fullName}`
  ) : data.shortName ? (
    data.shortName
  ) : data.fullName ? (
    data.fullName
  ) : (
    <div className="territorial-bank__name_no-data">Не указано</div>
  );

  const [modalDelete, setModalDelete] = useState<boolean>(false);
  const [modalAssign, setModalAssign] = useState<boolean>(false);

  return (
    <div className={cls.join(' ')}>
      <LoaderWithBackdrop loading={data.isLoading} />
      <div className="territorial-bank__header">
        <div className="territorial-bank__name">{title}</div>
        <div className="territorial-bank__collapse">
          {collapsed ? (
            <AddCircleIcon onClick={() => setCollapsed(false)} />
          ) : (
            <RemoveCircleIcon onClick={() => setCollapsed(true)} />
          )}
        </div>
      </div>
      <div className="territorial-bank__content">
        <FormProvider {...formSaveMethods}>
          <TerritorialBankForm data={data} />
        </FormProvider>
        <div className="territorial-bank__buttons">
          <Button
            variant="contained"
            color="blue"
            onClick={onSave}
            disabled={!data.isDirty}
          >
            Сохранить
          </Button>
          {data.isNew ? (
            <Button variant="text" color="red" onClick={onCancel}>
              Отменить
            </Button>
          ) : (
            <Button variant="text" color="red" onClick={onDeleteOpen}>
              Удалить банк
            </Button>
          )}
        </div>
      </div>
      <ConfirmDialog
        isOpen={modalDelete}
        onClose={onDeleteClose}
        title="Уверены что хотите удалить ТБ?"
        text="Это действие отменить невозможно"
        buttons={[
          {
            children: 'Удалить',
            variant: 'outlined',
            color: 'red',
            onClick: onDeleteGetUsers,
          },
          {
            children: 'Не удалять',
            variant: 'outlined',
            color: 'default',
          },
        ]}
      />
      <FormProvider {...formUsersMethods}>
        <DialogAssignUsersToBank
          isOpen={modalAssign}
          onClose={onAssignClose}
          buttons={[
            {
              children: 'Сохранить',
              variant: 'contained',
              color: 'blue',
              onClick: formUsersMethods.handleSubmit(onAssignUsers),
            },
          ]}
        />
      </FormProvider>
    </div>
  );
});
