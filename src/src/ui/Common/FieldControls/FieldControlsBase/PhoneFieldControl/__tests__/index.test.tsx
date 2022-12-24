import React from 'react';
import {fireEvent, render} from '@testing-library/react';
import {PhoneFieldControl, PhoneFieldControlProps} from '../PhoneFieldControl';

const phoneFieldControlProps: PhoneFieldControlProps = {
  value: '',
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => {},
};

const testName = 'PhoneFieldControl test';
const testValue = 1234567890123;
const testValueExpected = '+7 (123) 456-78-90';

test(testName, () => {
  const {rerender, getByTestId} = render(
    <PhoneFieldControl
      {...phoneFieldControlProps}
      data-testid="phoneFieldControlTest"
    />
  );

  let input = getByTestId('phoneFieldControlTest') as HTMLInputElement;
  input = input.childNodes[0].childNodes[0] as HTMLInputElement;
  expect(input.value).toBe('');

  // test onChange
  phoneFieldControlProps.onChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    expect(e.target.value).toBe(String(testValue).substr(0, 10));
    rerender(
      <PhoneFieldControl {...phoneFieldControlProps} value={e.target.value} />
    );
  };
  rerender(<PhoneFieldControl {...phoneFieldControlProps} />);
  fireEvent.change(input, {target: {value: testValue}});
  expect(input.value).toBe(testValueExpected);
});
