import React from 'react';
import {Form, FormField, FormSection} from '../../../../Common/FormComponents';
import {Button} from '../../../../Common/SimpleComponents/Button';
import './index.less';

export const UserSMSCodeNotReceive = () => {
  return (
    <Form className="user-sms-code-not-receive">
      <FormSection className="user-sms-code-not-receive__section1">
        <FormField>
          <div className="user-sms-code-not-receive__item">1</div>
          Убедитесь что вы ввели телефон правильно, находитесь в сети и
          запросите новый одноразовый пароль.
        </FormField>
        <FormField>
          <div className="user-sms-code-not-receive__item">2</div>
          Обратитесь в техническую поддержку оператора или запросите новый
          одноразовый пароль позже.
        </FormField>
      </FormSection>
      <FormSection className="user-sms-code-not-receive__section2">
        <Button variant="outlined" color="default">
          Написать в техподдежку
        </Button>
        <div className="user-sms-code-not-receive__support">
          <div className="user-sms-code-not-receive__support-phone">
            8 800 555 63 36
          </div>
          <div className="user-sms-code-not-receive__support-sheduler">
            Пн - Сб с 00:00 до 20:00 по МСК
          </div>
        </div>
      </FormSection>
      <FormSection className="user-sms-code-not-receive__section3">
        <div className="link">Войти заново</div>
      </FormSection>
    </Form>
  );
};
