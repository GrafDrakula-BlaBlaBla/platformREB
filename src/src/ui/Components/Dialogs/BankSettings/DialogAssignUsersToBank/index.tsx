import React, {useState} from 'react';
import {ModalPage} from '../../../../Common/SimpleComponents/ModalPage';
import {IButtonProps} from '../../../../Common/SimpleComponents/Button';
import {LoaderWithBackdrop} from '../../../../Common/SimpleComponents/LoaderWithBackdrop';
import {observer} from 'mobx-react-lite';
import useViewModel from '../../../../hooks/useViewModel';
import {IBankSettingsViewModel} from '../../../../../ViewModel/viewModels/Banks';
import {VIEW_MODEL} from '../../../../../ViewModel/identifiers';
import DeleteIcon from '@material-ui/icons/Delete';
import {
  SelectFieldControl,
  SelectFieldControlUseForm,
} from '../../../../Common/FieldControls';
import {useFormContext} from 'react-hook-form';
import {ConfirmDialog} from '../../ConfirmDialog';
import './index.less';

interface IDialogAssignUsersToBankProps {
  isOpen: boolean;
  onClose: () => void;
  buttons?: IButtonProps[];
}

export const DialogAssignUsersToBank = observer(
  (props: IDialogAssignUsersToBankProps) => {
    const {isOpen, onClose, buttons} = props;

    const {
      loadingUsers,
      users,
      territorialBanksSelect,
      updateUserBank,
      removeUser,
    } = useViewModel<IBankSettingsViewModel>(VIEW_MODEL.BankSettings);

    const {setValue, reset, getValues} = useFormContext();
    const [selectAllValue, setSelectAllValue] = useState<unknown>();
    const resetForm = () => {
      const values = getValues();
      for (let key in values) {
        if (values.hasOwnProperty(key)) values[key] = '';
      }
      reset(values);
    };
    const onChangeAll = (
      e: React.ChangeEvent<{name?: string; value: unknown}>
    ) => {
      const bankId = e.target.value as string;
      users?.forEach((user) => {
        setValue(user.id, bankId);
        updateUserBank(user.id, bankId);
      });
      setSelectAllValue(bankId);
    };
    const onChangeBank = (
      e: React.ChangeEvent<{name?: string; value: unknown}>
    ) => {
      const userId = e.target.name as string;
      const bankId = e.target.value as string;
      updateUserBank(userId, bankId);
      setSelectAllValue('');
    };

    const [deleteUserId, setDeleteUserId] = useState<string>('');
    const [modalDelete, setModalDelete] = useState<boolean>(false);
    const onDeleteOpen = (userId: string) => {
      setDeleteUserId(userId);
      setModalDelete(true);
    };
    const onDeleteClose = () => {
      setDeleteUserId('');
      setModalDelete(false);
    };
    const onDelete = async () => {
      await removeUser(deleteUserId);
    };

    return (
      <ModalPage
        className="dialog-assign-users-to-bank"
        isOpen={isOpen}
        onClose={() => {
          onClose();
          setSelectAllValue('');
          resetForm();
        }}
        header={{title: 'Назначить ТБ для пользователей'}}
        footerButtonConfig={buttons}
      >
        <LoaderWithBackdrop loading={loadingUsers} />
        <div className="dialog-assign-users-to-bank__row">
          <div className="dialog-assign-users-to-bank__left">
            <div className="dialog-assign-users-to-bank__fio dialog-assign-users-to-bank__fio_bold">
              Все пользователи ТБ
            </div>
          </div>
          <div className="dialog-assign-users-to-bank__right">
            <SelectFieldControl
              name="selectAll"
              value={selectAllValue}
              displayEmpty={true}
              items={territorialBanksSelect}
              onChange={onChangeAll}
            />
          </div>
        </div>
        {users?.map((user) => (
          <div className="dialog-assign-users-to-bank__row" key={user.id}>
            <div className="dialog-assign-users-to-bank__left">
              <div className="dialog-assign-users-to-bank__fio">{user.FIO}</div>
              <div className="dialog-assign-users-to-bank__email">
                {user.email}
              </div>
            </div>
            <div className="dialog-assign-users-to-bank__right">
              <SelectFieldControlUseForm
                name={user.id}
                displayEmpty={true}
                rules={{required: true}}
                items={territorialBanksSelect}
                onChange={onChangeBank}
              />
              <div className="dialog-assign-users-to-bank__remove">
                <DeleteIcon onClick={() => onDeleteOpen(user.id)} />
              </div>
            </div>
          </div>
        ))}
        <ConfirmDialog
          isOpen={modalDelete}
          onClose={onDeleteClose}
          title="Уверены что хотите удалить пользователя?"
          text="Это действие отменить невозможно"
          buttons={[
            {
              children: 'Удалить',
              variant: 'outlined',
              color: 'red',
              onClick: onDelete,
            },
            {
              children: 'Не удалять',
              variant: 'outlined',
              color: 'default',
            },
          ]}
        />
      </ModalPage>
    );
  }
);
