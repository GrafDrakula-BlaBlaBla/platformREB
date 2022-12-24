import React from 'react';
import {Button, IButtonProps} from '../../SimpleComponents/Button';
import {DropDown} from '../../SimpleComponents/DropDown';

interface IProps {
  className?: string;
  numberVisibleButton?: number;
  buttonsConfig: IButtonProps[];
}

export const PageLayoutHeaderButtons = ({
  className,
  numberVisibleButton = 1,
  buttonsConfig,
}: IProps) => {
  const cls = ['page-layout__header-buttons'];
  if (className) cls.push(className);
  return (
    <div className={cls.join(' ')}>
      {rednerButtonsGroup(numberVisibleButton, buttonsConfig)}
    </div>
  );
};

function rednerButtonsGroup(
  numberVisibleButton: number,
  buttonsConfig: IButtonProps[]
): Array<JSX.Element | null> {
  const visibleActions = buttonsConfig.slice(0, numberVisibleButton);
  const dropDownActions = buttonsConfig.slice(
    numberVisibleButton,
    buttonsConfig.length
  );

  return [
    ...renderVisibleButtons(visibleActions),
    renderDropDownButtons(dropDownActions),
  ];
}

function renderVisibleButtons(buttonsConfig: IButtonProps[]): JSX.Element[] {
  return buttonsConfig.map((buttonConfig, index) => {
    return <Button key={index} {...buttonConfig} />;
  });
}

function renderDropDownButtons(
  buttonsConfig: IButtonProps[]
): JSX.Element | null {
  if (buttonsConfig.length === 0) return null;
  return (
    <DropDown
      key="DropDown"
      menuItems={buttonsConfig.map((button, index) => {
        return (
          <Button key={index} {...button} variant="text" color="default" />
        );
      })}
    />
  );
}
