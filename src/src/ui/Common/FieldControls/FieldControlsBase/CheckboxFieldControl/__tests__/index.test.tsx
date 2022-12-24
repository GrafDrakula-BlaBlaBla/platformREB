import React from 'react';
import {fireEvent, render} from '@testing-library/react';
import {
  CheckboxFieldControl,
  CheckboxFieldControlProps,
} from '../CheckboxFieldControl';

const checkboxFieldControlProps: CheckboxFieldControlProps = {
  value: false,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => {},
};

const testName = 'CheckboxFieldControl test';
const testValue = true;

test(testName, () => {
  const {rerender, getByTestId} = render(
    <CheckboxFieldControl
      {...checkboxFieldControlProps}
      data-testid="checkboxFieldControlTest"
    />
  );

  const checkbox = getByTestId('checkboxFieldControlTest').querySelector(
    'input[type="checkbox"]'
  ) as HTMLInputElement;
  expect(checkbox).toHaveProperty('checked', false);

  // test onChange
  checkboxFieldControlProps.onChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    expect(e.target.checked as boolean).toBe(testValue);
    rerender(
      <CheckboxFieldControl
        {...checkboxFieldControlProps}
        value={e.target.checked}
      />
    );
  };
  rerender(<CheckboxFieldControl {...checkboxFieldControlProps} />);
  fireEvent.change(checkbox, {target: {checked: testValue}});
  expect(checkbox).toHaveProperty('checked', testValue);
});
