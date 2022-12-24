import numeral from 'numeral';
import React from 'react';
import {IWidgetCreditMappedInfoKey} from '../../../../../Model/Widgets/WidgetCredit';
import {creditColor} from '../creditColor';

export enum barType {
  generalAgreement = 'generalAgreement',
  creditAgreement = 'creditAgreement',
}

interface IRoundingBar {
  fill: string;
  x: number;
  y: number;
  width: number;
  height: number;
  value: number;
  isShowText: boolean;
  colorText: string;
  creditAgreement: number;
  generalAgreement: number;
}
interface ICustomBarShape extends IRoundingBar {
  type: barType;
  name: IWidgetCreditMappedInfoKey;
}

export const CustomBarShape = (props: ICustomBarShape) => {
  const {type, name, creditAgreement, generalAgreement} = props;
  if (
    type === barType.creditAgreement &&
    name === 'unusedLimit' &&
    creditAgreement > generalAgreement
  ) {
    return <RoundingBarDifference {...props} />;
  }
  return <RoundingBar {...props} />;
};

const RoundingBar = (props: IRoundingBar) => {
  const {
    fill,
    x,
    y,
    width,
    height,
    value,
    isShowText = true,
    colorText,
  } = props;
  const lengthNumber = value.toString().length * 2;
  const endRect = x + width;
  const endShape = endRect + height;
  const paddingTopText = 14;
  const NUMERAL_FORMAT = '0,0';
  const text = numeral(Math.round(value)).format(NUMERAL_FORMAT);
  return (
    <svg>
      <rect
        x={x}
        y={y}
        width={width - height / 2}
        height={height}
        stroke="none"
        fill={fill}
      />
      <circle
        cx={endRect - height / 2}
        cy={y + height / 2}
        r={height / 2}
        stroke="none"
        fill={fill}
      />

      {isShowText && (
        <text
          y={y + height + paddingTopText}
          textAnchor="middle"
          dominantBaseline="central"
        >
          <tspan
            x={endShape + lengthNumber}
            dy="-2em"
            fontSize="12"
            fill={colorText}
          >
            {text}
          </tspan>
        </text>
      )}
    </svg>
  );
};

const RoundingBarDifference = (props: IRoundingBar) => {
  const {width, creditAgreement, generalAgreement} = props;
  const widthGeneralAgreement = (width / creditAgreement) * generalAgreement;
  return (
    <svg>
      <RoundingBar
        {...props}
        fill={creditColor.difference}
        colorText={creditColor.difference}
      />
      <RoundingBar
        {...props}
        isShowText={false}
        width={widthGeneralAgreement}
      />
    </svg>
  );
};
