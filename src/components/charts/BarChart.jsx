import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { getBarChartConfig } from '../../utils';

const BarChart = ({ chartData, type }) => {
  const chart = useRef(null);

  useEffect(() => {
    chart.current = getBarChartConfig({ chartData, type });

    return () => {
      if (chart.current) {
        chart.current.dispose();
      }
    };
  }, []);

  useEffect(() => {
    chart.current.data = chartData;
  }, [chartData]);

  return (
    <div
      id={`chartdiv-${type}`}
      style={{
        width: '100%',
        height: '100%',
      }}
    />
  );
};

BarChart.propTypes = {
  chartData: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  type: PropTypes.string.isRequired,
};

export default BarChart;
