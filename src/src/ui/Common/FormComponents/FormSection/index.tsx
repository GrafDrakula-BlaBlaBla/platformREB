import React, {FC, useEffect, useState} from 'react';
import {createStyles, makeStyles, Tooltip} from '@material-ui/core';
import Fade from '@material-ui/core/Fade';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Help from '@material-ui/icons/Help';
import './index.less';
import {ClassNameInjection} from '../../../../Utils/ClassNames/ClassNameInjection';
import {uniqueStateType} from '../../../hooks/useUniqueState';

const useStyles = makeStyles(() =>
  createStyles({
    tooltip: {
      maxWidth: 280,
      backgroundColor: '#565B63',
      fontSize: '14px',
      padding: '16px',
      textAlign: 'left',
      marginLeft: '-40px',
      marginBottom: '7px',
      borderRadius: '6px',
    },
  })
);

export interface IFormSectionProps {
  title?: string | JSX.Element;
  subtitle?: string | JSX.Element;
  titleClassName?: string;
  align?: string;
  info?: string;
  className?: string;
  rightBlock?: JSX.Element;
  collapsible?: boolean;
  isOpen?: boolean | uniqueStateType<boolean>;
}

export const FormSection: FC<IFormSectionProps> = (props) => {
  const {
    title,
    subtitle,
    titleClassName,
    align,
    info,
    className,
    rightBlock,
    collapsible,
    isOpen = true,
    children,
  } = props;
  const classes = useStyles();

  const getValueIsOpen = (isOpen: boolean | uniqueStateType<boolean>) => {
    if (isOpen instanceof Object) {
      return isOpen.current;
    }
    return isOpen;
  };

  const [isCollapse, setIsCollapse] = useState<boolean | undefined>(
    !getValueIsOpen(isOpen)
  );

  useEffect(() => {
    if (isOpen instanceof Object) {
      if (isOpen.current !== !isCollapse) {
        setIsCollapse(!isOpen);
      }
    } else {
      if (isOpen !== !isCollapse) {
        setIsCollapse(!isOpen);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const clsMain = ClassNameInjection('form-section', className, {
    'form-section_collapsible': !!collapsible,
    'form-section_collapsed': !!isCollapse,
  });

  const clsTitle = ClassNameInjection('form-section__title', titleClassName);

  const clsContent = ClassNameInjection('form-section__content', {
    [`form-section__content_${align}`]: !!align,
    'form-section__content_collapsed': !!(collapsible && isCollapse),
  });

  const collapseClick = () => {
    if (collapsible) setIsCollapse(!isCollapse);
  };

  return (
    <div className={clsMain}>
      {title || info || rightBlock ? (
        <div className={clsTitle}>
          <div className="form-section__title-left" onClick={collapseClick}>
            <div className="form-section__title-left-text">
              {title ? (
                <label className="form-section__label">{title}</label>
              ) : null}
              {info ? (
                <Tooltip
                  title={info}
                  placement="top-start"
                  TransitionProps={{timeout: 400}}
                  TransitionComponent={Fade}
                  classes={{
                    tooltip: classes.tooltip,
                  }}
                >
                  <div className="form-section__help">
                    <Help />
                  </div>
                </Tooltip>
              ) : null}
            </div>
            {collapsible ? (
              <div className="form-section__title-left-collapse">
                {isCollapse ? <ExpandMore /> : <ExpandLess />}
              </div>
            ) : null}
          </div>
          {rightBlock ? (
            <div className="form-section__title-right">{rightBlock}</div>
          ) : null}
        </div>
      ) : null}
      {subtitle && <div className="form-section__subtitle">{subtitle}</div>}
      <div className={clsContent}>{children}</div>
    </div>
  );
};
