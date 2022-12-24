import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import {observer} from 'mobx-react-lite';
import {Form, FormField, FormSection} from '../../../../Common/FormComponents';
import {
  CheckboxFieldControlUseForm,
  DateFieldControlUseForm,
  TextFieldControlUseForm,
} from '../../../../Common/FieldControls';
import useViewModel from '../../../../hooks/useViewModel';
import {VIEW_MODEL} from '../../../../../ViewModel/identifiers';
import {ReactComponent as DeleteIcon} from '../../../../../assets/svg/attachment/DeleteIcon.svg';
import {
  ICFADraftExportContractDTO,
  ICFADraftExportContractEmpty,
  ICFADraftExportContractExtendedDTO,
} from '../../../../../Model/CFA_Draft';
import {ICFARequestDTO} from '../../../../../Model/CFA_Deal';
import {useFormContext} from 'react-hook-form';
import useUpdateEffect from '../../../../hooks/useUpdateEffect';
import './index.less';
import {getDefaultFormValues} from '../../index';
import {getDateWithFrontEndFormat} from '../../../../../Utils/Date/DateFormat';
import {Autocomplete} from '@material-ui/lab';
import {IDictionaryCountriesDTO} from '../../../../../Model/Dictionary';
import {IDictionaryViewModel} from '../../../../../ViewModel/viewModels/Dictionary/interfaces';
import {ICFADraftExportContractComViewModel} from '../../../../../ViewModel/viewModels/CFA_Draft/exportContract/interfaces';
import {FormWrapperGetNamesFields} from '../../../../Common/FormComponents/FormWrapperGetNamesFields';
import {
  uniqueStateType,
  useUniqueState,
} from '../../../../hooks/useUniqueState';

const FIELD_XS = 200;
const FIELD_SM = 270;
// const FIELD_MD = 300;
const FIELD_LG = 400;

interface ICFAExportContractEditFormProps {
  data: ICFADraftExportContractExtendedDTO;
  isEdit: boolean;
  isSavingForm?: uniqueStateType<null>;
}

