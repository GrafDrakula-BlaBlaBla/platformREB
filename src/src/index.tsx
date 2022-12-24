import React from 'react';
import ReactDOM from 'react-dom';
import 'reflect-metadata';
import {Container} from 'inversify';
import {App} from './ui/app';
import './ui/styles/index.less';

export type RouterDependencies = Record<string, Container>;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
