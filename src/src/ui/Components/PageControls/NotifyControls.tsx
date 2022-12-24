import React from 'react';
import {FormField, FormSection} from '../../Common/FormComponents';
import {Notify, NOTIFY_TYPE} from '../../Common/SimpleComponents/Notify';

export const NotifyControls = () => {
  return (
    <FormSection title="Notify">
      <FormField
        title="1. NotifyControls. Error"
        info="Зависит от @material-ui/icons"
      >
        <Notify
          type={NOTIFY_TYPE.error}
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        />
      </FormField>
      <FormField
        title="1. NotifyControls. Warning"
        info="Зависит от @material-ui/icons"
      >
        <Notify
          type={NOTIFY_TYPE.warning}
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        />
      </FormField>
      <FormField
        title="1. NotifyControls. Success"
        info="Зависит от @material-ui/icons"
      >
        <Notify
          type={NOTIFY_TYPE.success}
          text="lorem"
          isExpanded={false}
          textExpanded="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        />
      </FormField>
    </FormSection>
  );
};
