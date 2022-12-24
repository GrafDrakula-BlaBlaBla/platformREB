import React, {ChangeEvent, useEffect} from 'react';
import {observer} from 'mobx-react-lite';
import {useFormContext} from 'react-hook-form';
import useViewModel from '../../../../hooks/useViewModel';
import {CBRoles, IUserDTO} from '../../../../../Model/User';
import {Form, FormSection, FormField} from '../../../../Common/FormComponents';
import {
  PhoneFieldControlUseForm,
  SelectFieldControlUseForm,
  TextFieldControlUseForm,
} from '../../../../Common/FieldControls';
import {getDefaultFormValues} from '../../index';
import {VIEW_MODEL} from '../../../../../ViewModel/identifiers';
import {IUserViewModel} from '../../../../../ViewModel/viewModels/User/interfaces';
import {IDictionaryViewModel} from '../../../../../ViewModel/viewModels/Dictionary/interfaces';
import './index.less';

interface IUserFormProps {
  isEdit?: boolean;
  isShowTerBank?: boolean;
  setIsShowTerBank: (show: boolean) => void;
}

export const userFormDefaultValues: Partial<IUserDTO> = {
  name: '',
  surname: '',
  patronymic: '',
  email: '',
  phoneNumber: '',
  role: '',
  tbId: null,
};

export const UserForm = observer(
  ({isEdit, isShowTerBank, setIsShowTerBank}: IUserFormProps) => {
    const {reset, setValue} = useFormContext();
    const {territorialBanks} = useViewModel<IDictionaryViewModel>(
      VIEW_MODEL.Dictionary
    );
    const {data, clearData, bankUserRoles} = useViewModel<IUserViewModel>(
      VIEW_MODEL.User
    );

    const roleSelectList = bankUserRoles.map((role) => {
      const {title, key} = role;
      return {
        label: title || key,
        value: key,
      };
    });
    const handleSelectROLE = (
      event: ChangeEvent<{name?: string; value: unknown}>
    ) => {
      const value = event.target.value;
      toggleTerBank(value as string);
    };

    const toggleTerBank = (value: string) => {
      switch (value) {
        case CBRoles.ROLE_CB_CONTROLLER:
        case CBRoles.ROLE_CB_ANALYST:
        case CBRoles.ROLE_CB_VIEWER:
          setIsShowTerBank(true);
          break;
        default:
          setIsShowTerBank(false);
          setValue('tbId', null);
          break;
      }
    };

    const territorialBanksSelect = territorialBanks?.map((territorialBank) => {
      return {
        label: territorialBank.shortName,
        value: territorialBank.id,
      };
    });

    useEffect(() => {
      const values = getDefaultFormValues<IUserDTO>(
        data,
        userFormDefaultValues
      );
      toggleTerBank(values.role as string);
      reset(values);
      // eslint-disable-next-line
    }, [data, reset]);

    useEffect(() => {
      return () => {
        clearData();
        reset(userFormDefaultValues);
      };
      // eslint-disable-next-line
    }, []);

    return (
      <Form className="user-form">
        <FormSection>
          <FormField title="ФИО">
            <TextFieldControlUseForm
              name="surname"
              placeholder="Введите фамилию"
              rules={{required: 'Поле обязательно для заполнения'}}
            />
            <TextFieldControlUseForm
              name="name"
              placeholder="Введите имя"
              rules={{required: 'Поле обязательно для заполнения'}}
            />
            <TextFieldControlUseForm
              name="patronymic"
              placeholder="Введите отчество"
            />
          </FormField>
          <FormField title="Email">
            <TextFieldControlUseForm
              name="email"
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
            <PhoneFieldControlUseForm
              name="phoneNumber"
              isEdit={isEdit}
              placeholder="Введите телефон"
              rules={{required: 'Поле обязательно для заполнения'}}
            />
          </FormField>
          <FormField
            title="Роль в системе"
            info="Описание ролей в системе находится в разделе «Инструкция пользователя»"
          >
            <SelectFieldControlUseForm
              name="role"
              isEdit={isEdit}
              rules={{required: 'Поле обязательно для заполнения'}}
              items={roleSelectList}
              onChange={handleSelectROLE}
            />
          </FormField>
          {isShowTerBank && (
            <FormField title="Территориальный банк">
              <SelectFieldControlUseForm
                name="tbId"
                isEdit={isEdit}
                rules={{
                  required: isShowTerBank
                    ? 'Поле обязательно для заполнения'
                    : false,
                }}
                items={territorialBanksSelect}
                onChange={(e) => {
                  setValue(e.target.name as string, e.target.value);
                }}
              />
            </FormField>
          )}
        </FormSection>
      </Form>
    );
  }
);
