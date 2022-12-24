import React, {useContext} from 'react';
import {observer} from 'mobx-react-lite';
import useViewModel from '../../../../hooks/useViewModel';
import {Form, FormSection, FormField} from '../../../../Common/FormComponents';
import {
  PhoneFieldControlView,
  SelectFieldControlView,
  TextFieldControlView,
} from '../../../../Common/FieldControls';
import {IUserDTO} from '../../../../../Model/User';
import {RoleContext} from '../../../../app/contexts/RoleContext';
import {VIEW_MODEL} from '../../../../../ViewModel/identifiers';
import {IUserViewModel} from '../../../../../ViewModel/viewModels/User/interfaces';
import {getFIO} from '../../../../../Model/User/functions';
import './index.less';

export const UserProfileViewForm = observer(() => {
  const viewModel = useViewModel<IUserViewModel>(VIEW_MODEL.User);

  const roles = useContext(RoleContext);

  const RoleSelectList = Object.keys(roles).map((value) => {
    const label = roles[value as keyof typeof roles];
    return {
      label,
      value,
    };
  });

  return (
    <Form className="user-profile-view-form">
      <FormSection>
        <FormField title="ФИО">
          <TextFieldControlView
            value={getFIO(viewModel.currentUser as IUserDTO)}
          />
        </FormField>
        <FormField title="Почта">
          <TextFieldControlView value={viewModel.currentUser?.email} />
        </FormField>
        <FormField title="Телефон">
          <PhoneFieldControlView
            value={viewModel.currentUser?.phoneNumber || undefined}
          />
        </FormField>
        <FormField
          title="Роль в системе"
          info="Описание ролей в системе находится в разделе «Инструкция пользователя»"
        >
          <SelectFieldControlView
            value={viewModel.currentUser?.role}
            items={RoleSelectList}
          />
        </FormField>
        {viewModel.currentUser?.tb && (
          <FormField title="ТБ">
            <TextFieldControlView value={viewModel.currentUser?.tb} />
          </FormField>
        )}
      </FormSection>
    </Form>
  );
});
