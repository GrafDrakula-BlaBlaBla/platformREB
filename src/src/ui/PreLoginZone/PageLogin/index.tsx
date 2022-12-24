import React from 'react';
import {observer} from 'mobx-react-lite';
import {FieldValues, useForm, FormProvider} from 'react-hook-form';
import useViewModel from '../../hooks/useViewModel';
import useOnEnter from '../../hooks/useOnEnter';
import {IUserDTO} from '../../../Model/User';
import {
  PageAuthLicence,
  PageAuthLayout,
  PageAuthSubmit,
} from '../../Common/PageAuthLayout';
import {
  UserLoginForm,
  userLoginFormDefaultValues,
} from '../../Components/Forms/User/UserLoginForm';
import {VIEW_MODEL} from '../../../ViewModel/identifiers';
import {IUserViewModel} from '../../../ViewModel/viewModels/User/interfaces';
import {IAppViewModel} from '../../../ViewModel/viewModels/App/interfaces';
import './index.less';

export const PageLogin = observer(() => {
  const user = useViewModel<IUserViewModel>(VIEW_MODEL.User);
  const app = useViewModel<IAppViewModel>(VIEW_MODEL.App);

  const methods = useForm<FieldValues>({
    defaultValues: userLoginFormDefaultValues,
    mode: 'onChange',
  });

  const onSubmit = async (data: IUserDTO) => {
    console.log(data);
  };

  useOnEnter(() => {
    methods.handleSubmit(onSubmit)();
  }, []);

  return (
    <PageAuthLayout
      loading={user.loading || app.loading}
      className="page-login"
    >
      <FormProvider {...methods}>
        <UserLoginForm isEdit={true} />
      </FormProvider>
      <PageAuthSubmit label="Войти" onSubmit={methods.handleSubmit(onSubmit)} />
      <PageAuthLicence label="Войти" />
    </PageAuthLayout>
  );
});
