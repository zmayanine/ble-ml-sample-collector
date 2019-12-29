import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { getMultilineChartConfig } from '../../utils';

const MultilineChart = ({ chartData, type }) => {
  const chart = useRef(null);

  useEffect(() => {
    chart.current = getMultilineChartConfig({ chartData, type });

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
        height: '350px',
      }}
    />
  );
};

MultilineChart.propTypes = {
  chartData: PropTypes.arrayOf(PropTypes.shape({
    sequence: PropTypes.number.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    z: PropTypes.number.isRequired,
  })).isRequired,
  type: PropTypes.string.isRequired,
};

export default MultilineChart;
