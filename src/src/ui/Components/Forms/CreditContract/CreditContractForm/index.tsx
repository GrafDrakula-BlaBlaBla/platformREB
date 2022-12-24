import React, {ChangeEvent, useEffect} from 'react';
import {isAfter, isBefore, parse} from 'date-fns';
import {observer} from 'mobx-react-lite';
import {useFormContext} from 'react-hook-form';
import {VIEW_MODEL} from '../../../../../ViewModel/identifiers';
import useViewModel from '../../../../hooks/useViewModel';
import {
  ECFACreditLineType,
  ICFACreditContractDTO,
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
import {ICFAAccreditiveRebViewModel} from '../../../../../ViewModel/viewModels/CFA_Deal/accreditive';
import moment from 'moment';
import useUpdateEffect from '../../../../hooks/useUpdateEffect';
import './index.less';

interface ICreditContractFormProps {
  isEdit?: boolean;
  isDisabled?: boolean;
}

export const creditContractFormDefaultValues: {
  [key in keyof ICFACreditContractDTO]?: any;
} = {
  limit: '',
  creditLineType: undefined,
  issued: undefined,
  unusedLimit: '',
  balance: '',
  paidFor: undefined,
  agreementId: '',
  conclusionDt: null,
  endDate: null,
  loanPeriod: '',
  tnCodes: undefined,
  individualCategory: '',
  inn: '',
  commission: '',
  loanTranche: '',
  loanRate: '',
  loanMPT: '',
  sumPercent: '',
  id: '',
};

export const CreditContractForm = observer(
  ({isEdit, isDisabled}: ICreditContractFormProps) => {
    const {
      ccViewModel,
      ccData,
      ccUnusedLimit,
      ccBalance,
      ccSumPercent,
      ccLoanPeriod,
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
    } = useViewModel<ICFAAccreditiveRebViewModel>(VIEW_MODEL.CFAAccreditive);

    const {
      reset,
      getValues,
      trigger,
      formState: {isValid},
    } = useFormContext();

    useEffect(() => {
      const values = getDefaultFormValues<ICFACreditContractDTO>(
        ccData,
        creditContractFormDefaultValues
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
      <Form className="credit-contract-form">
        <FormSection title="1. Параметры Кредитного договора">
          <FormField title="Лимит КД" disabled={isEdit && isDisabled}>
            <CurrencyFieldControlUseForm
              name="limit"
              placeholder="00.00"
              isEdit={isEdit}
              disabled={isDisabled}
              rules={{required: 'Поле обязательно для заполнения'}}
              onChange={(e) => {
                ccViewModel.setField('limit', e.target.value);
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
              disabled={isDisabled || ccData?.creditLineType?.fixed}
              rules={{required: 'Поле обязательно для заполнения'}}
              items={RadioItemsFromDictionary(ECFACreditLineType)}
              onChange={onChangeCreditLineType}
            />
          </FormField>
          <FormField title="Неиспользованный лимит" disabled={isEdit}>
            <CurrencyFieldControlEditable
              placeholder="00.00"
              isEdit={isEdit}
              disabled={true}
              value={ccUnusedLimit}
            />
          </FormField>
          <FormField
            title="Остаток основного долга к погашению"
            disabled={isEdit}
          >
            <CurrencyFieldControlEditable
              placeholder="00.00"
              isEdit={isEdit}
              disabled={true}
              value={ccBalance}
            />
          </FormField>
          <FormField>
            <Payment
              title="Итого выдано траншей"
              titleNew="Новая выдача"
              titleValue="Сумма транша"
              titleDate="Дата погашения"
              titleMaurityDate="Дата предоставления"
              titleTranche="Номер транша"
              isDisabled={isDisabled}
              isEdit={isEdit}
              isExtended={true}
              data={ccData?.issued}
              onPaymentAdd={issuedAdd}
              onPaymentRemove={issuedRemove}
              onPaymentChange={onChangeIssued}
              onValidate={onValidateIssued}
              rules={{
                required: () => {
                  let required = true;
                  if (!ccData?.issued || ccData?.issued.length === 0) {
                    required = false;
                  } else {
                    ccData.issued.forEach((value) => {
                      if (!value.tranchNumber) {
                        required = false;
                      }
                      if (!value.amount || value.amount <= 0) {
                        required = false;
                      }
                      if (!value.changedDate) {
                        required = false;
                      }
                      if (!moment(value.changedDate, 'DD.MM.YYYY').isValid()) {
                        required = false;
                      }
                      if (!value.maurityDate) {
                        required = false;
                      }
                      if (!moment(value.maurityDate, 'DD.MM.YYYY').isValid()) {
                        required = false;
                      }
                    });
                  }
                  const message = 'Обязательно для заполнения';
                  return required || message;
                },
                amount: () => {
                  const totalIssued = ccData?.issued?.reduce((prev, curr) => {
                    return prev + (curr.amount || 0);
                  }, 0);
                  const message =
                    '"Итого выдано траншей" не может быть больше "Лимит КД"';
                  return totalIssued <= ccData.limit || message;
                },
              }}
            />
          </FormField>
          <FormField>
            <Payment
              title="Погашено"
              titleNew="Новое погашение"
              titleValue="Погашено"
              titleDate="Дата погашения"
              isDisabled={isDisabled}
              isEdit={isEdit}
              data={ccData?.paidFor}
              onPaymentAdd={paidForAdd}
              onPaymentRemove={paidForRemove}
              onPaymentChange={onChangePaidFor}
              onValidate={onValidatePaidFor}
              rules={{
                required: () => {
                  let required = true;
                  if (!ccData?.paidFor || ccData?.paidFor.length === 0) {
                    required = false;
                  } else {
                    ccData.paidFor.forEach((value) => {
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
            title="№ кредитного договора"
            disabled={isEdit && isDisabled}
          >
            <TextFieldControlUseForm
              name="agreementId"
              placeholder="Введите номер кредитного договора"
              isEdit={isEdit}
              disabled={isDisabled}
              rules={{required: 'Поле обязательно для заполнения'}}
            />
          </FormField>
          <FormField
            title="Дата заключения"
            disabled={isEdit && isDisabled}
            className="credit-contract-form__half"
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
                ccViewModel.setField('conclusionDt', date as never);
                trigger('endDate');
              }}
            />
          </FormField>
          <FormField
            title="Плановая дата окончания"
            disabled={isEdit && isDisabled}
            className="credit-contract-form__half"
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
                ccViewModel.setField('endDate', date as never);
                trigger('conclusionDt');
              }}
            />
          </FormField>
          <FormField
            title="Срок"
            disabled={isEdit}
            className="credit-contract-form__half"
          >
            <TextFieldControlEditable
              placeholder="Срок"
              isEdit={isEdit}
              disabled={true}
              value={ccLoanPeriod}
            />
          </FormField>
          <FormField title="ТНВЭД" disabled={isEdit}>
            <MultiSelectFieldControlUseForm
              name="tnCodes"
              isEdit={isEdit}
              disabled={true}
              items={ccData?.tnCodes?.map((tnCode) => {
                return {
                  value: tnCode,
                  label: tnCode,
                };
              })}
            />
          </FormField>
          <FormField title="Категория заемщика" disabled={isEdit}>
            <TextFieldControlUseForm
              name="individualCategory"
              placeholder="Категория заемщика"
              isEdit={isEdit}
              disabled={true}
            />
          </FormField>
          <FormField title="ИНН заёмщика" disabled={isEdit}>
            <TextFieldControlUseForm
              name="inn"
              placeholder="ИНН заёмщика"
              isEdit={isEdit}
              disabled={true}
            />
          </FormField>
          <FormField
            title="Комиссия за открытие кредитной линии, %"
            disabled={isEdit && isDisabled}
          >
            <TextFieldControlUseForm
              name="commission"
              placeholder="Введите процент комиссии"
              isEdit={isEdit}
              disabled={isDisabled}
              rules={{required: 'Поле обязательно для заполнения'}}
            />
          </FormField>
          <FormField title="Срок транша" disabled={isEdit && isDisabled}>
            <TextFieldControlUseForm
              name="loanTranche"
              placeholder="Введите срок транша"
              isEdit={isEdit}
              disabled={isDisabled}
              rules={{required: 'Поле обязательно для заполнения'}}
            />
          </FormField>
          <FormField
            title="Субсидируемая ставка по кредиту РЭБ, %"
            disabled={isEdit && isDisabled}
          >
            <TextFieldControlUseForm
              name="loanRate"
              placeholder="00.00"
              isEdit={isEdit}
              disabled={isDisabled}
              rules={{required: 'Поле обязательно для заполнения'}}
            />
          </FormField>
          <FormField
            title="Процентная ставка без субсидий МПТ, %"
            disabled={isEdit && isDisabled}
          >
            <TextFieldControlUseForm
              name="loanMPT"
              placeholder="00.00"
              isEdit={isEdit}
              disabled={isDisabled}
              rules={{required: 'Поле обязательно для заполнения'}}
              onChange={(e) => {
                ccViewModel.setField('loanMPT', e.target.value);
              }}
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
              value={ccSumPercent}
            />
          </FormField>
        </FormSection>
      </Form>
    );
  }
);
