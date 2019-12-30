import React, {
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Context } from '../context';
import { bleSubscribe } from '../utils';
import BarChart from './charts/BarChart';

const chartDataTemplate = (data) => [{
  color: 'Red',
  value: Math.round(data[0] * 256),
}, {
  color: 'Green',
  value: Math.round(data[1] * 256),
}, {
  color: 'Blue',
  value: Math.round(data[2] * 256),
}];

const ColorPreview = ({ className, metadata, addSample }) => {
  const [chartData, setChartData] = useState(chartDataTemplate([0, 0, 0]));
  const { bleService } = useContext(Context);

  const handleData = useCallback((event) => {
    const receivedData = event.target.value;
    const tempData = [0, 0, 0];
    let packetPointer = 0;

    for (let i = 0; i < tempData.length; i += 1) {
      tempData[i] = receivedData.getFloat32(packetPointer, true);
      packetPointer += 4;
    }

    setChartData(() => chartDataTemplate(tempData));
    addSample(tempData);
  }, []);

  useEffect(() => {
    bleSubscribe({
      bleService,
      uuid: metadata.uuid,
      handler: handleData,
    });
  }, []);

  return (
    <div className={className}>
      <p>{`${metadata.sensor} - last measurement (normalized)`}</p>
      <BarChart
        chartData={chartData}
        type={metadata.type}
      />
    </div>
  );
};

ColorPreview.propTypes = {
  metadata: PropTypes.shape({
    type: PropTypes.string.isRequired,
    uuid: PropTypes.string.isRequired,
    sensor: PropTypes.string.isRequired,
  }).isRequired,
  className: PropTypes.string.isRequired,
  addSample: PropTypes.func.isRequired,
};

export default styled(ColorPreview)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
