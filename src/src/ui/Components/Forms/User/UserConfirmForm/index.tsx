import React, {useEffect} from 'react';
import {observer} from 'mobx-react-lite';
import {useFormContext} from 'react-hook-form';
import useViewModel from '../../../../hooks/useViewModel';
import {Form, FormSection, FormField} from '../../../../Common/FormComponents';
import {PasswordFieldControlUseForm} from '../../../../Common/FieldControls';
import {IUserConfirmInformation, IUserDTO} from '../../../../../Model/User';
import {getDefaultFormValues} from '../../index';
import {VIEW_MODEL} from '../../../../../ViewModel/identifiers';
import {IUserViewModel} from '../../../../../ViewModel/viewModels/User/interfaces';
import './index.less';

interface IUserConfirmFormProps {
  isEdit?: boolean;
}

export const userConfirmFormDefaultValues: Partial<IUserConfirmInformation> = {
  password: '',
  passwordEqual: '',
};

export const UserConfirmForm = observer(({isEdit}: IUserConfirmFormProps) => {
  const viewModel = useViewModel<IUserViewModel>(VIEW_MODEL.User);

  const {reset, getValues} = useFormContext();

  useEffect(() => {
    const values = getDefaultFormValues<IUserDTO>(
      viewModel.data,
      userConfirmFormDefaultValues
    );
    reset(values);
  }, [viewModel.data, reset]);

  useEffect(() => {
    return () => {
      reset(userConfirmFormDefaultValues);
    };
  }, [reset]);

  return (
    <Form className="user-confirm-form">
      <FormSection>
        <FormField title="Пароль">
          <PasswordFieldControlUseForm
            name="password"
            isEdit={isEdit}
            placeholder="Придумайте новый пароль"
            shouldValidate={true}
            rules={{
              required: 'Поле обязательно для заполнения',
            }}
          />
          <PasswordFieldControlUseForm
            name="passwordEqual"
            isEdit={isEdit}
            placeholder="Повторите пароль"
            rules={{
              required: 'Поле обязательно для заполнения',
              validate: {
                passwordEqual: (value) =>
                  value === getValues().password || 'Пароли не совпадают',
              },
            }}
          />
        </FormField>
      </FormSection>
    </Form>
  );
});
