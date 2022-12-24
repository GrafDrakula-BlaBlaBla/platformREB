import React from 'react';
import {fireEvent, render} from '@testing-library/react';
import {TextFieldControl, TextFieldControlProps} from '../TextFieldControl';

const textFieldControlProps: TextFieldControlProps = {
  placeholder: 'textFieldControlTest',
  value: '',
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => {},
};

const testName = 'TextFieldControl test';
const testValue = 'test';

test(testName, () => {
  const {rerender, getByPlaceholderText} = render(
    <TextFieldControl {...textFieldControlProps} />
  );

  let input = getByPlaceholderText(
    textFieldControlProps.placeholder as string
  ) as HTMLInputElement;
  expect(input.value).toBe('');

  // test onChange
  textFieldControlProps.onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    expect(e.target.value).toBe(testValue);
    rerender(
      <TextFieldControl {...textFieldControlProps} value={e.target.value} />
    );
  };
  rerender(<TextFieldControl {...textFieldControlProps} />);
  fireEvent.change(input, {target: {value: testValue}});
  expect(input.value).toBe(testValue);
});
