import React from 'react';
import {
  FieldValues,
  FormProvider,
  UnpackNestedValue,
  useForm,
} from 'react-hook-form';
import useOnEnter from '../../hooks/useOnEnter';
import {SStorage} from '../../../Utils/Storage';
import {useRouter} from 'react-router5';
import {ROUTER_CONST_PRE_LOGIN} from '../../app/settings/routerConst/RouterConstPreLogin';
import {BicForm} from '../../Components/Forms/Banks/BicForm/BicForm';
import {
  PageAuthLayout,
  PageAuthLicence,
  PageAuthSubmit,
} from '../../Common/PageAuthLayout';
import './index.less';
import Crutch from '../../../Utils/Crutch';

export const PageBic = () => {
  const router = useRouter();

  const methods = useForm<FieldValues>({
    mode: 'onChange',
    defaultValues: {
      canSubmitOnEnter: true,
    },
  });

  const onSubmit = async (value: UnpackNestedValue<FieldValues>) => {
    SStorage.registration = {bic: value.bic};
    router.navigate(ROUTER_CONST_PRE_LOGIN.PROFILE.name);
  };

  useOnEnter(() => {
    if (methods.getValues('canSubmitOnEnter')) methods.handleSubmit(onSubmit)();
    methods.setValue('canSubmitOnEnter', true);
  }, []);

  return (
    <PageAuthLayout className="page-bic">
      <FormProvider {...methods}>
        <BicForm />
      </FormProvider>
      <PageAuthSubmit
        label="Продолжить"
        onSubmit={methods.handleSubmit(onSubmit)}
      />
      <PageAuthLicence label="Продолжить" />
      <div className="page-bic__enter">
        У вас уже есть аккаунт?&nbsp;
        <span
          className="link"
          onClick={() => {
            window.location.replace(Crutch.getLoginURL());
          }}
        >
          Войти
        </span>
      </div>
    </PageAuthLayout>
  );
};
