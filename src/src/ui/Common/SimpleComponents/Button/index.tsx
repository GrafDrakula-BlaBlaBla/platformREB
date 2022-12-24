import React, {FC} from 'react';
import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
} from '@material-ui/core';
import {ClassNameInjection as cn} from '../../../../Utils/ClassNames/ClassNameInjection';
import './index.less';

export type TButtonColorTypes = 'default' | 'blue' | 'red';
export type TButtonSizeTypes = 'default' | 'medium' | 'small';

export type IButtonProps = Omit<MuiButtonProps, 'color' | 'size'> & {
  color?: TButtonColorTypes;
  size?: TButtonSizeTypes;
  whiteTheme?: boolean;
  iconButton?: boolean;
};

export const Button: FC<IButtonProps> = ({
  onClick,
  className = '',
  whiteTheme,
  children,
  variant = 'contained',
  color = 'blue',
  size = 'default',
  iconButton,
  ...other
}) => {
  // @todo: избавиться от параметра whiteTheme
  if (whiteTheme) {
    variant = 'outlined';
    color = 'default';
  }

  return (
    <MuiButton
      onClick={onClick}
      className={cn('btn', {
        [`${className}`]: !!className,
        [`btn_size_${size}`]: !!size,
        [`btn_color_${color}`]: !!color,
        btn_icon: !!iconButton,
      })}
      variant={variant}
      {...other}
    >
      {children}
    </MuiButton>
  );
};
