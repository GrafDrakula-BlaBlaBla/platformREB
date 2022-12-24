import React, {ChangeEvent, useEffect} from 'react';
import {isAfter, isBefore, parse} from 'date-fns';
import {observer} from 'mobx-react-lite';
import {useFormContext} from 'react-hook-form';
import {VIEW_MODEL} from '../../../../../ViewModel/identifiers';
import useViewModel from '../../../../hooks/useViewModel';
import {
  ECFACreditLineType,
  ICFAGeneralAgreementDTO,
  TCFACreditLineType,
} from '../../../../../Model/CFA_Deal';
import {getDefaultFormValues} from '../../index';
import {Form, FormSection, FormField} from '../../../../Common/FormComponents';
import {Payment} from '../../../CFA_Deal/Accreditive/Payment';
import {
  DateFieldControlUseForm,
  MultiSelectFieldControlUseForm,
  RadioGroupFieldControlUseForm,
  CurrencyFieldControlEditable,
  CurrencyFieldControlUseForm,
  TextFieldControlEditable,
  TextFieldControlUseForm,
} from '../../../../Common/FieldControls';
import {RadioItemsFromDictionary} from '../../../../Common/FieldControls/FieldControlsBase/RadioGroupFieldControl/RadioItemsFromDictionary';
import {ICFAAccreditiveComViewModel} from '../../../../../ViewModel/viewModels/CFA_Deal/accreditive';
import moment from 'moment';
import useUpdateEffect from '../../../../hooks/useUpdateEffect';
import './index.less';

interface IGeneralAgreementFormProps {
  isEdit?: boolean;
  isDisabled?: boolean;
}

export const generalAgreementFormDefaultValues: {
  [key in keyof ICFAGeneralAgreementDTO]?: any;
} = {
  limit: '',
  creditLineType: undefined,
  accreditiveNumber: '',
  unusedLimit: '',
  balance: '',
  sumPercent: '',
  issued: undefined,
  paidFor: undefined,
  agreementId: '',
  conclusionDt: null,
  endDate: null,
  loanPeriod: '',
  commission: '',
  plannedSumServiceFee: '',
  plannedFeePaymentDate: null,
  factSumServiceFee: '',
  factFeePaymentDate: null,
  id: '',
  tnCodes: undefined,
  tnSumm: '',
};

