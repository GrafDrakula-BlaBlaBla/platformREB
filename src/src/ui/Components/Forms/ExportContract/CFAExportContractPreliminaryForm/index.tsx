import {InputAdornment} from '@material-ui/core';
import {observer} from 'mobx-react-lite';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {uuidv4} from '../../../../../Utils/Uid';
import {
  ICFAExportContractPreliminaryExtendedDTO,
  ICFAExportContractPreliminaryViewModel,
} from '../../../../../ViewModel/viewModels/CFA_Deal/exportContractPreliminary/interfaces';
import {
  CurrencyFieldControlUseForm,
  DateFieldControlUseForm,
  NumberFieldControlFormat,
  TextFieldControlUseForm,
} from '../../../../Common/FieldControls';
import {Form, FormField, FormSection} from '../../../../Common/FormComponents';
import {useViewModelByKey} from '../../../../hooks/useViewModel';
import {MultiCurrencyField} from '../../../CFA_Deal/MultiCurrencyField';
import {ReactComponent as DeleteIcon} from '../../../../../assets/svg/attachment/DeleteIcon.svg';
import './index.less';

interface ICFAExportContractPreliminaryViewForm {
  data: ICFAExportContractPreliminaryExtendedDTO;
  onSave?: () => void;
}

const classNameRoot = 'cfa-export-contract-preliminary-form';

export const CFAExportContractPreliminaryForm = observer(
  ({data}: ICFAExportContractPreliminaryViewForm) => {
    const {
      currency,
      contractNumber,
      dateOfContract,
      sumContract,
      sumHiTech,
      tnCode,
      productName,
      id,
    } = data;

    const {setField: setFieldWithId} = useViewModelByKey<
      ICFAExportContractPreliminaryViewModel
    >('CFAExportContractPreliminary');

    const setField = <
      K extends keyof ICFAExportContractPreliminaryExtendedDTO,
      V extends ICFAExportContractPreliminaryExtendedDTO[K]
    >(
      name: K,
      value: V | ((prevValue: V) => V)
    ) => setFieldWithId(id, name, value);

    const addTnCode = () => {
      setField('tnCode', (prevValue) => [
        ...prevValue,
        {
          id: uuidv4(),
          code: '',
        },
      ]);
    };

    const setTnCode = (id: string, value: string) => {
      setField('tnCode', (prevValue) =>
        prevValue.map((item) => {
          if (item.id === id) {
            return {
              id,
              code: value,
            };
          }
          return item;
        })
      );
    };

    const deleteTnCode = (id: string) => {
      setField('tnCode', (prevValue) =>
        prevValue.filter((item) => {
          if (item.id === id) {
            return false;
          }
          return true;
        })
      );
    };

    const shareHiTech = sumHiTech / sumContract;

    return (
      <Form className={classNameRoot}>
        <FormSection title="Предварительные параметры">
          <FormField title="Валюта экспортного проекта/контакта">
            <MultiCurrencyField
              name="currency"
              type="codeLat"
              onChange={(value) => {
                if (value) {
                  setField('currency', value);
                } else {
                  setField('currency', '');
                }
              }}
              value={currency}
            />
          </FormField>
          <FormField title="№ экспортного проекта/контракта">
            <TextFieldControlUseForm
              className={`${classNameRoot}__input`}
              name="contractNumber"
              value={contractNumber}
              rules={{required: 'Поле обязательно для заполнения'}}
              onChange={(e) => {
                setField('contractNumber', e.target.value);
              }}
            />
          </FormField>
          <FormField title="Дата экспортного проекта/контракта">
            <DateFieldControlUseForm
              className={`${classNameRoot}__input-date`}
              name="dateOfContract"
              value={dateOfContract}
              placeholder="дд.мм.гггг"
              rules={{required: 'Поле обязательно для заполнения'}}
              onChange={(date) => {
                if (date !== null) {
                  setField('dateOfContract', moment(date).format('DD.MM.YYYY'));
                }
              }}
            />
          </FormField>
          <FormField title="Сумма экспортного проекта/контракта">
            <CurrencyFieldControlUseForm
              className={`${classNameRoot}__input`}
              name="sumContract"
              codeLat={currency}
              value={sumContract}
              placeholder="00.00"
              rules={{required: 'Поле обязательно для заполнения'}}
              onChange={(e) => {
                setField('sumContract', Number(e.target.value));
              }}
            />
          </FormField>
          <FormField title="Сумма высокотехнологичной продукции в экспортном проекте/контракте">
            <CurrencyFieldControlUseForm
              className={`${classNameRoot}__input`}
              name="sumHiTech"
              codeLat={currency}
              value={sumHiTech}
              placeholder="00.00"
              rules={{required: 'Поле обязательно для заполнения'}}
              onChange={(e) => {
                setField('sumHiTech', Number(e.target.value));
              }}
            />
          </FormField>
          <FormField
            title="Доля высокотехнологичной продукции в экспортном проекте/контракте"
            disabled={true}
          >
            <TextFieldControlUseForm
              className={`${classNameRoot}__input`}
              name="shareHiTech"
              value={isNaN(shareHiTech) ? '0' : shareHiTech}
              isEdit={true}
              disabled={true}
              InputProps={{
                inputComponent: NumberFieldControlFormat as any,
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
              }}
            />
          </FormField>
          <FormField title="Код(ы) ТН ВЭД ЕАЭС, финансируемые за счет средств кредита (кредитной линии)">
            <TnCode
              tnCode={tnCode}
              setTnCode={setTnCode}
              addTnCode={addTnCode}
              deleteTnCode={deleteTnCode}
            />
          </FormField>
          <FormField title="Наименование продукции">
            <TextFieldControlUseForm
              className={`${classNameRoot}__input`}
              name="productName"
              value={productName}
              rules={{required: 'Поле обязательно для заполнения'}}
              onChange={(e) => {
                setField('productName', e.target.value);
              }}
            />
          </FormField>
        </FormSection>
      </Form>
    );
  }
);

type ITnCode = Pick<ICFAExportContractPreliminaryExtendedDTO, 'tnCode'> & {
  addTnCode: () => void;
  setTnCode: (id: string, value: string) => void;
  deleteTnCode: (id: string) => void;
};

const TnCode = observer(
  ({tnCode, setTnCode, addTnCode, deleteTnCode}: ITnCode) => {
    const [isSingle, setIsSingle] = useState<boolean>(tnCode.length === 1);

    useEffect(() => {
      setIsSingle(tnCode.length === 1);
    }, [tnCode]);

    return (
      <>
        {tnCode.map(({id, code}) => (
          <div className={`${classNameRoot}__item-tn-code`} key={id}>
            <TextFieldControlUseForm
              className={`${classNameRoot}__input-tn-code`}
              name={`tnCode-${id}`}
              value={code}
              rules={{required: 'Поле обязательно для заполнения'}}
              onChange={(e) => {
                setTnCode(id, e.target.value);
              }}
            />
            {!isSingle && (
              <button
                onClick={() => deleteTnCode(id)}
                className={`${classNameRoot}__button-delete-tn-code`}
              >
                <DeleteIcon />
              </button>
            )}
          </div>
        ))}

        <span
          className={`${classNameRoot}__button-add-tn-code link`}
          onClick={addTnCode}
        >
          Добавить код
        </span>
      </>
    );
  }
);
