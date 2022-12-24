import React from 'react';
import {FormField, FormSection} from '../../../Common/FormComponents';
import {
  PhoneFieldControlView,
  TextFieldControlView,
} from '../../../Common/FieldControls';
import {IAccreditationDTO} from '../../../../Model/Accreditation';

interface IDetailsRequestAboutUserProps {
  item?: IAccreditationDTO;
}
export const DetailsRequestAboutUser = ({
  item,
}: IDetailsRequestAboutUserProps) => {
  return (
    <FormSection title="2. Информация о сотруднике, ответственном за аккредитацию">
      <FormField title="Корпоративная электронная почта сотрудника">
        <TextFieldControlView value={item?.employeeEmail} />
      </FormField>
      <FormField title="Телефон сотрудника">
        <PhoneFieldControlView value={item?.employeePhone} />
      </FormField>
    </FormSection>
  );
};
