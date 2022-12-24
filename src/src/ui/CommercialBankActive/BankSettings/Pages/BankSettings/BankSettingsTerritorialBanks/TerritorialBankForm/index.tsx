import React, {ChangeEvent, useEffect} from 'react';
import {TextFieldControlUseForm} from '../../../../../../Common/FieldControls';
import useViewModel from '../../../../../../hooks/useViewModel';
import {IBankSettingsViewModel} from '../../../../../../../ViewModel/viewModels/Banks';
import {VIEW_MODEL} from '../../../../../../../ViewModel/identifiers';
import {observer} from 'mobx-react-lite';
import {
  IDictionaryTerritorialBankDTO,
  IDictionaryTerritorialBankExtendedDTO,
} from '../../../../../../../Model/Dictionary';
import {useFormContext} from 'react-hook-form';
import useUpdateEffect from '../../../../../../hooks/useUpdateEffect';
import './index.less';

export interface ITerritorialBankFormProps {
  data: IDictionaryTerritorialBankExtendedDTO;
}

export const TerritorialBankForm = observer(
  (props: ITerritorialBankFormProps) => {
    const {data} = props;
    const cls = ['territorial-bank-form'];

    const {
      territorialBankSetIsDirty,
      territorialBankSetIsValid,
      territorialBankSetField,
    } = useViewModel<IBankSettingsViewModel>(VIEW_MODEL.BankSettings);

    const {
      reset,
      formState: {isValid},
    } = useFormContext();

    const onChangeTextField = (e: ChangeEvent<HTMLInputElement>) => {
      const name = e.target.name as keyof IDictionaryTerritorialBankDTO;
      const value = e.target.value;
      territorialBankSetField(data.id, name, value);
      territorialBankSetIsDirty(data.id, true);
    };

    useUpdateEffect(() => {
      territorialBankSetIsValid(data.id, isValid);
    }, [isValid]);

    useEffect(() => {
      reset(data);
      return () => reset();
    }, [reset, data]);

    return (
      <div className={cls.join(' ')}>
        <div className="territorial-bank-form__field">
          <div className="territorial-bank-form__field-title">
            <div className="territorial-bank-form__field-title_bold">
              Сокращение
            </div>
          </div>
          <div className="territorial-bank-form__field-input">
            <TextFieldControlUseForm
              name="shortName"
              rules={{required: true}}
              onChange={onChangeTextField}
            />
          </div>
        </div>
        <div className="territorial-bank-form__field">
          <div className="territorial-bank-form__field-title">
            <div className="territorial-bank-form__field-title_normal">
              Полное наименование
            </div>
            <div className="territorial-bank-form__field-title_light">
              (необязательно)
            </div>
          </div>
          <div className="territorial-bank-form__field-input">
            <TextFieldControlUseForm
              name="fullName"
              onChange={onChangeTextField}
            />
          </div>
        </div>
      </div>
    );
  }
);
