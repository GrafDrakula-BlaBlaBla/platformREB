import React, {useEffect, useState} from 'react';
import {useFormContext} from 'react-hook-form';
import {Form, FormSection, FormField} from '../../../../Common/FormComponents';
import {SMSCodeFieldControlUseForm} from '../../../../Common/FieldControls';
import {Timer} from '../../../../Common/SimpleComponents/Timer';
import {DialogSMSCodeNotReceive} from '../../../Dialogs/DialogSMSCodeNotReceive';
import './index.less';

export const UserSMSCodeConfirmDefaultValues = {
  code: '',
};
interface IUserSMSCodeConfirmProps {
  onValidate: (code: string) => Promise<boolean>;
}

export const UserSMSCodeConfirm = ({onValidate}: IUserSMSCodeConfirmProps) => {
  const {reset, setError, setValue, clearErrors} = useFormContext();
  const time = {min: 0, sec: 59};

  const [restart, setRestart] = useState<boolean>(false);
  const [isOpenNoSMS, setIsOpenNoSMS] = useState<boolean>(false);

  // eslint-disable-next-line
  useEffect(() => () => reset(UserSMSCodeConfirmDefaultValues), []);

  const handleClickNoSMS = () => {
    setIsOpenNoSMS(true);
  };

  const onClickStart = () => {
    clearErrors();
    setRestart(true);
    setTimeout(setRestart.bind(false), 0);
  };

  const onChange = (arr: string[], value: string) => {
    if (value.replaceAll('_', '').length === 4) {
      onValidate(value).then((isValid) => {
        if (!isValid) {
          setError('code', {message: 'Неверный код'});
        }
        setValue('code', UserSMSCodeConfirmDefaultValues.code);
      });
    }
  };

  return (
    <>
      <Form className="user-sms-code-confirm">
        <FormSection>
          <FormField title="Введите код, полученный в СМС-сообщении">
            <SMSCodeFieldControlUseForm
              name="code"
              onChange={onChange}
              focus={true}
            />
            <Timer
              min={time.min}
              sec={time.sec}
              restart={restart}
              format="Получить новый код можно через mm:ss"
              finishedComponent={
                <div className="link" onClick={onClickStart}>
                  Получить код повторно
                </div>
              }
            />
            <div className="link" onClick={handleClickNoSMS}>
              Не приходит СМС?
            </div>
          </FormField>
        </FormSection>
      </Form>
      <DialogSMSCodeNotReceive isOpen={isOpenNoSMS} onClose={setIsOpenNoSMS} />
    </>
  );
};
