import React, {FC, useEffect, useState} from 'react';
import {observer} from 'mobx-react-lite';
import useViewModel from '../../../hooks/useViewModel';
import {VIEW_MODEL} from '../../../../ViewModel/identifiers';
import {IDictionaryViewModel} from '../../../../ViewModel/viewModels/Dictionary/interfaces';
import {TableFilterPopover} from '../../../Common/TableComponents';
import {Form, FormField} from '../../../Common/FormComponents';
import {
  CheckboxFieldControl,
  MultiSelectExtFieldControl,
} from '../../../Common/FieldControls';
import {SelectItemsFromDictionary} from '../../../Common/FieldControls/FieldControlsBase/SelectFieldControl/SelectItemsFromDictionary';
import {useFilters} from '../../../hooks/useFilters';
import {useRoute} from 'react-router5';
import {CFAUsersSelectFieldControl} from '../../CFA_Deal/CFAUsersSelectFieldControl';
import {ICFAListViewModel} from '../../../../ViewModel/viewModels/CFA_Deal/list';
import './index.less';

export const CFAFilterDeals: FC = observer(() => {
  const {
    cfaStatuses,
    individualCategories,
    territorialBanksDictionary,
  } = useViewModel<IDictionaryViewModel>(VIEW_MODEL.Dictionary);

  const {availableUsers} = useViewModel<ICFAListViewModel>(VIEW_MODEL.CFAList);

  const {filters, setFilterObject} = useFilters();
  const {route} = useRoute();

  // query
  const nameQuery = 'query';

  // closed
  const nameClosed = 'dontShowClosedGA';
  const [valueClosed, setValueClosed] = useState<boolean>(filters[nameClosed]);

  // status
  const nameStatus = 'status';
  const [valueStatus, setValueStatus] = useState<string[]>(filters[nameStatus]);

  // responsible
  const nameResponsible = 'assignedEmployees';
  const [valueResponsible, setValueResponsible] = useState<string[]>(
    filters[nameResponsible]
  );

  // segment
  const nameSegment = 'individualCategory';
  const [valueSegment, setValueSegment] = useState<string[]>(
    filters[nameSegment]
  );

  // region
  const nameRegion = 'tb';
  const [valueRegion, setValueRegion] = useState<string[]>(filters[nameRegion]);

  useEffect(() => {
    setValueClosed(filters[nameClosed]);
    setValueStatus(filters[nameStatus] || []);
    setValueResponsible(filters[nameResponsible] || []);
    setValueSegment(filters[nameSegment] || []);
    setValueRegion(filters[nameRegion] || []);
  }, [filters]);

  // apply filters
  const isApplied =
    filters[nameClosed] || filters[nameStatus] || filters[nameResponsible];

  const onApply = () => {
    const obj: Record<string, any> = {};
    obj[nameClosed] = valueClosed;
    obj[nameStatus] = valueStatus;
    obj[nameResponsible] = valueResponsible;
    obj[nameSegment] = valueSegment;
    obj[nameRegion] = valueRegion;
    setFilterObject(obj, route.name);
  };
  const onCancel = () => {
    const obj: Record<string, any> = {};
    obj[nameQuery] = '';
    obj[nameStatus] = '';
    obj[nameClosed] = false;
    obj[nameResponsible] = '';
    obj[nameSegment] = '';
    obj[nameRegion] = '';
    setFilterObject(obj, route.name);
  };

  return (
    <TableFilterPopover
      placeholder="?????????? ???? ID ???????????? ?????? ????????????????????"
      name={nameQuery}
      isApplied={isApplied}
      onApply={onApply}
      onCancel={onCancel}
      classNamePopover="cfa-filter-deals__popover"
    >
      <Form>
        <FormField>
          <CheckboxFieldControl
            label="???? ???????????????????? ???????????????? ??????????????????????"
            value={valueClosed}
            onChange={(e) => setValueClosed(e.target.checked)}
          />
        </FormField>
        <FormField title="???????????? ????????????">
          <MultiSelectExtFieldControl
            searchPlaceholder="?????????????? ?????????????? ????????????"
            value={valueStatus}
            placeholder="???????????????? ???????????? ????????????"
            items={SelectItemsFromDictionary(cfaStatuses)}
            onChange={(value) => setValueStatus(value as string[])}
            multiple
          />
        </FormField>
        <FormField title="??????????????????????????">
          <CFAUsersSelectFieldControl
            value={valueResponsible}
            items={availableUsers}
            onChange={(values) => setValueResponsible(values as string[])}
            onSave={() => {}}
            onCancel={() => setValueResponsible([])}
          />
        </FormField>
        <FormField title="??????????????">
          <MultiSelectExtFieldControl
            searchPlaceholder="?????????????? ?????????????? ??????????????"
            value={valueSegment}
            placeholder="???????????????? ??????????????"
            items={SelectItemsFromDictionary(individualCategories)}
            onChange={(value) => setValueSegment(value as string[])}
            multiple
          />
        </FormField>
        <FormField title="????????????">
          <MultiSelectExtFieldControl
            searchPlaceholder="?????????????? ?????????????? ????????????"
            value={valueRegion}
            placeholder="???????????????? ????????????"
            items={SelectItemsFromDictionary(territorialBanksDictionary)}
            onChange={(value) => setValueRegion(value as string[])}
            multiple
          />
        </FormField>
      </Form>
    </TableFilterPopover>
  );
});
