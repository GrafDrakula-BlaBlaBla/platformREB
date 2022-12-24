import React, {useEffect} from 'react';
import {observer} from 'mobx-react-lite';
import useViewModel from '../../../../hooks/useViewModel';
import {VIEW_MODEL} from '../../../../../ViewModel/identifiers';
import {ICFARequestComViewModel} from '../../../../../ViewModel/viewModels/CFA_Deal/request';
import {CFA_TABS_API, CFA_TABS_MANUAL} from './tabs';
import {CFADetailsApi} from './CFADetailsApi';
import {CFADetailsManual} from './CFADetailsManual';
import {CFADetailsSkeleton} from '../../../../Components/CFA_Deal/CFADetailsSkeleton';

export const CFADetails = observer(() => {
  const {data, loading, isManual, setData} = useViewModel<
    ICFARequestComViewModel
  >(VIEW_MODEL.CFARequest);

  useEffect(() => {
    return () => {
      setData();
    };
  }, [setData]);

  return loading && !Boolean(data) ? (
    <CFADetailsSkeleton />
  ) : isManual ? (
    <CFADetailsManual tabs={CFA_TABS_MANUAL} />
  ) : (
    <CFADetailsApi tabs={CFA_TABS_API} />
  );
});
