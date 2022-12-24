import numeral from 'numeral';
import React, {useRef} from 'react';
import {
  Bar,
  BarChart,
  Customized,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';
import {
  IWidgetCreditMappedInfo,
  IWidgetCreditMappedInfoKey,
} from '../../../../../Model/Widgets/WidgetCredit';
import {createNonBreakingSpace} from '../../../../../Utils/String/createNonBreakingSpace';
import {creditColor} from '../creditColor';
import {barType, CustomBarShape} from './CustomBarShape';
import {CustomGrid} from './CustomGrid';
import './index.less';

export interface ICreditBarChartProps {
  mappedCreditInfo: IWidgetCreditMappedInfo;
}

const textYAxis: Record<IWidgetCreditMappedInfoKey, string> = {
  limitAgreement: 'Лимит',
  issued: `Общий${createNonBreakingSpace()}объем выдачи`,
  balance: 'Остаток',
  unusedLimit: 'Неиспользованный лимит',
  paidFor: 'Погашено',
};

const formatterXAxis = (value: number): string => {
  return value === 0 ? `${0}` : numeral(value).format('0 a');
};
const formatterYAxis = (value: IWidgetCreditMappedInfoKey) => textYAxis[value];

const MARGIN_BOTTOM_BAR_CHART = 45;
const MARGIN_HORIZONTAL_BAR_CHART = 100;
const MARGIN_RIGHT_YAXIS = 24;
const MARGIN_TOP_XAXIS = 50;
const PADDING_TOP_YAXIS = 20;

const BAR_GAP = 4;
const BAR_CATEGORY_GAP = 16;
const BAR_HEIGHT = 20;

const CreditBarChart = ({mappedCreditInfo}: ICreditBarChartProps) => {
  const containerChartRef = useRef<HTMLDivElement | null>(null);

  const heightBarChart =
    mappedCreditInfo.length *
    (BAR_HEIGHT * 2 + BAR_GAP + BAR_CATEGORY_GAP + 10);
  const heightGrid = heightBarChart - 10;

  return (
    <div className="credit-bar-chart" ref={containerChartRef}>
      <ResponsiveContainer
        className="credit-bar-chart__chart"
        height={heightBarChart + MARGIN_BOTTOM_BAR_CHART}
        width="100%"
      >
        <BarChart
          margin={{
            bottom: MARGIN_BOTTOM_BAR_CHART,
            left: MARGIN_HORIZONTAL_BAR_CHART,
            right: MARGIN_HORIZONTAL_BAR_CHART,
          }}
          height={heightBarChart}
          layout="vertical"
          data={mappedCreditInfo}
          barGap={BAR_GAP}
          barCategoryGap={BAR_CATEGORY_GAP}
          barSize={BAR_HEIGHT}
        >
          <Customized
            component={CustomGrid}
            containerChartRef={containerChartRef}
            startY={0}
            heightGrid={heightGrid}
            color={'#ECEEEF'}
          />
          <XAxis
            tickLine={false}
            axisLine={false}
            tickSize={0}
            tickMargin={MARGIN_TOP_XAXIS}
            tick={{fill: creditColor.axisText}}
            tickFormatter={formatterXAxis}
            type="number"
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickSize={0}
            tickMargin={MARGIN_RIGHT_YAXIS}
            tick={{fill: creditColor.axisText}}
            tickFormatter={formatterYAxis}
            padding={{top: PADDING_TOP_YAXIS}}
            dataKey="name"
            type="category"
            scale="band"
          />
          <Bar
            shape={(props) => (
              <CustomBarShape
                type={barType.generalAgreement}
                height={BAR_HEIGHT}
                colorText={creditColor.barText}
                {...props}
              />
            )}
            dataKey="generalAgreement"
            fill={creditColor.generalAgreement}
          />
          <Bar
            shape={(props) => (
              <CustomBarShape
                type={barType.creditAgreement}
                height={BAR_HEIGHT}
                colorText={creditColor.barText}
                {...props}
              />
            )}
            dataKey="creditAgreement"
            fill={creditColor.creditAgreement}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CreditBarChart;
