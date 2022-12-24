import React from 'react';
import {FormField, FormSection} from '../../../../../Common/FormComponents';
import {SwitchFieldControl} from '../../../../../Common/FieldControls';
import {Skeleton} from '@material-ui/lab';
import useViewModel from '../../../../../hooks/useViewModel';
import {IBankSettingsViewModel} from '../../../../../../ViewModel/viewModels/Banks';
import {VIEW_MODEL} from '../../../../../../ViewModel/identifiers';
import {observer} from 'mobx-react-lite';
import './index.less';

export const BankSettingsProducts = observer(() => {
  const {products, loadingProducts: loading} = useViewModel<
    IBankSettingsViewModel
  >(VIEW_MODEL.BankSettings);
  return loading ? (
    <FormSection title="3. Доступные продукты">
      <FormField>
        <Skeleton width={180} />
      </FormField>
      <FormField>
        <Skeleton width={180} />
      </FormField>
    </FormSection>
  ) : (
    <FormSection
      title="3. Доступные продукты"
      className="bank-settings-products"
    >
      {products?.map((product) => (
        <FormField key={product.type}>
          <SwitchFieldControl
            value={product.isActivated}
            label={product.title}
            disabled
          />
        </FormField>
      ))}
    </FormSection>
  );
});
