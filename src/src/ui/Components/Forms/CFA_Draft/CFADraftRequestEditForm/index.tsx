import React, {ChangeEvent, useEffect} from 'react';
import {observer} from 'mobx-react-lite';
import {useFormContext} from 'react-hook-form';
import useViewModel from '../../../../hooks/useViewModel';
import {Form, FormField, FormSection} from '../../../../Common/FormComponents';
import {
  SelectFieldControlUseForm,
  TextFieldControlUseForm,
} from '../../../../Common/FieldControls';
import {getDefaultFormValues} from '../../index';
import {SelectItemsFromDictionary} from '../../../../Common/FieldControls/FieldControlsBase/SelectFieldControl/SelectItemsFromDictionary';
import {VIEW_MODEL} from '../../../../../ViewModel/identifiers';
import useUpdateEffect from '../../../../hooks/useUpdateEffect';
import {ICFADraftDTO} from '../../../../../Model/CFA_Draft';
import {ICFARequestDTO} from '../../../../../Model/CFA_Deal';
import {IDictionaryViewModel} from '../../../../../ViewModel/viewModels/Dictionary/interfaces';
import {ICFADraftComViewModel} from '../../../../../ViewModel/viewModels/CFA_Draft/draft/interfaces';
import './index.less';

// const FIELD_XS = 200;
const FIELD_SM = 270;
// const FIELD_MD = 300;
const FIELD_LG = 400;

interface ICFADraftRequestEditFormProps {
  isEdit?: boolean;
}

export const CFADraftRequestFormDefaultValues: ICFADraftDTO = {
  id: '',
  requestId: '',
  fullName: '',
  individualCategory: '',
  okved2: '',
  inn: '',
  status: '',
  tb: '',
};

