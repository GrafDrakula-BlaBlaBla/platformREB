import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import {
  ReportDateFieldControl,
  ReportDateFieldControlProps,
  IReportDateValue,
} from '../ReportDateFieldControl';

const reportDateFieldControlProps: ReportDateFieldControlProps = {
  onChange: (value: IReportDateValue) => {},
  setCurrent: false,
};

const testName = 'ReportDateFieldControl test';
const testValue: IReportDateValue = {
  quarter: '3',
  year: {
    start: 2021,
    end: 2023,
  },
};

test(testName, () => {
  const {rerender, getByTestId, getByRole, getByText} = render(
    <ReportDateFieldControl
      {...reportDateFieldControlProps}
      data-testid="ReportDateFieldControlTest"
    />
  );

  const control = getByTestId('ReportDateFieldControlTest');
  const input = control.querySelector('input[type="text"]') as HTMLInputElement;
  expect(input.value).toBe('');

  // test onChange
  reportDateFieldControlProps.onChange = (value: IReportDateValue) => {
    expect(value.quarter).toBe(testValue.quarter);
    expect(value.year.start).toBeUndefined();
    expect(value.year.end).toBeUndefined();
    reportDateFieldControlProps.value = value;
    rerender(<ReportDateFieldControl {...reportDateFieldControlProps} />);
  };
  rerender(<ReportDateFieldControl {...reportDateFieldControlProps} />);

  // get calendar button
  const button = getByRole('button');
  expect(button).toBeTruthy();
  fireEvent.click(button);

  // test quarter click
  const radiogroup = screen.getByRole('radiogroup');
  expect(radiogroup).toBeTruthy();
  fireEvent.click(getByText('1, 2, 3 квартал'));
  expect(input.value).toBe('3 кв');

  // get button years
  const btnCurr = screen.getByRole('btn-curr');
  expect(btnCurr).toBeTruthy();
  fireEvent.click(btnCurr);

  // get buttongroup years
  const years = screen.getByRole('years');
  expect(years).toBeTruthy();

  // test 2021 click
  const btn2021 = screen.getByText('2021').parentElement as HTMLButtonElement;
  expect(btn2021).toBeTruthy();
  reportDateFieldControlProps.onChange = (value: IReportDateValue) => {
    expect(value.quarter).toBe(testValue.quarter);
    expect(value.year.start).toBe(2021);
    expect(value.year.end).toBe(2021);
    reportDateFieldControlProps.value = value;
    rerender(<ReportDateFieldControl {...reportDateFieldControlProps} />);
  };
  rerender(<ReportDateFieldControl {...reportDateFieldControlProps} />);
  fireEvent.click(btn2021);
  expect(input.value).toBe('3 кв, 2021');

  // test 2023 click
  // const btn2023 = screen.getByText('2023').parentElement as HTMLButtonElement;
  // expect(btn2023).toBeTruthy();
  // reportDateFieldControlProps.onChange = (value: IReportDateValue) => {
  //   expect(value.quarter).toBe(testValue.quarter);
  //   expect(value.year.start).toBe(2022);
  //   expect(value.year.end).toBe(2023);
  //   reportDateFieldControlProps.value = value;
  //   rerender(
  //     <ReportDateFieldControl {...reportDateFieldControlProps} />
  //   );
  // };
  // rerender(<ReportDateFieldControl {...reportDateFieldControlProps} />);
  // fireEvent.click(btn2023);
  // expect(input.value).toBe('3 кв, 2022 - 2023');
});
