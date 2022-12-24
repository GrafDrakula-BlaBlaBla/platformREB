import React from 'react';
import {PageError} from '../PageError';

export const Page500 = () => (
  <PageError
    className="page-500"
    errorCode="500"
    errorTitle="Что-то пошло не так..."
  />
);
