import React, {FC} from 'react';
import {createStyles, makeStyles, Tooltip} from '@material-ui/core';
import Fade from '@material-ui/core/Fade';
import Help from '@material-ui/icons/Help';
import {ClassNameInjection} from '../../../../Utils/ClassNames/ClassNameInjection';
import './index.less';

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

export interface IFormFieldProps {
  title?: string | JSX.Element;
  info?: string;
  htmlFor?: string;
  align?: string;
  isRow?: boolean;
  className?: string;
  error?: boolean;
  success?: boolean;
  disabled?: boolean;
}

export const FormField: FC<IFormFieldProps> = (props) => {
  const {
    title,
    info,
    htmlFor,
    align,
    children,
    isRow,
    error,
    success,
    className,
    disabled,
  } = props;
  const clsTooltip = useStyles();

  const clsMain = ClassNameInjection(
    'form-field',
    isRow ? 'form-field_row' : undefined,
    className ? className : undefined,
    disabled ? 'form-field_disabled' : undefined
  );
  const clsLabel = ClassNameInjection(
    'form-field__label',
    error ? 'form-field__label-error' : undefined,
    success ? 'form-field__label-success' : undefined
  );
  const clsContent = ClassNameInjection(
    'form-field__content',
    align ? `form-field__content_${align}` : undefined
  );

  return (
    <div className={clsMain}>
      {title || info ? (
        <div className="form-field__title">
          {title ? (
            <label className={clsLabel} htmlFor={htmlFor}>
              {title}
            </label>
          ) : null}
          {info ? (
            <Tooltip
              title={info}
              placement="top-start"
              TransitionProps={{timeout: 400}}
              TransitionComponent={Fade}
              classes={{
                tooltip: clsTooltip.tooltip,
              }}
            >
              <div className="form-field__help">
                <Help />
              </div>
            </Tooltip>
          ) : null}
        </div>
      ) : null}
      {children && <div className={clsContent}>{children}</div>}
    </div>
  );
};
