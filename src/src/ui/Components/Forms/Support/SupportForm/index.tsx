import React, {useEffect} from 'react';
import {observer} from 'mobx-react-lite';
import {useFormContext} from 'react-hook-form';
import useViewModel from '../../../../hooks/useViewModel';
import {AttachmentFile} from '../../../../Common/Attachment';
import {IUserDTO} from '../../../../../Model/User';
import {Form, FormSection, FormField} from '../../../../Common/FormComponents';
import {
  PhoneFieldControlUseForm,
  TextFieldControlUseForm,
} from '../../../../Common/FieldControls';
import {VIEW_MODEL} from '../../../../../ViewModel/identifiers';
import {ISupportDTO} from '../../../../../Model/Support';
import {IUserViewModel} from '../../../../../ViewModel/viewModels/User/interfaces';
import {getFIO} from '../../../../../Model/User/functions';
import './index.less';

export const supportFormDefaultValues: ISupportDTO = {
  fio: '',
  email: '',
  phoneNumber: '',
  message: '',
};

export const SupportForm = observer(() => {
  // const viewModel = useViewModel<ISupportViewModel>(VIEW_MODEL.Support);
  const {currentUser} = useViewModel<IUserViewModel>(VIEW_MODEL.User);
  const {reset} = useFormContext();

  const getDefaultSupportFormValues = () => {
    return {
      ...supportFormDefaultValues,
      ...{
        fio: getFIO(currentUser as IUserDTO),
        email: currentUser?.email,
        phoneNumber: currentUser?.phoneNumber,
      },
    };
  };

  useEffect(() => {
    reset(getDefaultSupportFormValues());
    return () => {
      reset(supportFormDefaultValues);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <Form className="support-form">
      <FormSection>
        <FormField title="ФИО">
          <TextFieldControlUseForm
            name="fio"
            placeholder="Введите ваши фамилию, имя и отчество"
            rules={{required: 'Поле обязательно для заполнения'}}
          />
        </FormField>
        <FormField title="Почта">
          <TextFieldControlUseForm
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
        <FormField title="Контактный телефон">
          <PhoneFieldControlUseForm
            name="phoneNumber"
            rules={{required: 'Поле обязательно для заполнения'}}
          />
        </FormField>
        <FormField title="Текст сообщения">
          <TextFieldControlUseForm
            name="message"
            placeholder="Введите текст вашего комментария"
            rules={{required: 'Поле обязательно для заполнения'}}
            multiline
            rows={5}
          />
        </FormField>
        <FormField title="Добавить вложение">
          <AttachmentFile attachments={[]} />
        </FormField>
      </FormSection>
    </Form>
  );
});
