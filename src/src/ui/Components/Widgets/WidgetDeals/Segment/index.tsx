import React, {useState, FC, useEffect} from 'react';
import {CheckboxFieldControl} from '../../../../Common/FieldControls';
import {TagSegment} from '../TagSegment';
import {ClassNameInjection} from '../../../../../Utils/ClassNames/ClassNameInjection';
import './index.less';

interface ITegData {
  label: string;
  value: string | number;
  name: string;
  checked: boolean;
}

interface ISegmentProp {
  className?: string;
  title: string;
  data: ITegData[];
  onChange: (data: ITegData[]) => void;
}

export const Segment: FC<ISegmentProp> = ({
  className,
  title,
  data,
  onChange,
}) => {
  const [tags, setTags] = useState<ITegData[]>(data);

  const isAllChecked = tags.every(({checked}) => checked);

  useEffect(() => {
    onChange(tags);
    // eslint-disable-next-line
  }, [tags]);

  useEffect(() => {
    setTags(data);
  }, [data]);

  return (
    <div className={ClassNameInjection('segment', className)}>
      <div className="segment-title">
        <span>{title}</span>
        <CheckboxFieldControl
          label="Выбрать все"
          value={isAllChecked}
          onChange={(e, checked) =>
            setTags(tags.map((el) => ({...el, checked: checked})))
          }
        />
      </div>
      <div className="segment-content">
        {tags.map((el, i) => {
          return (
            <TagSegment
              key={i}
              label={el.label}
              value={el.value}
              onClick={() => {
                el.checked = !el.checked;
                setTags(tags.slice());
              }}
              checked={el.checked}
            />
          );
        })}
      </div>
    </div>
  );
};
