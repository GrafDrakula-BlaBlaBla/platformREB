import React from 'react';
import {creditColor} from '../creditColor';
import './index.less';

const descriptionInfo = [
  {
    text: 'Аккредитив (Генеральные соглашения)',
    color: creditColor.generalAgreement,
  },
  {
    text: 'Кредитная линия',
    color: creditColor.creditAgreement,
  },
  {
    text: 'Отклонение',
    color: creditColor.difference,
  },
];

const CreditDescription = () => (
  <div className="credit-description">
    {descriptionInfo.map(({text, color}) => (
      <div className="credit-description__item" key={text}>
        <span
          className={'credit-description__box'}
          style={{backgroundColor: color}}
        />
        <span className="credit-description__text">{text}</span>
      </div>
    ))}
  </div>
);

export default CreditDescription;
