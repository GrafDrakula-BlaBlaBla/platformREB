import React, {useEffect} from 'react';
import {observer} from 'mobx-react-lite';
import {VIEW_MODEL} from '../../../../../ViewModel/identifiers';
import {ICFARequestRebViewModel} from '../../../../../ViewModel/viewModels/CFA_Deal/request';
import useViewModel from '../../../../hooks/useViewModel';
import {CFA_TABS_API, CFA_TABS_MANUAL} from './tabs';
import {CFADetailsApi} from './CFADetailsApi';
import {CFADetailsManual} from './CFADetailsManual';
import {CFADetailsSkeleton} from '../../../../Components/CFA_Deal/CFADetailsSkeleton';

export const CFADetails = observer(() => {
  const {data, loading, isManual, setData} = useViewModel<
    ICFARequestRebViewModel
  >(VIEW_MODEL.CFARequest);

  useEffect(() => {
    return () => {
      setData();
    };
  }, [setData]);

  if (loading && !Boolean(data)) {
    return <CFADetailsSkeleton />;
  }
  if (isManual) {
    return <CFADetailsManual tabs={CFA_TABS_MANUAL} />;
  }

  return <CFADetailsApi tabs={CFA_TABS_API} />;
});
