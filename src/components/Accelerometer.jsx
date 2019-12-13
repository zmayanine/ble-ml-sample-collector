import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';
import { IMU_NUM_SAMPLES } from '../utils';
import bleSubscribe from '../utils/bleSubscribe';
import { BLE_ACCELEROMETER_UUID, CHART_INITIAL_DATA } from '../utils/constants';
import MultilineChart from './MultilineChart';

const Accelerometer = ({ className, bleService, addSample }) => {
  const [chartData, setChartData] = useState({
    x: [...CHART_INITIAL_DATA],
    y: [...CHART_INITIAL_DATA],
    z: [...CHART_INITIAL_DATA],
  });

  const buffer = useRef({
    samples: [],
    chart: {
      x: [],
      y: [],
      z: [],
    },
  });

  const handleData = useCallback((event) => {
    const receivedData = event.target.value;
    const tempData = Object.values(buffer.current.chart);

    let packetPointer = 0;

    for (let i = 0; i < tempData.length; i += 1) {
      // Read sensor output value - true => Little Endian
      const unpackedValue = receivedData.getFloat32(packetPointer, true);
      // Push sensor reading into data array
      tempData[i].push(unpackedValue);
      // move pointer forward in data packet to next value
      packetPointer += 4; // Float32 has 4 bytes
    }

    buffer.current.chart = {
      x: tempData[0],
      y: tempData[1],
      z: tempData[2],
    };

    const lastIndex = tempData[0].length - 1;

    buffer.current.samples.push([
      tempData[0][lastIndex],
      tempData[1][lastIndex],
      tempData[2][lastIndex],
    ]);

    if (tempData[0].length === IMU_NUM_SAMPLES
      && tempData[1].length === IMU_NUM_SAMPLES
      && tempData[2].length === IMU_NUM_SAMPLES) {
      // We received the samples for the whole motion
      addSample({
        type: 'ACCELERATION',
        samples: buffer.current.samples,
      });

      buffer.current = {
        samples: [],
        chart: {
          x: [],
          y: [],
          z: [],
        },
      };

      setChartData({
        x: tempData[0],
        y: tempData[1],
        z: tempData[2],
      });
    }
  }, []);

  useEffect(() => {
    bleSubscribe({
      bleService,
      uuid: BLE_ACCELEROMETER_UUID,
      handler: handleData,
    });
  }, []);

  return (
    <div className={className}>
      <p>Accelerometer last measurement</p>
      <MultilineChart chartData={chartData} />
    </div>
  );
};

export default styled(Accelerometer)`
  width: 100%;
  height: 100%;
  padding: 0 5px;
`;