export const GeneralAgreementForm = observer(
  ({isEdit, isDisabled}: IGeneralAgreementFormProps) => {
    const {
      gaViewModel,
      gaData,
      gaUnusedLimit,
      gaBalance,
      gaSumPercent,
      gaLoanPeriod,
      setIsValid,
      setIsValidIssued,
      setIsValidPaidFor,
      setCreditLineType,
      issuedAdd,
      issuedRemove,
      issuedSetField,
      paidForAdd,
      paidForRemove,
      paidForSetField,
    } = useViewModel<ICFAAccreditiveComViewModel>(VIEW_MODEL.CFAAccreditive);

    const {
      reset,
      getValues,
      trigger,
      formState: {isValid},
    } = useFormContext();

    useEffect(() => {
      const values = getDefaultFormValues<ICFAGeneralAgreementDTO>(
        gaData,
        generalAgreementFormDefaultValues
      );
      reset(values);
      // eslint-disable-next-line
    }, []);

    const onChangeCreditLineType = (e: ChangeEvent<HTMLInputElement>) => {
      setCreditLineType(e.target.value as TCFACreditLineType);
    };
    const onChangeIssued = (
      tempId: string,
      name: string,
      value: string | number | null
    ) => {
      issuedSetField(tempId, name, value);
    };
    const onValidateIssued = (error: string) => {
      setIsValidIssued(!Boolean(error));
    };
    const onChangePaidFor = (
      tempId: string,
      name: string,
      value: string | number | null
    ) => {
      paidForSetField(tempId, name, value);
    };
    const onValidatePaidFor = (error: string) => {
      setIsValidPaidFor(!Boolean(error));
    };

    useUpdateEffect(() => {
      setIsValid(isValid);
    }, [isValid]);

    return (
      <Form className="general-agreement-form">
        <FormSection title="1. Параметры Генерального соглашения">
          <FormField title="Лимит ГС" disabled={isEdit && isDisabled}>
            <CurrencyFieldControlUseForm
              name="limit"
              placeholder="00.00"
              isEdit={isEdit}
              disabled={isDisabled}
              rules={{required: 'Поле обязательно для заполнения'}}
              onChange={(e) => {
                gaViewModel.setField('limit', e.target.value);
              }}
            />
          </FormField>
          <FormField
            title="Тип кредитной линии"
            disabled={isEdit && isDisabled}
          >
            <RadioGroupFieldControlUseForm
              name="creditLineTypeValue"
              layout="horizontal"
              isEdit={isEdit}
              disabled={isDisabled || gaData?.creditLineType?.fixed}
              rules={{required: 'Поле обязательно для заполнения'}}
              items={RadioItemsFromDictionary(ECFACreditLineType)}
              onChange={onChangeCreditLineType}
            />
          </FormField>
          <FormField title="Номер аккредитива" disabled={isEdit && isDisabled}>
            <TextFieldControlUseForm
              name="accreditiveNumber"
              placeholder="Введите номер аккредитива"
              isEdit={isEdit}
              disabled={isDisabled}
              rules={{required: 'Поле обязательно для заполнения'}}
            />
          </FormField>
          <FormField title="Неиспользованный лимит" disabled={isEdit}>
            <CurrencyFieldControlEditable
              placeholder="00.00"
              isEdit={isEdit}
              disabled={true}
              value={gaUnusedLimit}
            />
          </FormField>
          <FormField title="Остаток по аккредитиву" disabled={isEdit}>
            <CurrencyFieldControlEditable
              placeholder="00.00"
              isEdit={isEdit}
              disabled={true}
              value={gaBalance}
            />
          </FormField>
          <FormField
            title="Сумма % за 90 дней, покрытая аккредитивом"
            disabled={isEdit}
          >
            <CurrencyFieldControlEditable
              placeholder="00.00"
              isEdit={isEdit}
              disabled={true}
              value={gaSumPercent}
            />
          </FormField>
          <FormField>
            <Payment
              title="Сумма увеличений аккредитива"
              titleNew="Новое увеличение"
              titleValue="Сумма увеличения аккредитива"
              titleDate="Дата изменения"
              isDisabled={isDisabled}
              isEdit={isEdit}
              data={gaData?.issued}
              onPaymentAdd={issuedAdd}
              onPaymentRemove={issuedRemove}
              onPaymentChange={onChangeIssued}
              onValidate={onValidateIssued}
              rules={{
                required: () => {
                  let required = true;
                  if (!gaData?.issued || gaData?.issued.length === 0) {
                    required = false;
                  } else {
                    gaData.issued.forEach((value) => {
                      if (!value.amount || value.amount <= 0) {
                        required = false;
                      }
                      if (!value.changedDate) {
                        required = false;
                      }
                      if (!moment(value.changedDate, 'DD.MM.YYYY').isValid()) {
                        required = false;
                      }
                    });
                  }
                  const message = 'Обязательно для заполнения';
                  return required || message;
                },
                amount: () => {
                  const totalIssued = gaData?.issued?.reduce((prev, curr) => {
                    return prev + (curr.amount || 0);
                  }, 0);
                  const message =
                    '"Сумма увеличений аккредитива" не может быть больше "лимит ГС" минус "сумма % за 90 дней, покрытая аккредитивом"';
                  return totalIssued <= gaData.limit - gaSumPercent || message;
                },
              }}
            />
          </FormField>
          <FormField>
            <Payment
              title="Сумма уменьшений аккредитива"
              titleNew="Новое уменьшение"
              titleValue="Сумма уменьшения аккредитива"
              titleDate="Дата изменения"
              isDisabled={isDisabled}
              isEdit={isEdit}
              data={gaData?.paidFor}
              onPaymentAdd={paidForAdd}
              onPaymentRemove={paidForRemove}
              onPaymentChange={onChangePaidFor}
              onValidate={onValidatePaidFor}
              rules={{
                required: () => {
                  let required = true;
                  if (!gaData?.paidFor || gaData?.paidFor.length === 0) {
                    required = false;
                  } else {
                    gaData.paidFor.forEach((value) => {
                      if (!value.amount || value.amount <= 0) {
                        required = false;
                      }
                      if (!value.changedDate) {
                        required = false;
                      }
                      if (!moment(value.changedDate, 'DD.MM.YYYY').isValid()) {
                        required = false;
                      }
                    });
                  }
                  const message = 'Обязательно для заполнения';
                  return required || message;
                },
              }}
            />
          </FormField>
        </FormSection>
        <FormSection title="2. Общая информация">
          <FormField
            title="№ генерального соглашения"
            disabled={isEdit && isDisabled}
          >
            <TextFieldControlUseForm
              name="agreementId"
              placeholder="Введите номер генерального соглашения"
              isEdit={isEdit}
              disabled={isDisabled}
              rules={{required: 'Поле обязательно для заполнения'}}
            />
          </FormField>
          <FormField
            title="Дата заключения"
            disabled={isEdit && isDisabled}
            className="general-agreement-form__half"
          >
            <DateFieldControlUseForm
              name="conclusionDt"
              placeholder="дд.мм.гггг"
              isEdit={isEdit}
              disabled={isDisabled}
              shouldValidate={true}
              rules={{
                required: 'Поле обязательно для заполнения',
                validate: {
                  lessThen: (value: any) => {
                    const conclusionDt =
                      typeof value === 'string'
                        ? parse(value, 'dd.MM.yyyy', new Date())
                        : value;
                    const valueEndDate = getValues('endDate');
                    const endDate =
                      typeof valueEndDate === 'string'
                        ? parse(valueEndDate, 'dd.MM.yyyy', new Date())
                        : valueEndDate;
                    return (
                      isBefore(conclusionDt, endDate) ||
                      'Дата заключения должна быть меньше плановой даты окончания'
                    );
                  },
                },
              }}
              onChange={(date, name) => {
                gaViewModel.setField('conclusionDt', date as never);
                trigger('endDate');
              }}
            />
          </FormField>
          <FormField
            title="Плановая дата окончания"
            disabled={isEdit && isDisabled}
            className="general-agreement-form__half"
          >
            <DateFieldControlUseForm
              name="endDate"
              placeholder="дд.мм.гггг"
              isEdit={isEdit}
              disabled={isDisabled}
              shouldValidate={true}
              rules={{
                required: 'Поле обязательно для заполнения',
                validate: {
                  greaterThen: (value: any) => {
                    const endDate =
                      typeof value === 'string'
                        ? parse(value, 'dd.MM.yyyy', new Date())
                        : value;
                    const valueConclusionDt = getValues('conclusionDt');
                    const conclusionDt =
                      typeof valueConclusionDt === 'string'
                        ? parse(valueConclusionDt, 'dd.MM.yyyy', new Date())
                        : valueConclusionDt;
                    return (
                      isAfter(endDate, conclusionDt) ||
                      'Плановая дата окончания должна быть больше даты заключения'
                    );
                  },
                },
              }}
              onChange={(date, name) => {
                gaViewModel.setField('endDate', date as never);
                trigger('conclusionDt');
              }}
            />
          </FormField>
          <FormField
            title="Срок"
            disabled={isEdit}
            className="general-agreement-form__half"
          >
            <TextFieldControlEditable
              placeholder="Срок"
              isEdit={isEdit}
              disabled={true}
              value={gaLoanPeriod}
            />
          </FormField>
          <FormField
            title="Комиссия за обслуживание аккредитива, %"
            disabled={isEdit && isDisabled}
          >
            <TextFieldControlUseForm
              name="commission"
              placeholder="Введите процент комиссии за обслуживание аккредитива"
              isEdit={isEdit}
              disabled={isDisabled}
              rules={{required: 'Поле обязательно для заполнения'}}
            />
          </FormField>
          <FormField
            title="Плановая сумма комиссии к оплате"
            disabled={isEdit && isDisabled}
          >
            <CurrencyFieldControlUseForm
              name="plannedSumServiceFee"
              placeholder="Введите плановую сумму комиссии к оплате"
              isEdit={isEdit}
              disabled={isDisabled}
              rules={{required: 'Поле обязательно для заполнения'}}
            />
          </FormField>
          <FormField
            title="Плановая дата оплаты комиссии"
            disabled={isEdit && isDisabled}
            className="general-agreement-form__half"
          >
            <DateFieldControlUseForm
              name="plannedFeePaymentDate"
              placeholder="дд.мм.гггг"
              isEdit={isEdit}
              disabled={isDisabled}
              shouldValidate={true}
              rules={{required: 'Поле обязательно для заполнения'}}
            />
          </FormField>
          <FormField
            title="Фактическая сумма оплаченной комиссии"
            disabled={isEdit && isDisabled}
          >
            <CurrencyFieldControlUseForm
              name="factSumServiceFee"
              placeholder="00.00"
              isEdit={isEdit}
              disabled={isDisabled}
              rules={{required: 'Поле обязательно для заполнения'}}
            />
          </FormField>
          <FormField
            title="Фактическая дата оплаты комиссии"
            disabled={isEdit && isDisabled}
            className="general-agreement-form__half"
          >
            <DateFieldControlUseForm
              name="factFeePaymentDate"
              placeholder="дд.мм.гггг"
              isEdit={isEdit}
              disabled={isDisabled}
              shouldValidate={true}
              rules={{required: 'Поле обязательно для заполнения'}}
            />
          </FormField>
          <FormField title="ТН ВЭД" disabled={isEdit}>
            <MultiSelectFieldControlUseForm
              name="tnCodes"
              isEdit={isEdit}
              disabled={true}
              items={gaData?.tnCodes?.map((tnCode) => {
                return {
                  value: tnCode,
                  label: tnCode,
                };
              })}
            />
          </FormField>
          <FormField title="Сумма ТН ВЭД" disabled={isEdit}>
            <CurrencyFieldControlUseForm
              name="tnSumm"
              placeholder="Сумма ТН ВЭД"
              isEdit={isEdit}
              disabled={true}
            />
          </FormField>
        </FormSection>
      </Form>
    );
  }
);
