import React, {ChangeEvent} from 'react';
import {
  FormField,
  FormSection,
  IFormSectionProps,
} from '../../../../../Common/FormComponents';
import {
  CurrencyFieldControlEditable,
  monthViewFormat,
  NumberFieldControlFormat,
  percentViewFormat,
  RadioGroupFieldControlEditable,
  TextFieldControlEditable,
} from '../../../../../Common/FieldControls';
import useViewModel from '../../../../../hooks/useViewModel';
import {VIEW_MODEL} from '../../../../../../ViewModel/identifiers';
import {ICFARequestComViewModel} from '../../../../../../ViewModel/viewModels/CFA_Deal/request';
import {useRoute} from 'react-router5';
import {
  ECFACreditLineType,
  ICFARequestDTO,
} from '../../../../../../Model/CFA_Deal';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import {Button} from '../../../../../Common/SimpleComponents/Button';
import {RadioItemsFromDictionary} from '../../../../../Common/FieldControls/FieldControlsBase/RadioGroupFieldControl/RadioItemsFromDictionary';
import {InputAdornment} from '@material-ui/core';
import {FinancingTypeViewForm} from './FinancingTypeViewForm';
import {FinancingTypeEditForm} from './FinancingTypeEditForm';
import {ClassNameInjection} from '../../../../../../Utils/ClassNames/ClassNameInjection';
import {observer} from 'mobx-react-lite';
import './index.less';

const FIELD_LG = 400;

