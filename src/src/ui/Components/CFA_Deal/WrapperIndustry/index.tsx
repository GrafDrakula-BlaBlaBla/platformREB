import React from 'react';
import {getValue} from '../../../../Utils/Enum/getValue';
import useViewModel from '../../../hooks/useViewModel';
import {IDictionaryViewModel} from '../../../../ViewModel/viewModels/Dictionary/interfaces';
import {VIEW_MODEL} from '../../../../ViewModel/identifiers';
import {observer} from 'mobx-react-lite';

interface IWrapperIndustryProps {
  industry?: string;
}

export const WrapperIndustry = observer((props: IWrapperIndustryProps) => {
  const {industry} = props;
  const {cfaIndustries} = useViewModel<IDictionaryViewModel>(
    VIEW_MODEL.Dictionary
  );
  return industry ? (
    <span>{getValue(cfaIndustries, industry)}</span>
  ) : (
    <span className="color-gray">Не указано</span>
  );
});