export const CFADraftExportContractEditForm: FC<ICFAExportContractEditFormProps> = observer(
  ({data, isEdit, isSavingForm}) => {
    const {
      setContractIsValid,
      setContractIsDirty,
      setField,
      setFieldTnCode,
      setFieldConfirmedDocument,
      addTnCode,
      addConfirmedDocument,
      deleteTnCode,
      deleteConfirmedDocument,
    } = useViewModel<ICFADraftExportContractComViewModel>(
      VIEW_MODEL.CFADraftExportContract
    );

    const {countriesList, getCountries} = useViewModel<IDictionaryViewModel>(
      VIEW_MODEL.Dictionary
    );

    const {tempId, confirmedDocuments, tnCodes} = data;

    const onChangeTextField = (e: ChangeEvent<HTMLInputElement>) => {
      const name = e.target.name as keyof ICFARequestDTO;
      const value = e.target.value;
      setField(tempId as string, name, value);
      setContractIsDirty(tempId as string, true);
    };
    const onChangeDateField = (value: Date | null, name?: string | null) => {
      setField(tempId as string, name as string, value);
      setContractIsDirty(tempId as string, true);
    };
    const onChangeTnCode = (event: ChangeEvent<HTMLInputElement>) => {
      const target = event.target;
      const index = target.dataset.index;
      setFieldTnCode(
        tempId as string,
        target.name,
        target.value,
        Number(index)
      );
      setContractIsDirty(tempId as string, true);
    };
    const onChangeExportDocumentTextField = (
      event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      const target = event.target;
      const index = target.dataset.index;
      const name = target.dataset.name;
      setFieldConfirmedDocument(
        tempId as string,
        name as string,
        target.value,
        Number(index)
      );
      setContractIsDirty(tempId as string, true);
    };
    const onChangeExportDocumentDateField = (
      value: Date | null,
      name?: string | null,
      index?: number
    ) => {
      setFieldConfirmedDocument(
        tempId as string,
        name as string,
        value,
        index as number
      );
      setContractIsDirty(tempId as string, true);
    };
    const onChangeExportDocumentCheckboxField = (
      name: string,
      value: boolean,
      index: number
    ) => {
      setFieldConfirmedDocument(
        tempId as string,
        name as string,
        value,
        index as number
      );
      setContractIsDirty(tempId as string, true);
    };

    const onAddTnCode = () => {
      addTnCode(tempId as string);
      setFields();
      setContractIsDirty(tempId as string, true);
    };
    const onDeleteTnCode = (index: number) => {
      deleteTnCode(tempId as string, index);
      setFields();
      setContractIsDirty(tempId as string, true);
    };
    const onAddConfirmedDocument = () => {
      addConfirmedDocument(tempId as string);
      setFields();
      setContractIsDirty(tempId as string, true);
    };
    const onDeleteConfirmedDocument = (index: number) => {
      deleteConfirmedDocument(tempId as string, index);
      setFields();
      setContractIsDirty(tempId as string, true);
    };

    const {
      control,
      reset,
      trigger,
      setValue,
      formState: {isValid},
    } = useFormContext();

    const [
      isOpenBackgroundInformation,
      setIsOpenBackgroundInformation,
    ] = useUniqueState<boolean>(false);
    const [isOpenTnCodes, setIsOpenTnCodes] = useUniqueState<boolean>(false);
    const [isOpenExportDocuments, setIsOpenExportDocuments] = useUniqueState<
      boolean
    >(false);

    const [
      namesFieldsBackgroundInformation,
      setNamesFieldsBackgroundInformation,
    ] = useState<string[]>([]);
    const [namesFieldsTnCodes, setNamesFieldsTnCodes] = useState<string[]>([]);
    const [
      namesFieldsExportDocuments,
      setNamesFieldsExportDocuments,
    ] = useState<string[]>([]);

    useEffect(() => {
      const openSectionWithErrors = (names: any[], setOpen: Function) => {
        names.forEach((name) => {
          if (control.formStateRef.current.errors[name]) {
            setOpen(true);
          }
        });
      };
      openSectionWithErrors(
        namesFieldsBackgroundInformation,
        setIsOpenBackgroundInformation
      );
      openSectionWithErrors(namesFieldsTnCodes, setIsOpenTnCodes);
      openSectionWithErrors(
        namesFieldsExportDocuments,
        setIsOpenExportDocuments
      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSavingForm]);

    const setFields = () => {
      setMainInfo();
      setTnCodes();
      setConfirmedDocuments();
      setTimeout(trigger);
    };
    const setMainInfo = () => {
      const {confirmedDocuments, tnCodes, ...mainInfoData} = data;
      const values = getDefaultFormValues<ICFADraftExportContractDTO>(
        mainInfoData as ICFADraftExportContractDTO,
        ICFADraftExportContractEmpty
      );
      reset(values);
      setValue(
        'dateOfExportContract',
        getDateWithFrontEndFormat(data.dateOfExportContract)
      );
      setValue(
        'revenuePlannedDate',
        getDateWithFrontEndFormat(data.revenuePlannedDate)
      );
    };
    const setTnCodes = () => {
      tnCodes.forEach((tnCode, index) => {
        setValue(`tnCode-${index}`, tnCode.code);
      });
    };
    const setConfirmedDocuments = () => {
      confirmedDocuments.forEach((doc, index) => {
        setValue(`name-${index}`, doc.name);
        setValue(`confirmedId-${index}`, doc.confirmedId);
        setValue(`amount-${index}`, doc.amount);
        setValue(`date-${index}`, getDateWithFrontEndFormat(doc.date));
        setValue(`isTransport-${index}`, doc.isTransport);
      });
    };

    useUpdateEffect(() => {
      setContractIsValid(tempId as string, isValid);
    }, [isValid]);

    useEffect(() => {
      setFields();
      // eslint-disable-next-line
    }, []);

    useEffect(() => {
      return () => {
        reset(ICFADraftExportContractEmpty);
      };
    }, [reset]);

    useUpdateEffect(() => {
      setContractIsValid(tempId as string, isValid);
    }, [isValid]);

    return (
      <Form className="cfa-export-contract-edit-form">
        <FormSection
          title="1. Общая информация"
          collapsible
          isOpen={isOpenBackgroundInformation}
        >
          <FormWrapperGetNamesFields
            handler={(names: string[]) => {
              setNamesFieldsBackgroundInformation(names);
            }}
          >
            <FormField title="Номер экспортного контракта">
              <TextFieldControlUseForm
                name="numberOfExportContract"
                isEdit={isEdit}
                placeholder="Введите значение"
                style={{width: FIELD_LG}}
                rules={{
                  required: 'Поле обязательно для заполнения',
                  pattern: /^[\s\S]+$/,
                  maxLength: 100,
                }}
                onChange={onChangeTextField}
              />
            </FormField>
            <FormField title="Дата экспортного контракта">
              <DateFieldControlUseForm
                name="dateOfExportContract"
                isEdit={isEdit}
                style={{width: FIELD_XS}}
                placeholder="дд.мм.гггг"
                rules={{required: 'Поле обязательно для заполнения'}}
                onChange={onChangeDateField}
              />
            </FormField>
            <FormField title="Наименование компании покупателя">
              <TextFieldControlUseForm
                name="buyerCompanyName"
                isEdit={isEdit}
                style={{width: FIELD_LG}}
                placeholder="Введите наименование"
                rules={{required: 'Поле обязательно для заполнения'}}
                onChange={onChangeTextField}
              />
            </FormField>
            <FormField title="Страна поставки">
              <Autocomplete
                freeSolo
                value={data?.deliveryCountry}
                options={
                  countriesList?.items.map(
                    (item: IDictionaryCountriesDTO) => item.shortName
                  ) || []
                }
                onInputChange={(e, value) => {
                  getCountries({limit: 5, query: value});
                  setField(data.tempId as string, 'deliveryCountry', value);
                }}
                renderInput={(options) => {
                  return (
                    <TextFieldControlUseForm
                      {...options}
                      name="deliveryCountry"
                      isEdit={isEdit}
                      style={{width: FIELD_LG}}
                      placeholder="Введите наименование"
                      rules={{required: 'Поле обязательно для заполнения'}}
                      onChange={onChangeTextField}
                    />
                  );
                }}
              />
            </FormField>
            <FormField title="Плановая дата поступления выручки">
              <DateFieldControlUseForm
                name="revenuePlannedDate"
                isEdit={isEdit}
                style={{width: FIELD_XS}}
                placeholder="дд.мм.гггг"
                rules={{required: 'Поле обязательно для заполнения'}}
                onChange={onChangeDateField}
              />
            </FormField>
            <FormField title="Сумма, приходящаяся на ТН ВЭДы (RUB)">
              <TextFieldControlUseForm
                name="tnSumm"
                isEdit={isEdit}
                style={{width: FIELD_LG}}
                placeholder="Введите значение"
                rules={{required: 'Поле обязательно для заполнения'}}
                onChange={onChangeTextField}
              />
            </FormField>
          </FormWrapperGetNamesFields>
        </FormSection>
        <FormSection title="2. ТН ВЭД коды" collapsible isOpen={isOpenTnCodes}>
          <FormWrapperGetNamesFields
            handler={(names: string[]) => {
              setNamesFieldsTnCodes(names);
            }}
          >
            {Array.isArray(tnCodes) && tnCodes.length > 0
              ? tnCodes.map((tnCode, index) => (
                  <FormField
                    key={index}
                    className="cfa-export-contract-edit-form__tn-code"
                  >
                    <TextFieldControlUseForm
                      inputProps={{'data-index': index}}
                      name={`tnCode-${index}`}
                      placeholder="Введите значение"
                      isEdit={isEdit}
                      style={{width: FIELD_SM}}
                      rules={{required: 'Поле обязательно для заполнения'}}
                      onChange={onChangeTnCode}
                    />
                    {isEdit && index > 0 && (
                      <DeleteIcon
                        className="delete-icon"
                        onClick={() => onDeleteTnCode(index)}
                      />
                    )}
                  </FormField>
                ))
              : null}
          </FormWrapperGetNamesFields>
          {isEdit ? (
            <div className="link form-field" onClick={onAddTnCode}>
              + Добавить код
            </div>
          ) : null}
        </FormSection>
        <FormSection
          title="3. Экспортные документы"
          collapsible
          isOpen={isOpenExportDocuments}
        >
          <FormWrapperGetNamesFields
            handler={(names: string[]) => {
              setNamesFieldsExportDocuments(names);
            }}
          >
            {Array.isArray(confirmedDocuments) && confirmedDocuments.length > 0
              ? confirmedDocuments.map((doc, index) => (
                  <div
                    key={index}
                    className="cfa-export-contract-edit-form__confirmed-document"
                  >
                    <FormField title="Наименование документа">
                      <TextFieldControlUseForm
                        inputProps={{
                          'data-index': index,
                          'data-name': 'name',
                        }}
                        name={`name-${index}`}
                        placeholder="Введите наименование"
                        isEdit={isEdit}
                        style={{width: FIELD_LG}}
                        rules={{required: 'Поле обязательно для заполнения'}}
                        onChange={onChangeExportDocumentTextField}
                      />
                      {isEdit && index > 0 && (
                        <DeleteIcon
                          className="delete-icon"
                          onClick={() => onDeleteConfirmedDocument(index)}
                        />
                      )}
                    </FormField>
                    <FormField title="Номер документа">
                      <TextFieldControlUseForm
                        inputProps={{
                          'data-index': index,
                          'data-name': 'confirmedId',
                        }}
                        name={`confirmedId-${index}`}
                        isEdit={isEdit}
                        style={{width: FIELD_LG}}
                        rules={{required: 'Поле обязательно для заполнения'}}
                        placeholder="Введите наименование"
                        onChange={onChangeExportDocumentTextField}
                      />
                    </FormField>
                    <FormField title="Сумма документа (RUB)">
                      <TextFieldControlUseForm
                        inputProps={{
                          'data-index': index,
                          'data-name': 'amount',
                        }}
                        name={`amount-${index}`}
                        isEdit={isEdit}
                        style={{width: FIELD_LG}}
                        rules={{required: 'Поле обязательно для заполнения'}}
                        placeholder="Введите значение"
                        onChange={onChangeExportDocumentTextField}
                      />
                    </FormField>
                    <FormField title="Дата документа">
                      <DateFieldControlUseForm
                        inputProps={{
                          'data-index': index,
                        }}
                        name={`date-${index}`}
                        isEdit={isEdit}
                        style={{width: FIELD_XS}}
                        placeholder="дд.мм.гггг"
                        rules={{required: 'Поле обязательно для заполнения'}}
                        onChange={(value) =>
                          onChangeExportDocumentDateField(value, 'date', index)
                        }
                      />
                    </FormField>
                    <FormField
                      title={isEdit ? undefined : 'Транспортный документ'}
                    >
                      <CheckboxFieldControlUseForm
                        name={`isTransport-${index}`}
                        label="Транспортный документ"
                        isEdit={isEdit}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          onChangeExportDocumentCheckboxField(
                            'isTransport',
                            e.target.checked,
                            index
                          )
                        }
                      />
                    </FormField>
                  </div>
                ))
              : null}

            {isEdit ? (
              <div className="link form-field" onClick={onAddConfirmedDocument}>
                + Добавить документ
              </div>
            ) : null}
          </FormWrapperGetNamesFields>
        </FormSection>
      </Form>
    );
  }
);