export const CFAParametersEditSection = observer((props: IFormSectionProps) => {
  const {
    data: request,
    reloadRequest,
    isEditCard,
    setIsEditCard,
    setField,
    saveRequestParameters,
    currenciesItems,
    getCurrencyCodeLat,
    financingTypeItems,
  } = useViewModel<ICFARequestComViewModel>(VIEW_MODEL.CFARequest);

  const {route} = useRoute();

  const onEdit = () => {
    setIsEditCard(true);
  };
  const onSave = async () => {
    await saveRequestParameters();
    setIsEditCard(false);
  };
  const onCancel = async () => {
    await reloadRequest(route.params.id);
    setIsEditCard(false);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setField(e.target.name as keyof ICFARequestDTO, e.target.value);
  };
  const onChangeRevolving = (e: ChangeEvent<HTMLInputElement>) => {
    let value = undefined;
    if (e.target.value === 'NKL') value = false;
    if (e.target.value === 'VKL') value = true;
    setField('revolving', value);
    setField('creditLineType', e.target.value);
  };

  const Buttons = () => {
    return isEditCard ? (
      <CloseIcon
        onClick={onCancel}
        className="cfa-parameters-edit-section__btn"
      />
    ) : (
      <EditIcon onClick={onEdit} className="cfa-parameters-edit-section__btn" />
    );
  };
  const ButtonsFooter = () => {
    return isEditCard ? (
      <div className="cfa-parameters-edit-section__buttons-footer">
        <Button variant="outlined" color="default" onClick={onCancel}>
          Отмена
        </Button>
        <Button variant="contained" color="blue" onClick={onSave}>
          Сохранить изменения
        </Button>
      </div>
    ) : null;
  };

  const {rightBlock, ...other} = props;
  const cls = ClassNameInjection(
    'cfa-parameters-edit-section',
    props.className
  );

  return (
    <FormSection {...other} className={cls} rightBlock={<Buttons />}>
      <FormField isRow={!isEditCard} title="Валюта сделки">
        <RadioGroupFieldControlEditable
          isEdit={isEditCard}
          value={request?.currency}
          items={currenciesItems}
          layout="horizontal"
          name="currency"
          onChange={onChange}
        />
      </FormField>
      <FormField isRow={!isEditCard} title="Лимит КД">
        <CurrencyFieldControlEditable
          isEdit={isEditCard}
          value={request?.limitCreditAgreement}
          codeLat={getCurrencyCodeLat(request?.currency)}
          style={{width: FIELD_LG}}
          name="limitCreditAgreement"
          onChange={onChange}
        />
      </FormField>
      <FormField isRow={!isEditCard} title="Тип кредитной линии">
        <RadioGroupFieldControlEditable
          isEdit={isEditCard}
          value={request?.creditLineType}
          items={RadioItemsFromDictionary(ECFACreditLineType)}
          layout="horizontal"
          name="revolving"
          onChange={onChangeRevolving}
        />
      </FormField>
      <FormField
        isRow={!isEditCard}
        title="Субсидируемая ставка по кредиту РЭБ"
      >
        <TextFieldControlEditable
          isEdit={isEditCard}
          value={request?.loanRate}
          viewFormat={percentViewFormat}
          style={{width: FIELD_LG}}
          InputProps={{
            inputComponent: NumberFieldControlFormat as any,
            endAdornment: <InputAdornment position="end">%</InputAdornment>,
          }}
          name="loanRate"
          onChange={onChange}
        />
      </FormField>
      <FormField isRow={!isEditCard} title="Срок кредитной линии">
        <TextFieldControlEditable
          isEdit={isEditCard}
          value={request?.loanCreditLine}
          viewFormat={monthViewFormat}
          style={{width: FIELD_LG}}
          InputProps={{
            inputComponent: NumberFieldControlFormat as any,
            endAdornment: <InputAdornment position="end">мес.</InputAdornment>,
          }}
          name="loanCreditLine"
          onChange={onChange}
        />
      </FormField>
      <FormField isRow={!isEditCard} title="Срок транша">
        <TextFieldControlEditable
          isEdit={isEditCard}
          value={request?.loanTranche}
          viewFormat={monthViewFormat}
          style={{width: FIELD_LG}}
          InputProps={{
            inputComponent: NumberFieldControlFormat as any,
            endAdornment: <InputAdornment position="end">мес.</InputAdornment>,
          }}
          name="loanTranche"
          onChange={onChange}
        />
      </FormField>
      <FormField isRow={!isEditCard} title="Вид финансирования">
        <RadioGroupFieldControlEditable
          isEdit={isEditCard}
          value={request?.financingType}
          items={financingTypeItems}
          style={{width: FIELD_LG}}
          layout="horizontal"
          name="financingType"
          onChange={onChange}
        />
      </FormField>
      {!isEditCard && request?.financingType === 'Предэкспорт' && (
        <FinancingTypeViewForm />
      )}
      {isEditCard && <FinancingTypeEditForm />}
      <FormField isRow={!isEditCard} title="Лимит ГС">
        <CurrencyFieldControlEditable
          isEdit={isEditCard}
          value={request?.limitGeneralAgreement}
          codeLat={getCurrencyCodeLat(request?.currency)}
          style={{width: FIELD_LG}}
          name="limitGeneralAgreement"
          onChange={onChange}
        />
      </FormField>
      <FormField isRow={!isEditCard} title="Срок ГС">
        <TextFieldControlEditable
          isEdit={isEditCard}
          value={request?.loanPeriodGeneralAgreement}
          viewFormat={monthViewFormat}
          style={{width: FIELD_LG}}
          InputProps={{
            inputComponent: NumberFieldControlFormat as any,
            endAdornment: <InputAdornment position="end">мес.</InputAdornment>,
          }}
          name="loanPeriodGeneralAgreement"
          onChange={onChange}
        />
      </FormField>
      <FormField
        isRow={!isEditCard}
        title="Комиссия за обслуживание аккредитива"
      >
        <TextFieldControlEditable
          isEdit={isEditCard}
          value={request?.commission}
          viewFormat={percentViewFormat}
          style={{width: FIELD_LG}}
          InputProps={{
            inputComponent: NumberFieldControlFormat as any,
            endAdornment: <InputAdornment position="end">%</InputAdornment>,
          }}
          name="commission"
          onChange={onChange}
        />
      </FormField>
      <ButtonsFooter />
    </FormSection>
  );
});
