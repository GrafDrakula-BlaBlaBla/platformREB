import React, {FC} from 'react';
import {useFormContext} from 'react-hook-form';
import {
  PasswordFieldControlUseForm,
  PhoneFieldControlUseForm,
  TextFieldControlUseForm,
} from '../../../../Common/FieldControls';
import {Form, FormField, FormSection} from '../../../../Common/FormComponents';
import {Information} from '../../../../Common/SimpleComponents/Information';
import {STEP} from '../../../../PreLoginZone/Registration';
import {observer} from 'mobx-react-lite';
import {ReactComponent as SuccessIcon} from '../../../../../assets/svg/commonArea/Success.svg';
import {Notify, NOTIFY_TYPE} from '../../../../Common/SimpleComponents/Notify';
import {ReactComponent as InformationIcon} from '../../../../../assets/svg/commonArea/Substraction.svg';
import './index.less';

interface IProps {
  step: number;
}

export const RegistrationForm: FC<IProps> = observer(({step}) => {
  const isEdit = true;

  const {getValues} = useFormContext();
  return (
    <Form className="profile-form">
      <FormSection title="1. Информация о банке">
        <FormField title="Наименование банка">
          <TextFieldControlUseForm
            disabled
            className="profile-form__input_big"
            name="bankName"
            isEdit={isEdit}
            rules={{required: 'Поле обязательно для заполнения'}}
          />
        </FormField>
        <FormField title="Юридический адрес">
          <TextFieldControlUseForm
            disabled
            className="profile-form__input_big"
            name="legalAddress"
            isEdit={isEdit}
            rules={{required: 'Поле обязательно для заполнения'}}
          />
        </FormField>
        <FormField title="БИК">
          <TextFieldControlUseForm
            disabled
            className="profile-form__input_little"
            name="bic"
            isEdit={isEdit}
            rules={{required: 'Поле обязательно для заполнения'}}
          />
        </FormField>
        <FormField title="Корреспондентский счёт">
          <TextFieldControlUseForm
            disabled
            className="profile-form__input_little"
            name="correspondentAcc"
            isEdit={isEdit}
            rules={{required: 'Поле обязательно для заполнения'}}
          />
        </FormField>
      </FormSection>
      <FormSection title="2. Информация о пользователе">
        <FormField title="ФИО">
          <TextFieldControlUseForm
            name="surname"
            className="profile-form__input_big"
            isEdit={isEdit}
            placeholder="Введите фамилию"
            rules={{required: 'Поле обязательно для заполнения'}}
          />
          <TextFieldControlUseForm
            name="name"
            className="profile-form__input_big"
            isEdit={isEdit}
            placeholder="Введите имя"
            rules={{required: 'Поле обязательно для заполнения'}}
          />
          <TextFieldControlUseForm
            name="patronymic"
            className="profile-form__input_big"
            isEdit={isEdit}
            placeholder="Введите отчество"
          />
        </FormField>
        <FormField title="Корпоративная электронная почта">
          <TextFieldControlUseForm
            name="email"
            className="profile-form__input_big"
            isEdit={isEdit}
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
          <div className="profile-form__phone">
            <PhoneFieldControlUseForm
              name="phoneNumber"
              className="profile-form__input_little"
              isEdit={isEdit}
              placeholder="Введите телефон"
              rules={{required: 'Поле обязательно для заполнения'}}
            />
            {step === STEP.THREE ? (
              <SuccessIcon className="success-icon" />
            ) : null}
          </div>
          {step !== STEP.THREE ? (
            <Notify
              type={NOTIFY_TYPE.warning}
              icon={<InformationIcon />}
              text="На указанный номер телефона будет отправлено СМС-сообщение с кодом для аутентификации пользователя"
            />
          ) : null}
        </FormField>
      </FormSection>
      {step === STEP.THREE ? (
        <FormSection title="3. Учетная запись">
          <FormField title="Логин">
            <TextFieldControlUseForm
              name="email"
              className="profile-form__input_big"
              disabled
              isEdit={isEdit}
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
            <Information text="Логином является корпоративная электронная почта" />
          </FormField>
          <FormField title="Пароль">
            <PasswordFieldControlUseForm
              name="password"
              className="profile-form__input_big"
              isEdit={isEdit}
              placeholder="Придумайте новый пароль"
              shouldValidate={true}
              rules={{
                required: 'Поле обязательно для заполнения',
              }}
            />
            <PasswordFieldControlUseForm
              name="passwordEqual"
              className="profile-form__input_big"
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
            <Information text="Пароль должен содержать не менее 8-ми знаков, включать буквы, цифры и специальные символы" />
          </FormField>
        </FormSection>
      ) : null}
    </Form>
  );
});
