import PropTypes from 'prop-types';
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';
import { Context } from '../context';
import {
  CHART_INITIAL_DATA,
  IMU_NUM_SAMPLES,
  bleSubscribe,
} from '../utils';
import MultilineChart from './charts/MultilineChart';

const IMUDataPreview = ({
  metadata,
  className,
  addSample,
}) => {
  const [chartData, setChartData] = useState([...CHART_INITIAL_DATA]);
  const buffer = useRef([]);
  const { bleService } = useContext(Context);

  const handleData = useCallback((event) => {
    const receivedData = event.target.value;
    const tempData = [0, 0, 0];
    let packetPointer = 0;

    for (let i = 0; i < tempData.length; i += 1) {
      // Read sensor output value - true => Little Endian
      // and push sensor reading into temp data array
      tempData[i] = receivedData.getFloat32(packetPointer, true);
      // move pointer forward in data packet to next value
      packetPointer += 4; // Float32 has 4 bytes
    }

    buffer.current.push({
      sequence: buffer.current.length + 1,
      x: tempData[0],
      y: tempData[1],
      z: tempData[2],
    });

    if (buffer.current.length === IMU_NUM_SAMPLES) {
      // We received the samples for the whole motion
      setChartData(buffer.current);

      addSample({
        samples: buffer.current,
      });

      buffer.current = [];
    }
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
      <p>{`${metadata.sensor} - last measurement`}</p>
      <MultilineChart
        chartData={chartData}
        type={metadata.type}
      />
    </div>
  );
};

IMUDataPreview.propTypes = {
  metadata: PropTypes.shape({
    type: PropTypes.string.isRequired,
    uuid: PropTypes.string.isRequired,
    sensor: PropTypes.string.isRequired,
  }).isRequired,
  className: PropTypes.string.isRequired,
  addSample: PropTypes.func.isRequired,
};

export default styled(IMUDataPreview)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
