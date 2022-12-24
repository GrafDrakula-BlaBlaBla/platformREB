import React from 'react';
import {getValue} from '../../../../Utils/Enum/getValue';
import useViewModel from '../../../hooks/useViewModel';
import {IDictionaryViewModel} from '../../../../ViewModel/viewModels/Dictionary/interfaces';
import {VIEW_MODEL} from '../../../../ViewModel/identifiers';
import {observer} from 'mobx-react-lite';

interface IWrapperIndividualCategoryProps {
  individualCategory?: string;
}

export const WrapperIndividualCategory = observer(
  (props: IWrapperIndividualCategoryProps) => {
    const {individualCategory} = props;
    const {individualCategories} = useViewModel<IDictionaryViewModel>(
      VIEW_MODEL.Dictionary
    );
    return individualCategory ? (
      <span>{getValue(individualCategories, individualCategory)}</span>
    ) : (
      <span className="color-gray">Не указано</span>
    );
  }
);
