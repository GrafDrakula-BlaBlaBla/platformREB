import React from 'react';
import {fireEvent, render} from '@testing-library/react';
import {
  SwitchFieldControl,
  SwitchFieldControlProps,
} from '../SwitchFieldControl';

const switchFieldControlProps: SwitchFieldControlProps = {
  value: false,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => {},
};

const testName = 'SwitchFieldControl test';
const testValue = true;

test(testName, () => {
  const {rerender, getByTestId} = render(
    <SwitchFieldControl
      {...switchFieldControlProps}
      data-testid="switchFieldControlTest"
    />
  );

  const switchInput = getByTestId('switchFieldControlTest').querySelector(
    'input[type="checkbox"]'
  ) as HTMLInputElement;
  expect(switchInput).toHaveProperty('checked', false);

  // test onChange
  switchFieldControlProps.onChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    expect(e.target.checked as boolean).toBe(testValue);
    rerender(
      <SwitchFieldControl
        {...switchFieldControlProps}
        value={e.target.checked}
      />
    );
  };
  rerender(<SwitchFieldControl {...switchFieldControlProps} />);
  fireEvent.change(switchInput, {target: {checked: testValue}});
  expect(switchInput).toHaveProperty('checked', testValue);
});
