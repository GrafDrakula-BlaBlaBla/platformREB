import React from 'react';
import {observer} from 'mobx-react-lite';
import moment from 'moment';
import numeral from 'numeral';
import NumberFormat from 'react-number-format';
import {curveBumpX} from 'd3-shape';
import useViewModel from '../../../../hooks/useViewModel';
import {IWidgetExportViewModel} from '../../../../../ViewModel/viewModels/Widgets/WidgetExport/interfaces';
import {VIEW_MODEL} from '../../../../../ViewModel/identifiers';
import {IWidgetExportAreaItem} from '../../../../../Model/Widgets/WidgetExport';
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  ReferenceLine,
  ReferenceDot,
  Tooltip,
} from 'recharts';
import './index.less';

export const ExportLineChart = observer(() => {
  const {ticks, domain, dataFix, dataPlan} = useViewModel<
    IWidgetExportViewModel
  >(VIEW_MODEL.WidgetExport);

  const getValueFix = (data: IWidgetExportAreaItem) => {
    return dataFix.find((obj) => obj.time === data.time)?.value;
  };
  const getValuePlan = (data: IWidgetExportAreaItem) => {
    return dataPlan.find((obj) => obj.time === data.time)?.value;
  };

  const xAxisFormatter = (date: number) => {
    return moment(date).format('Q кв.');
  };
  const yAxisFormatter = (value: number) => {
    return numeral(value).format('0 a');
  };

  const CustomTooltip = (props: any) => {
    const {active, payload, label} = props;
    if (active && payload && payload.length && label !== dataFix[0].time) {
      const displayLabel = ticks.find((tick) => tick === label)
        ? xAxisFormatter(label)
        : moment(label).format('DD MMMM YYYY');
      return (
        <div className="export-line-chart__tooltip">
          <div className="export-line-chart__tooltip__label">
            {displayLabel}
          </div>
          <div className="export-line-chart__tooltip__value">
            <NumberFormat
              value={payload[0].value}
              thousandSeparator=" "
              displayType="text"
              suffix=" ₽"
            />
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="export-line-chart">
      <ResponsiveContainer width="100%" height="100%" debounce={1}>
        <AreaChart data={[...dataFix, dataPlan[dataPlan.length - 1]]}>
          <defs>
            <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
              <stop offset="25%" stopColor="#21A038" stopOpacity={0.1} />
              <stop offset="95%" stopColor="#21A038" stopOpacity={0} />
            </linearGradient>
          </defs>
          <ReferenceLine y={0} stroke="#eceeef" />
          <XAxis
            dataKey="time"
            scale="time"
            tickFormatter={xAxisFormatter}
            type="number"
            domain={domain}
            ticks={ticks}
            padding={{right: 50}}
            stroke="#98A1A8"
            axisLine={false}
            tickLine={false}
            tickMargin={10}
          />
          <YAxis
            tickFormatter={yAxisFormatter}
            type="number"
            stroke="#98A1A8"
            axisLine={false}
            tickLine={false}
            tickMargin={10}
          />
          <CartesianGrid stroke="#eceeef" horizontal={false} />
          <Area
            type={curveBumpX}
            dataKey={getValuePlan}
            stroke="#DFE5EA"
            strokeWidth={2}
            fillOpacity={0}
            strokeDasharray="10 10"
            dot={false}
          />
          <Area
            type={curveBumpX}
            dataKey={getValueFix}
            stroke="#21A038"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#color)"
            dot
          />
          <ReferenceLine
            x={dataPlan[dataPlan.length - 1].time}
            stroke="#000000"
            strokeDasharray="5 5"
          />
          <ReferenceDot
            x={dataPlan[dataPlan.length - 1].time}
            y={dataPlan[dataPlan.length - 1].value}
            r={5}
            stroke="#ffffff"
            strokeWidth={2}
            fill="#000000"
          />
          <Tooltip content={<CustomTooltip />} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
});
