import React, {useState} from 'react';
import {ExpandMore, ExpandLess} from '@material-ui/icons';
import {ClassNameInjection as cn} from '../../../../Utils/ClassNames/ClassNameInjection';
import './index.less';

export enum NOTIFY_TYPE {
  transparent = 'transparent',
  success = 'success',
  warning = 'warning',
  error = 'error',
}
interface INotifyProps {
  type?: NOTIFY_TYPE;
  text?: string | JSX.Element;
  icon?: JSX.Element;
  iconExpanded?: JSX.Element;
  className?: string;
  verticalAlign?: 'top' | 'center' | 'bottom';
  textExpanded?: string | JSX.Element;
  isExpanded?: boolean;
}

export const Notify = (props: INotifyProps) => {
  const {
    type,
    text,
    icon,
    iconExpanded,
    className,
    verticalAlign = 'top',
    textExpanded,
    isExpanded = false,
  } = props;
  const [expanded, setExpanded] = useState<boolean>(isExpanded);

  return (
    <div
      className={cn('notify', {
        [`${className}`]: !!className,
        [`notify_align_${verticalAlign}`]: !!verticalAlign,
        [`notify_${type}`]: !!type,
        notify_collapsible: Boolean(textExpanded),
      })}
    >
      <div
        className="notify__header"
        onClick={textExpanded ? () => setExpanded(!expanded) : undefined}
      >
        {textExpanded && expanded ? (
          iconExpanded ? (
            <div className="notify__header-icon">{iconExpanded}</div>
          ) : (
            icon && <div className="notify__header-icon">{icon}</div>
          )
        ) : (
          icon && <div className="notify__header-icon">{icon}</div>
        )}
        {text && <div className="notify__header-text">{text}</div>}
        {textExpanded && (
          <div className="notify__header-arrow">
            {expanded ? (
              <ExpandLess onClick={() => setExpanded(false)} />
            ) : (
              <ExpandMore onClick={() => setExpanded(true)} />
            )}
          </div>
        )}
      </div>
      {textExpanded && expanded && (
        <div className="notify__content">{textExpanded}</div>
      )}
    </div>
  );
};
