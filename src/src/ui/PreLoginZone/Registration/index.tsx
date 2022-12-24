import React, {useState} from 'react';
import useUpdateEffect from '../../hooks/useUpdateEffect';
import useViewModel from '../../hooks/useViewModel';
import {observer} from 'mobx-react-lite';
import {FormProvider, useForm} from 'react-hook-form';
import {IUserDTO, IUserRegDTO} from '../../../Model/User';
import {PageLayout} from '../../Common/PageLayout';
import {Button} from '../../Common/SimpleComponents/Button';
import {RegistrationForm} from '../../Components/Forms';
import {PreLoginLayout} from '../../Common/PreLoginLayout';
import {DialogSMSCodeConfirm} from '../../Components/Dialogs/DialogSMSCodeConfirm';
import {SStorage} from '../../../Utils/Storage';
import {useRouter} from 'react-router5';
import {LoaderWithBackdrop} from '../../Common/SimpleComponents/LoaderWithBackdrop';
import useOnEnter from '../../hooks/useOnEnter';
import {PageAuthLicence} from '../../Common/PageAuthLayout';
import {VIEW_MODEL} from '../../../ViewModel/identifiers';
import {IBankViewModel} from '../../../ViewModel/viewModels/Banks';
import {IUserViewModel} from '../../../ViewModel/viewModels/User/interfaces';
import {IBankDTO} from '../../../Model/Banks';
import useRouterConst from '../../hooks/useRouterConst';
import './index.less';

type FormType = Partial<IBankDTO> & Partial<IUserDTO> & {passwordEqual: string};

export enum STEP {
  ONE,
  TWO,
  THREE,
}

export const Registration = observer(() => {
  const router = useRouter();
  const ROUTER_CONST = useRouterConst();

  if (!SStorage?.registration?.bic) {
    /* если в sessionStorage нет bic посылаем пользователя на страницу с вводом bic */
    router.navigate(ROUTER_CONST.BIC.name);
  }

  const {bankInfo, loading} = useViewModel<IBankViewModel>(VIEW_MODEL.Banks);
  const {regUser} = useViewModel<IUserViewModel>(VIEW_MODEL.User);

  const [step, setStep] = useState(STEP.ONE);

  const methods = useForm<FormType>({
    mode: 'onChange',
  });

  useUpdateEffect(() => {
    methods.reset(bankInfo);
  }, [bankInfo]);

  const onSubmitStep3 = async (data: FormType) => {
    regUser(data as IUserRegDTO).then((result) => {
      if (result) {
        /* после регистрации перенаправляем на главную где кнопка "Личный кабинет" */
        router.navigate(ROUTER_CONST.HOME.name);
      } else {
        //@todo: обработка ошибки регистрации
      }
    });
  };

  const onSubmitStep1 = async (data: FormType) => {
    //@todo: высылаем СМС
    setStep(STEP.TWO);
  };

  const chooseSubmit = (step: STEP) => {
    return methods.handleSubmit(
      step === STEP.THREE ? onSubmitStep3 : onSubmitStep1
    );
  };

  //@todo: выпилить как подключим бэк
  const [ldng, setLdng] = useState(false);

  const phoneConfirm = {
    onClose: () => setStep(STEP.ONE),
    onValidate: async (code: string) => {
      //@todo: сверяем код с СМС
      if (code === '1234') {
        setLdng(true);
        return new Promise<boolean>((resolve) => {
          setTimeout(() => {
            setLdng(false);
            setStep(STEP.THREE);
            resolve(true);
          }, 1000);
        });
      }
      return new Promise<boolean>((resolve) => {
        setLdng(true);
        setTimeout(() => {
          setLdng(false);
          resolve(false);
        }, 1000);
      });
    },
  };

  useOnEnter(() => {
    chooseSubmit(step)();
  }, [step]);

  return (
    <PreLoginLayout className="registration">
      <PageLayout
        className="no-bottom-radius"
        title="Регистрация"
        footer={getFooter(step, chooseSubmit(step))}
      >
        <LoaderWithBackdrop loading={loading} />
        <FormProvider {...methods}>
          <RegistrationForm step={step} />
        </FormProvider>
      </PageLayout>
      <DialogSMSCodeConfirm
        isLoading={ldng}
        isOpen={step === STEP.TWO}
        onClose={phoneConfirm.onClose}
        onValidate={phoneConfirm.onValidate}
      />
    </PreLoginLayout>
  );
});

const getFooter = (step: STEP, onClick: () => void) => {
  const label = step === STEP.THREE ? 'Зарегистрироваться' : 'Продолжить';
  return {
    titleText: <PageAuthLicence label={label} />,
    buttonsGroup: <Button onClick={onClick}>{label}</Button>,
  };
};
