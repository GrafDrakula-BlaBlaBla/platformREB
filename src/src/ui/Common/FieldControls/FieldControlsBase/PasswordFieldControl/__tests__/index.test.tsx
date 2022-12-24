import React from 'react';
import {fireEvent, render} from '@testing-library/react';
import {
  PasswordFieldControl,
  PasswordFieldControlProps,
} from '../PasswordFieldControl';

const passwordFieldControlProps: PasswordFieldControlProps = {
  placeholder: 'passwordFieldControlTest',
  value: '',
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => {},
};

const testName = 'PasswordFieldControl test';
const testValue = '1qaz@WSX';

test(testName, () => {
  const {rerender, getByPlaceholderText} = render(
    <PasswordFieldControl {...passwordFieldControlProps} />
  );

  let input = getByPlaceholderText(
    passwordFieldControlProps.placeholder as string
  ) as HTMLInputElement;
  expect(input.value).toBe('');

  // test onChange
  passwordFieldControlProps.onChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    expect(e.target.value).toBe(testValue);
    rerender(
      <PasswordFieldControl
        {...passwordFieldControlProps}
        value={e.target.value}
      />
    );
  };
  rerender(<PasswordFieldControl {...passwordFieldControlProps} />);
  fireEvent.change(input, {target: {value: testValue}});
  expect(input.value).toBe(testValue);
});
