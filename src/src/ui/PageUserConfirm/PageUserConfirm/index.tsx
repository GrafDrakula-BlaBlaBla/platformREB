import React from 'react';
import {observer} from 'mobx-react-lite';
import useViewModel from '../../hooks/useViewModel';
import useOnEnter from '../../hooks/useOnEnter';
import {useRouter} from 'react-router5';
import {
  UserConfirmForm,
  userConfirmFormDefaultValues,
} from '../../Components/Forms';
import {FieldValues, useForm, FormProvider} from 'react-hook-form';
import {IUserDTO} from '../../../Model/User';
import {
  PageAuthLayout,
  PageAuthLicence,
  PageAuthSubmit,
} from '../../Common/PageAuthLayout';
import {ROUTER_CONST_PUC} from '../../app/settings/routerConst/RouterConstPUC';
import {SStorage} from '../../../Utils/Storage';
import {VIEW_MODEL} from '../../../ViewModel/identifiers';
import {IUserViewModel} from '../../../ViewModel/viewModels/User/interfaces';
import {IAppViewModel} from '../../../ViewModel/viewModels/App/interfaces';
import './index.less';

export const PageUserConfirm = observer(() => {
  const user = useViewModel<IUserViewModel>(VIEW_MODEL.User);
  const app = useViewModel<IAppViewModel>(VIEW_MODEL.App);
  const router = useRouter();

  const methods = useForm<FieldValues>({
    defaultValues: userConfirmFormDefaultValues,
    mode: 'onChange',
  });

  const onSubmit = async (data: IUserDTO) => {
    const currentUser = await user.getCurrentUser();
    data.email = currentUser.email;
    user.setData(data);
    await user
      .saveData()
      .then(async () => {
        router.navigate(
          ROUTER_CONST_PUC.USER_AREA.name,
          {tab: 'instruction'},
          () => {
            SStorage.notification = {
              account: {
                title: 'Учетная запись активирована',
                text:
                  'Теперь вы можете работать с сервисами и услугами платформы',
                isError: false,
              },
            };
            window.location.reload();
          }
        );
      })
      .catch(() => {
        app.sendNotification({
          title: 'Возникла ошибка',
          text: 'Ошибка сервера',
          isError: true,
        });
      });
  };

  useOnEnter(() => {
    methods.handleSubmit(onSubmit)();
  }, []);

  return (
    <PageAuthLayout
      loading={user.loading || app.loading}
      className="page-user-confirm"
    >
      <FormProvider {...methods}>
        <UserConfirmForm isEdit={true} />
      </FormProvider>
      <PageAuthSubmit
        label="Подтвердить учетную запись"
        onSubmit={methods.handleSubmit(onSubmit)}
      />
      <PageAuthLicence label="Подтвердить учетную запись" />
    </PageAuthLayout>
  );
});
