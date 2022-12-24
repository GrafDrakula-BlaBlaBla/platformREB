import React, {FC} from 'react';
import {ReactComponent as CheckedIcon} from '../../../../../assets/svg/dashboards/CheckedIcon.svg';
import './index.less';
import {ClassNameInjection} from '../../../../../Utils/ClassNames/ClassNameInjection';

interface ITagSegmentProps {
  className?: string;
  label: string;
  value: string | number;
  checked: boolean;
  onClick: (checked: boolean) => void;
}
export const TagSegment: FC<ITagSegmentProps> = ({
  className,
  label,
  value,
  checked,
  onClick,
}) => {
  return (
    <div
      className={ClassNameInjection(
        checked ? 'tag-segment tag-segment_checked' : 'tag-segment',
        className
      )}
      onClick={() => {
        onClick(checked);
      }}
    >
      <span className="tag-segment_label">{`${label} - ${value}`}</span>
      {checked ? <CheckedIcon /> : null}
    </div>
  );
};
