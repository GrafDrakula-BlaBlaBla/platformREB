import React, {useEffect} from 'react';
import {observer} from 'mobx-react-lite';
import {useFormContext} from 'react-hook-form';
import useViewModel from '../../../../hooks/useViewModel';
import {Form, FormSection, FormField} from '../../../../Common/FormComponents';
import {getDefaultFormValues} from '../../index';
import {IUserDTO} from '../../../../../Model/User';
import {
  PasswordFieldControlUseForm,
  TextFieldControlUseForm,
} from '../../../../Common/FieldControls';
import {VIEW_MODEL} from '../../../../../ViewModel/identifiers';
import {IUserViewModel} from '../../../../../ViewModel/viewModels/User/interfaces';
import './index.less';

interface IUserLoginFormProps {
  isEdit?: boolean;
}

export const userLoginFormDefaultValues: Partial<IUserDTO> = {
  email: '',
  password: '',
};

export const UserLoginForm = observer(({isEdit}: IUserLoginFormProps) => {
  const viewModel = useViewModel<IUserViewModel>(VIEW_MODEL.User);

  const {reset} = useFormContext();

  useEffect(() => {
    const values = getDefaultFormValues<IUserDTO>(
      viewModel.data,
      userLoginFormDefaultValues
    );
    reset(values);
  }, [viewModel.data, reset]);

  useEffect(() => {
    return () => {
      reset(userLoginFormDefaultValues);
    };
  }, [reset]);

  return (
    <Form className="user-login-form">
      <FormSection title="Вход на платформу">
        <FormField title="Логин">
          <TextFieldControlUseForm
            name="email"
            isEdit={isEdit}
            placeholder="Введите логин"
            rules={{required: 'Поле обязательно для заполнения'}}
          />
        </FormField>
        <FormField title="Пароль">
          <PasswordFieldControlUseForm
            name="password"
            isEdit={isEdit}
            placeholder="Введите пароль"
            shouldValidate={true}
            rules={{
              required: 'Поле обязательно для заполнения',
            }}
          />
        </FormField>
      </FormSection>
    </Form>
  );
});
