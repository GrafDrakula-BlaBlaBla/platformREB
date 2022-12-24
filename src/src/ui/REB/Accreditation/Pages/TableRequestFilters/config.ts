import {getSelectItems} from '../../../../../Utils/Enum/getSelectItems';
import {EAccreditationStatusNames} from '../../../../../Model/Accreditation';

const statusSelectItems = getSelectItems(EAccreditationStatusNames);
statusSelectItems.unshift({
  label: 'Все статусы',
  value: undefined,
});
export const statusSelectParams = {
  label: 'Статус',
  name: 'inStatuses',
  items: statusSelectItems,
};
