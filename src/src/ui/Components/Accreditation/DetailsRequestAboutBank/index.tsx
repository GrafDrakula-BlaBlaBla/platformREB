import React from 'react';
import {FormField, FormSection} from '../../../Common/FormComponents';
import {TextFieldControlView} from '../../../Common/FieldControls';
import {IAccreditationDTO} from '../../../../Model/Accreditation';

interface IDetailsRequestAboutBankProps {
  item?: IAccreditationDTO;
}
export const DetailsRequestAboutBank = ({
  item,
}: IDetailsRequestAboutBankProps) => {
  return (
    <FormSection title="1. Информация о банке">
      <FormField title="Наименование банка">
        <TextFieldControlView value={item?.bankName} />
      </FormField>
      <FormField title="БИК">
        <TextFieldControlView value={item?.bic} />
      </FormField>
      <FormField title="Корреспондентский счет">
        <TextFieldControlView value={item?.correspondentAcc} />
      </FormField>
      <FormField title="Юридический адрес">
        <TextFieldControlView value={item?.legalAddress} />
      </FormField>
    </FormSection>
  );
};
