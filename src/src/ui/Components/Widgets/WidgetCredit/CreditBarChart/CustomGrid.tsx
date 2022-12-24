import React, {useEffect, useState, Ref} from 'react';
import {throttle} from '../../../../../Utils/Function/throttle';

type pointsLineType = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
};

interface ICustomGridProps {
  containerChartRef: Ref<HTMLDivElement | null>;
  startY: number;
  heightGrid: number;
  color: string;
}

const MARGIN_RIGHT = 24;

export const CustomGrid = (props: ICustomGridProps) => {
  const {containerChartRef, startY, heightGrid: height, color} = props;

  const [pointsLines, setPointsLines] = useState<pointsLineType[] | null>(null);
  const [minX, setMinX] = useState<number>(Infinity);
  const [maxX, setMaxX] = useState<number>(-Infinity);

  useEffect(() => {
    const updatePoints = () => {
      const pointsX = getPointsXForLines(containerChartRef);

      setMinX(Math.min(...pointsX));
      setMaxX(Math.max(...pointsX));
      setPointsLines(generatePointsLines(pointsX, startY, height));
    };
    const updatePointsThrottled = throttle<Event>(updatePoints, 100);

    updatePointsThrottled();

    window.addEventListener('resize', updatePointsThrottled);

    return () => {
      window.removeEventListener('resize', updatePointsThrottled);
    };
  }, [containerChartRef, startY, height]);

  return (
    <svg>
      {pointsLines &&
        pointsLines.map(({x1, y1, x2, y2}, index) => (
          <line key={index} stroke={color} x1={x1} y1={y1} x2={x2} y2={y2} />
        ))}
      <line
        stroke={color}
        x1={minX}
        y1={startY + height}
        x2={maxX + MARGIN_RIGHT}
        y2={startY + height}
      />
    </svg>
  );
};

const getPointsXForLines = (containerChartRef: any): number[] => {
  const pointsX: number[] = [];
  const xAxisRef: HTMLElement = containerChartRef.current?.getElementsByClassName(
    'xAxis'
  )[0];

  const ticksRef: HTMLCollection = xAxisRef.getElementsByClassName(
    'recharts-cartesian-axis-tick-value'
  );

  for (const tickRef of ticksRef) {
    const pointX = tickRef.getAttribute('x');
    if (pointX) {
      pointsX.push(+pointX);
    }
  }

  return pointsX;
};

const generatePointsLines = (
  pointsX: number[],
  startY: number,
  height: number
): pointsLineType[] => {
  const pointsLines: pointsLineType[] = [];

  for (let i = 0; i < pointsX.length; i++) {
    const x = pointsX[i];

    pointsLines.push({x1: x, y1: startY, x2: x, y2: startY + height});

    if (pointsX[i + 1]) {
      const nextX = pointsX[i + 1];
      const currentX = x + (nextX - x) / 2;
      pointsLines.push({
        x1: currentX,
        y1: startY,
        x2: currentX,
        y2: startY + height,
      });
    }
  }

  return pointsLines;
};
