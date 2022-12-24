import React, {useContext, useState} from 'react';
import {IButtonProps} from '../../../Common/SimpleComponents/Button';
import useViewModel from '../../../hooks/useViewModel';
import {CBRoles, IUserDTO, REBRoles} from '../../../../Model/User';
import {TypeToTableRowMap, Table} from '../../../Common/TableComponents';
import {UsersTableConfig} from '../Configs';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import {DialogConfirm} from '../../../Common/SimpleComponents/DialogConfirm';
import {FieldValues, FormProvider, useForm} from 'react-hook-form';
import {FormModal} from '../../../Common/FormComponents';
import {UserForm, userFormDefaultValues} from '../../Forms';
import {observer} from 'mobx-react-lite';
import {PermissionWrapper} from '../../PermissionWrapper';
import {useFilters} from '../../../hooks/useFilters';
import PermissionContext from '../../../app/contexts/PremissionContext';
import {DialogUserDeleteError} from '../../Dialogs/DialogUserDeleteError';
import {VIEW_MODEL} from '../../../../ViewModel/identifiers';
import {IUserViewModel} from '../../../../ViewModel/viewModels/User/interfaces';
import {PageLayout} from '../../../Common/PageLayout';
import {LoaderWithBackdrop} from '../../../Common/SimpleComponents/LoaderWithBackdrop';
import './index.less';

export const Users = observer(() => {
  const {isAccess} = useContext(PermissionContext);
  const {filters} = useFilters();

  const {
    data: user,
    users,
    currentUser,
    getUser,
    getUsers,
    deleteUser,
    loading,
    isUserLoading,
    setIsOpenCard,
    setIsEditAdmin,
  } = useViewModel<IUserViewModel>(VIEW_MODEL.User);
  const userViewModel = useViewModel<IUserViewModel>(VIEW_MODEL.User);

  const [isShowTerBank, setIsShowTerBank] = useState<boolean>(true);

  const [isOpenConfirm, setIsOpenConfirm] = useState(false);
  const onCloseConfirm = () => setIsOpenConfirm(false);

  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const onCloseAlert = () => setIsOpenAlert(false);

  const onAdd = () => {
    setIsEditAdmin(true);
    setIsOpenCard(true);
    setIsShowTerBank(false);
  };

  const onEdit = async (
    _: React.MouseEvent<Element, MouseEvent>,
    row: IUserDTO
  ) => {
    setIsEditAdmin(true);
    setIsShowTerBank(true);
    setIsOpenCard(true);
    await getUser(row.id);
  };

  const [idDelete, setIdDelete] = useState<string | undefined>();

  const onDelete = async (
    _: React.MouseEvent<Element, MouseEvent>,
    row: IUserDTO
  ) => {
    if (currentUser?.id === row.id) {
      setIsOpenAlert(true);
    } else {
      setIdDelete(row.id);
      setIsOpenConfirm(true);
    }
  };

  const methods = useForm<FieldValues>({
    defaultValues: userFormDefaultValues,
    mode: 'onChange',
  });

  const modalTitle = user
    ? `Учетная запись "${user?.email}"`
    : 'Учетная запись';

  const accessUserDelete = isAccess('users/{userId}', 'DELETE');
  const accessUserEdit = isAccess('users/{userId}', 'GET');
  const accessUserCreate = isAccess('users', 'POST');

  const tableActions: any =
    accessUserDelete || accessUserEdit
      ? {
          title: 'Действия',
          isActive: true,
        }
      : null;

  if (accessUserEdit) {
    tableActions.edit = onEdit;
  }
  if (accessUserDelete) {
    tableActions.delete = onDelete;
  }

  const tableEmptyInfo = {
    icon: <PeopleAltIcon className="no-user-icon" />,
    message: 'Нет информации по пользователям',
  };

  const dialogCancelOptions: IButtonProps = {
    children: 'Отмена',
    variant: 'outlined',
    color: 'default',
    onClick: () => setIdDelete(undefined),
  };
  const dialogConfirmOptions: IButtonProps = {
    children: 'Удалить',
    variant: 'contained',
    color: 'blue',
    onClick: async () => {
      if (idDelete) {
        await deleteUser(idDelete).then(() => getUsers(filters));
        setIdDelete(undefined);
      }
    },
  };

  const _users = TypeToTableRowMap(users, (_user) => {
    if (
      _user.role === REBRoles.ROLE_REB_ADMIN ||
      _user.role === CBRoles.ROLE_CB_ADMIN
    ) {
      _user.rowEdit = false;
      _user.rowDelete = false;
    } else {
      _user.rowEdit = true;
      _user.rowDelete = true;
    }
    return _user;
  });

  const buttons: IButtonProps[] = accessUserCreate
    ? [
        {
          children: 'Создать',
          onClick: onAdd,
        },
      ]
    : [];

  return (
    <PageLayout
      className="users"
      title="Пользователи"
      buttonGroupConfig={buttons}
      type="table"
    >
      <Table
        data={_users}
        config={UsersTableConfig}
        actions={tableActions}
        emptyInfo={tableEmptyInfo}
        className="users-table"
        loading={loading}
      />
      <PermissionWrapper permission="users" action="POST">
        <DialogConfirm
          open={isOpenConfirm}
          text="Удалить учетную запись?"
          cancel={dialogCancelOptions}
          confirm={dialogConfirmOptions}
          onClose={onCloseConfirm}
        />
        <DialogUserDeleteError isOpen={isOpenAlert} onClose={onCloseAlert} />
      </PermissionWrapper>
      <FormProvider {...methods}>
        <FormModal
          viewModel={userViewModel}
          title={modalTitle}
          className="users-modal"
          onBeforeSubmit={(data: IUserDTO) => {
            if (!data.id) {
              data.isReb = currentUser?.isReb;
              data.bankInfoId = currentUser?.bankInfoId;
              data.isActive = false;
            }
          }}
          onAfterSubmit={() => {
            getUsers(filters);
          }}
        >
          <>
            <LoaderWithBackdrop loading={isUserLoading} />
            <UserForm
              isEdit={true}
              isShowTerBank={isShowTerBank}
              setIsShowTerBank={setIsShowTerBank}
            />
          </>
        </FormModal>
      </FormProvider>
    </PageLayout>
  );
});