export const CFADraftRequestEditForm = observer(
  (props: ICFADraftRequestEditFormProps) => {
    const {isEdit} = props;

    const {individualCategories, cfaStatuses} = useViewModel<
      IDictionaryViewModel
    >(VIEW_MODEL.Dictionary);

    const {data, setField, setIsValid, setIsDirty} = useViewModel<
      ICFADraftComViewModel
    >(VIEW_MODEL.CFADraft);

    /*
    const [financingType, setFinancingType] = useState<string | undefined>();
    const financingTypeItems = [
      {value: 'preExport', label: 'Предэкспорт'},
      {value: 'postExport', label: 'Постэкспорт'},
    ];
    const getFinancingTypeLabel = () => {
      return financingTypeItems.find((d) => d.value === financingType)?.label;
    };
    */

    const {
      reset,
      trigger,
      formState: {isValid, isDirty},
    } = useFormContext();

    useEffect(() => {
      const _data = {...data} as ICFADraftDTO;
      const values = getDefaultFormValues<ICFADraftDTO>(
        _data,
        CFADraftRequestFormDefaultValues
      );
      reset(values);
      setTimeout(trigger);
      // eslint-disable-next-line
    }, []);
    useEffect(() => {
      return () => {
        reset(CFADraftRequestFormDefaultValues);
      };
    }, [reset]);

    useUpdateEffect(() => {
      setIsValid(isValid);
    }, [isValid, setIsValid]);
    useUpdateEffect(() => {
      setIsDirty(isDirty);
    }, [isDirty, setIsDirty]);

    const onChangeTextField = (e: ChangeEvent<HTMLInputElement>) => {
      const name = e.target.name as keyof ICFARequestDTO;
      const value = e.target.value;
      setField(name, value);
      setIsDirty(true);
    };
    const onChangeSelectField = (
      e: ChangeEvent<{name?: string; value: unknown}>
    ) => {
      const name = e.target.name as keyof ICFARequestDTO;
      const value = e.target.value;
      setField(name, value as string);
      setIsDirty(true);
    };

    return (
      <Form className="cfa-draft-request-edit-form">
        <FormSection title="1. Общая информация" collapsible isOpen={true}>
          <FormField title="ID сделки">
            <TextFieldControlUseForm
              name="requestId"
              isEdit={isEdit}
              style={{width: FIELD_LG}}
              rules={{
                required: 'Поле обязательно для заполнения',
                validate: {
                  isValid: (value: any) => {
                    return (
                      !/[/\\|]+/.test(value) ||
                      'ID сдлеки не может содержать символы: /\\|'
                    );
                  },
                },
              }}
              placeholder="Введите ID сделки"
              onChange={onChangeTextField}
            />
          </FormField>
          <FormField title="Статус">
            <SelectFieldControlUseForm
              name="status"
              isEdit={isEdit}
              style={{width: FIELD_SM}}
              rules={{required: 'Поле обязательно для заполнения'}}
              placeholder="Выберите статус сделки"
              items={SelectItemsFromDictionary(cfaStatuses)}
              onChange={onChangeSelectField}
            />
          </FormField>
        </FormSection>
        <FormSection title="2. Заёмщик/приказодатель" collapsible isOpen={true}>
          <FormField title="Наименование">
            <TextFieldControlUseForm
              name="fullName"
              isEdit={isEdit}
              style={{width: FIELD_LG}}
              rules={{required: 'Поле обязательно для заполнения'}}
              placeholder="Введите наименование"
              onChange={onChangeTextField}
            />
          </FormField>
          <FormField title="ИНН">
            <TextFieldControlUseForm
              name="inn"
              isEdit={isEdit}
              style={{width: FIELD_SM}}
              inputProps={{maxLength: 12}}
              rules={{
                required: 'Поле обязательно для заполнения',
                pattern: {
                  value: /^(\d{10}|\d{12})$/,
                  message: 'Поле должно содержать 10 или 12 цифр',
                },
              }}
              placeholder="Введите ИНН"
              onChange={onChangeTextField}
            />
          </FormField>
          <FormField title="ОКВЕД 2">
            <TextFieldControlUseForm
              name="okved2"
              isEdit={isEdit}
              style={{width: FIELD_LG}}
              rules={{
                required: 'Поле обязательно для заполнения',
                pattern: {
                  value: /^(\d{2}(\.\d(\d(\.\d\d?)?)?)?)$/,
                  message: 'Не верный формат ОКВЕД 2',
                },
              }}
              onChange={onChangeTextField}
            />
          </FormField>
          <FormField title="Сегмент">
            <SelectFieldControlUseForm
              name="individualCategory"
              isEdit={isEdit}
              style={{width: FIELD_SM}}
              rules={{required: 'Поле обязательно для заполнения'}}
              placeholder="Выберите сегмент"
              items={SelectItemsFromDictionary(individualCategories)}
              onChange={onChangeSelectField}
            />
          </FormField>
          <FormField title="Субъект РФ">
            <TextFieldControlUseForm
              name="tb"
              isEdit={isEdit}
              style={{width: FIELD_LG}}
              rules={{required: 'Поле обязательно для заполнения'}}
              placeholder="Юр.адрес (Край, Город)"
              onChange={onChangeTextField}
            />
          </FormField>
        </FormSection>
        {/*<FormSection
          title="3. Покупатель"
          collapsible
          isOpen={true}
          info="Данные подтянутся автоматически, после заполнения вкладки «Экспортные контракты»"
        >
          <FormField title="Страна покупателя">
            <TextFieldControlUseForm
              disabled
              isEdit={isEdit}
              name="buyerCountry"
              style={{width: FIELD_LG}}
              placeholder="Введите название страны"
            />
          </FormField>

          <FormField title="Страна поставки">
            <TextFieldControlUseForm
              disabled
              isEdit={isEdit}
              name="deliveryCountry"
              style={{width: FIELD_LG}}
              placeholder="Введите название страны"
              onChange={onChangeTextField}
            />
          </FormField>
          <FormField title="Наименование компании покупателя">
            <TextFieldControlUseForm
              disabled
              isEdit={isEdit}
              name="buyerCompanyName"
              style={{width: FIELD_LG}}
              placeholder="Введите наименование"
              onChange={onChangeTextField}
            />
          </FormField>
        </FormSection>
        <FormSection
          title="4. Предварительные параметры"
          collapsible
          isOpen={false}
        >
          <FormField title="Сумма кредита РЭБ">
            <TextFieldControlUseForm
              name="rebCreditSumm"
              isEdit={isEdit}
              style={{width: FIELD_MD}}
              rules={{required: 'Поле обязательно для заполнения'}}
              placeholder="Введите размер кредитного лимита"
            />
          </FormField>
          <FormField title="Тип кредитной линии">
            <SelectFieldControlUseForm
              name="lineType"
              isEdit={isEdit}
              style={{width: FIELD_MD}}
              rules={{required: 'Поле обязательно для заполнения'}}
              placeholder="Выберите тип"
              items={[]}
            />
          </FormField>
          <FormField title="Валюта сделки">
            <SelectFieldControlUseForm
              name="dealCurrency"
              isEdit={isEdit}
              style={{width: FIELD_MD}}
              rules={{required: 'Поле обязательно для заполнения'}}
              placeholder="Выберите валюту"
              items={[
                {value: 'RUB', label: 'RUB'},
                {value: 'USD', label: 'USD'},
                {value: 'EUR', label: 'EUR'},
              ]}
            />
          </FormField>
          <FormField title="Ставка по кредиту РЭБ, %">
            <TextFieldControlUseForm
              name="loanRate"
              isEdit={isEdit}
              style={{width: FIELD_XS}}
              rules={{required: 'Поле обязательно для заполнения'}}
              placeholder="Введите значение"
            />
          </FormField>
          <FormField title="Комиссия по КД, %">
            <TextFieldControlUseForm
              name="commission"
              isEdit={isEdit}
              style={{width: FIELD_XS}}
              rules={{required: 'Поле обязательно для заполнения'}}
              placeholder="Введите значение"
            />
          </FormField>
          <FormField title="Комиссия за обслуживание аккредитива, %">
            <TextFieldControlUseForm
              name="commissionAccr"
              isEdit={isEdit}
              style={{width: FIELD_MD}}
              rules={{required: 'Поле обязательно для заполнения'}}
              placeholder="Введите значение"
            />
          </FormField>
          <FormField title="Лимит ГС">
            <TextFieldControlUseForm
              name="limitGeneralAgreement"
              isEdit={isEdit}
              style={{width: FIELD_XS}}
              rules={{required: 'Поле обязательно для заполнения'}}
              placeholder="Введите значение"
            />
          </FormField>
          <FormField title="Срок транша">
            <TextFieldControlUseForm
              name="trancheTerm"
              isEdit={isEdit}
              style={{width: FIELD_XS}}
              rules={{required: 'Поле обязательно для заполнения'}}
              placeholder="Введите значение"
            />
          </FormField>
          <FormField title="Срок линии">
            <TextFieldControlUseForm
              name="lineTerm"
              isEdit={isEdit}
              style={{width: FIELD_XS}}
              rules={{required: 'Поле обязательно для заполнения'}}
              placeholder="Введите значение"
            />
          </FormField>
          <FormField title="Вид финансирования">
            <RadioGroupFieldControlUseForm
              name="financingType"
              isEdit={isEdit}
              value={financingType}
              rules={{required: 'Поле обязательно для заполнения'}}
              placeholder="Введите значение"
              onChange={(e, value) => setFinancingType(value)}
              items={[
                {value: 'preExport', label: 'Предэкспорт'},
                {value: 'postExport', label: 'Постэкспорт'},
              ]}
            />
            {financingType ? (
              <Notify
                className="notify-financing-type"
                type={NOTIFY_TYPE.warning}
                icon={<InfoIcon />}
                text={
                  <>
                    Обратите внимание, что при выборе вида финансирования
                    <span className="bold"> {getFinancingTypeLabel()}</span>,
                    автоматически будут выбраны следующие{' '}
                    <span className="bold"> Цели финансирования</span>:
                    <div className="link">Смотреть список целей</div>
                  </>
                }
              />
            ) : null}
          </FormField>
        </FormSection>
        */}
      </Form>
    );
  }
);
