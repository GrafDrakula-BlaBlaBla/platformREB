import React from 'react';
import {fireEvent, render} from '@testing-library/react';
import {
  defaultSMSCodeChar,
  SMSCodeFieldControl,
  SMSCodeFieldControlProps,
} from '../SMSCodeFieldControl';

const maxLength = 4;
const smsCodeFieldControlProps: SMSCodeFieldControlProps = {
  maxLength: maxLength,
  onChange: (array: string[], value: string, name?: string) => {},
};

const testName = 'SMSCodeFieldControl test';
const testValue = '1234';
const testValueArray = testValue.toString().split('');

test(testName, () => {
  const {rerender, getAllByTestId} = render(
    <SMSCodeFieldControl
      {...smsCodeFieldControlProps}
      data-testid="SMSCodeFieldControlTest"
    />
  );

  const controls = getAllByTestId('SMSCodeFieldControlTest');
  for (let i = 0; i < maxLength; i++) {
    const input = controls[i].querySelector(
      'input[type="text"]'
    ) as HTMLInputElement;
    expect(input.value).toBe('');
  }

  // test inputs
  for (let i = 0; i < maxLength; i++) {
    smsCodeFieldControlProps.onChange = (array: string[], value: string) => {
      const expectedValue = testValueArray.reduce((prev, cur, index) => {
        return prev + (index <= i ? cur : defaultSMSCodeChar);
      }, '');
      expect(value).toBe(expectedValue);
      expect(array[i]).toBe(testValueArray[i]);
    };
    rerender(<SMSCodeFieldControl {...smsCodeFieldControlProps} />);
    const input = controls[i].querySelector(
      'input[type="text"]'
    ) as HTMLInputElement;
    fireEvent.change(input, {
      target: {value: testValueArray[i]},
    });
    expect(input.value).toBe(testValueArray[i]);
  }
});
