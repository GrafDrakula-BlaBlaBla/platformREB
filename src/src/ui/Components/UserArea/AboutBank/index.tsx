import React from 'react';
import {observer} from 'mobx-react-lite';
import useViewModel from '../../../hooks/useViewModel';
import {Loader} from '../../../Common/SimpleComponents/Loader';
import {Form, FormField, FormSection} from '../../../Common/FormComponents';
import {
  PhoneFieldControlView,
  TextFieldControlView,
} from '../../../Common/FieldControls';
import {VIEW_MODEL} from '../../../../ViewModel/identifiers';
import {IBankViewModel} from '../../../../ViewModel/viewModels/Banks';
import {getFullFIO} from '../../../../Model/User/functions';
import {Divider} from '../../../Common/SimpleComponents/Divider';
import {NoData} from '../../../Common/SimpleComponents/NoData';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import './index.less';

export const AboutBank = observer(() => {
  const {currentBank, bankAdmins, loading} = useViewModel<IBankViewModel>(
    VIEW_MODEL.Banks
  );

  return loading ? (
    <Loader />
  ) : (
    <Form className="about-bank">
      <FormSection title="1. Общая информация">
        <FormField title="Наименование банка">
          <TextFieldControlView value={currentBank?.bankName} />
        </FormField>
        <FormField title="Юридический адрес">
          <TextFieldControlView value={currentBank?.legalAddress} />
        </FormField>
        <FormField title="БИК">
          <TextFieldControlView value={currentBank?.bic} />
        </FormField>
        <FormField title="Корреспондентский счет">
          <TextFieldControlView value={currentBank?.correspondentAcc} />
        </FormField>
      </FormSection>
      <Divider />
      <FormSection title="2. Информация об администраторах">
        {bankAdmins ? (
          bankAdmins.map(
            ({surname, name, patronymic, email, phoneNumber}, index) => (
              <FormField
                key={index}
                title={getFullFIO(surname, name, patronymic)}
              >
                <a href={`mailto:${email}`}>{email}</a>
                <PhoneFieldControlView value={phoneNumber} />
              </FormField>
            )
          )
        ) : (
          <NoData icon={<PeopleAltIcon />} />
        )}
      </FormSection>
    </Form>
  );
});
