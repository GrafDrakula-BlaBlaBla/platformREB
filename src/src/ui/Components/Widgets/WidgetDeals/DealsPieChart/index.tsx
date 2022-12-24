import React from 'react';
import {
  PieChart,
  Pie,
  ResponsiveContainer,
  Legend,
  Cell,
  Label,
} from 'recharts';
import useViewModel from '../../../../hooks/useViewModel';
import {IWidgetDealsViewModel} from '../../../../../ViewModel/viewModels/Widgets/WidgetDeals/interfaces';
import {VIEW_MODEL} from '../../../../../ViewModel/identifiers';
import {observer} from 'mobx-react-lite';
import {TWidgetDealsPieChartFieldName} from '../../../../../Model/Widgets/WidgetDeals';
import {NoData} from '../../../../Common/SimpleComponents/NoData';
import {ReactComponent as DocumentsIcon} from '../../../../../assets/svg/commonArea/Documents.svg';
import numeral from 'numeral';
import './index.less';

const OPACITY_HIDDEN = 0.3;
const OPACITY_SHOWN = 1;
const NUMERAL_FORMAT = '0.0 a';

export interface IDealsPieChartProps {
  valueFieldName: TWidgetDealsPieChartFieldName;
}

export const DealsPieChart = observer((props: IDealsPieChartProps) => {
  const {valueFieldName} = props;

  const {
    dataPieChart: data,
    toggleVisible,
    isVisible,
    dataPieChartTotalCount,
    dataPieChartTotalAmount,
  } = useViewModel<IWidgetDealsViewModel>(VIEW_MODEL.WidgetDeals);

  const totalSelected = data.reduce((prev, curr) => {
    return prev + (isVisible('statuses', curr.name) ? curr[valueFieldName] : 0);
  }, 0);

  const onLegendItemClick = (id: string) => {
    toggleVisible('statuses', id);
  };

  const renderLabel = (props: any) => {
    const {viewBox, value} = props;
    const {cx, cy} = viewBox;
    return (
      <text x={cx} y={cy} textAnchor="middle" dominantBaseline="central">
        <tspan x={cx} dy="-1.3em" fontSize="14">
          {valueFieldName === 'count' && 'Всего сделок'}
          {valueFieldName === 'amount' && 'Сумма сделок, ₽'}
        </tspan>
        <tspan x={cx} dy="1.0em" fontSize="30" fontWeight={500} fill="#008FD2">
          {valueFieldName === 'count' && value}
          {valueFieldName === 'amount' && numeral(value).format(NUMERAL_FORMAT)}
        </tspan>
      </text>
    );
  };
  const renderLegend = (props: any) => {
    const {payload} = props;
    return (
      <div className="deals-pie-chart__legend">
        {payload.map((item: any) => {
          return (
            <div
              className="deals-pie-chart__legend-item"
              key={`item-${item.id}`}
              onClick={() => onLegendItemClick(item.id)}
              style={{
                opacity: item.visible ? OPACITY_SHOWN : OPACITY_HIDDEN,
              }}
            >
              <div
                className="deals-pie-chart__legend-item__rect"
                style={{backgroundColor: item.color}}
              />
              <div className="deals-pie-chart__legend-item__label">
                {item.value}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="deals-pie-chart">
      {(valueFieldName === 'count' && !dataPieChartTotalCount) ||
      (valueFieldName === 'amount' && !dataPieChartTotalAmount) ? (
        <NoData icon={<DocumentsIcon />} message="Нет данных для отображения" />
      ) : (
        <ResponsiveContainer width="100%" height="100%" debounce={1}>
          <PieChart>
            <Legend
              verticalAlign="bottom"
              payload={data.map((item, index) => ({
                id: item.name,
                type: 'square',
                value: `${item.title} - ${
                  valueFieldName === 'count'
                    ? item[valueFieldName]
                    : numeral(item[valueFieldName]).format(NUMERAL_FORMAT)
                }`,
                color: item.color,
                visible: item.visible,
              }))}
              wrapperStyle={{
                paddingTop: '30px',
              }}
              content={renderLegend}
            />
            <Pie
              data={data}
              dataKey={valueFieldName}
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius="65%"
              outerRadius="100%"
              paddingAngle={1}
              minAngle={2}
            >
              {data.map((item, index) => (
                <Cell
                  key={`cell-${item.name}`}
                  fill={item.color}
                  opacity={item.visible ? OPACITY_SHOWN : OPACITY_HIDDEN}
                />
              ))}
              <Label
                position="center"
                value={totalSelected}
                content={renderLabel}
              />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
});
