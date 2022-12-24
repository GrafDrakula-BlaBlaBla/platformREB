import React, {useContext, useEffect} from 'react';
import {observer} from 'mobx-react-lite';
import {useFormContext} from 'react-hook-form';
import {Form, FormSection, FormField} from '../../../../Common/FormComponents';
import {
  PhoneFieldControlUseForm,
  SelectFieldControlUseForm,
  TextFieldControlUseForm,
} from '../../../../Common/FieldControls';
import {getDefaultFormValues} from '../../index';
import useViewModel from '../../../../hooks/useViewModel';
import {IUserDTO} from '../../../../../Model/User';
import {RoleContext} from '../../../../app/contexts/RoleContext';
import {VIEW_MODEL} from '../../../../../ViewModel/identifiers';
import {IUserViewModel} from '../../../../../ViewModel/viewModels/User/interfaces';
import './index.less';

export const userProfileFormDefaultValues: Partial<IUserDTO> = {
  name: '',
  surname: '',
  patronymic: '',
  email: '',
  phoneNumber: '',
  role: '',
};

/**
 * не используется
 * **/

export const UserProfileEditForm = observer(() => {
  const {currentUser} = useViewModel<IUserViewModel>(VIEW_MODEL.User);

  const roles = useContext(RoleContext);

  const RoleSelectList = Object.keys(roles).map((value) => {
    const label = roles[value as keyof typeof roles];
    return {
      label,
      value,
    };
  });

  const {reset} = useFormContext();

  useEffect(() => {
    const values = getDefaultFormValues<IUserDTO>(
      {...currentUser} as IUserDTO,
      userProfileFormDefaultValues
    );
    reset(values);
    // eslint-disable-next-line
  }, []);

  return (
    <Form className="user-profile-edit-form">
      <FormSection>
        <FormField title="ФИО">
          <TextFieldControlUseForm
            name="surname"
            placeholder="Введите фамилию"
            rules={{required: 'Поле обязательно для заполнения'}}
          />
          <TextFieldControlUseForm
            name="name"
            placeholder="Введите имя"
            rules={{required: 'Поле обязательно для заполнения'}}
          />
          <TextFieldControlUseForm
            name="patronymic"
            placeholder="Введите отчество"
          />
        </FormField>
        <FormField title="Почта">
          <TextFieldControlUseForm
            disabled
            name="email"
            placeholder="Введите адрес корпоративной электронной почты"
            rules={{
              required: 'Поле обязательно для заполнения',
              validate: {
                isValid: (value) => {
                  const emailRegExp = new RegExp(/.+@.+\..+/, 'i');
                  return emailRegExp.test(value) || 'Не верный формат почты';
                },
              },
            }}
          />
        </FormField>
        <FormField title="Телефон">
          <PhoneFieldControlUseForm
            disabled
            className="field-control_small"
            name="phoneNumber"
            placeholder="Введите телефон"
          />
        </FormField>
        <FormField
          title="Роль в системе"
          info="Описание ролей в системе находится в разделе «Инструкция пользователя»"
        >
          <SelectFieldControlUseForm
            disabled
            className="field-control_small"
            name="role"
            items={RoleSelectList}
          />
        </FormField>
      </FormSection>
    </Form>
  );
});
