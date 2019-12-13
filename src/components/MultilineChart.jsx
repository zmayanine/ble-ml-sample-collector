import React, { useMemo } from 'react';
import { Chart } from 'react-charts';
import styled from 'styled-components';

const MultilineChart = ({ className, chartData }) => {
  const data = useMemo(() => [{
    label: 'x',
    data: chartData.x.map(((value, index) => [index, value])),
  }, {
    label: 'y',
    data: chartData.y.map(((value, index) => [index, value])),
  }, {
    label: 'z',
    data: chartData.z.map(((value, index) => [index, value])),
  }], [chartData]);

  const axes = React.useMemo(() => [
    { primary: true, type: 'linear', position: 'bottom' },
    { type: 'linear', position: 'left' },
  ], []);

  const getSeriesStyle = React.useCallback(() => ({
    transition: 'all .5s ease',
  }), []);

  const getDatumStyle = React.useCallback(() => ({
    transition: 'all .5s ease',
  }), []);

  return (
    <div className={className}>
      <Chart
        data={data}
        axes={axes}
        getSeriesStyle={getSeriesStyle}
        getDatumStyle={getDatumStyle}
        tooltip
      />
    </div>
  );
};

export default styled(MultilineChart)`
  width: 100%;
  height: 300px;
  padding: 0 5px;
`;
