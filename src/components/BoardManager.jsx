import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { MEASURE_TYPE } from '../utils';
import Accelerometer from './Accelerometer';
import BleConnect from './BleConnect';
import Gyroscope from './Gyroscope';
import RawSamples from './RawSamples';

const BoardManager = ({ className }) => {
  const [bleService, setBleService] = useState(null);
  const [acceleration, setAcceleration] = useState([]);
  const [gyroscope, setGyroscope] = useState([]);

  const addSample = useCallback((measure) => {
    if (measure.type === MEASURE_TYPE.ACCELERATION) {
      setAcceleration((oldValue) => [...oldValue, measure.samples]);
    } else {
      setGyroscope((oldValue) => [...oldValue, measure.samples]);
    }
  }, []);

  const clearSamples = useCallback((type) => {
    if (type === MEASURE_TYPE.ACCELERATION) {
      setAcceleration([]);
    } else {
      setGyroscope([]);
    }
  }, []);

  return (
    <div className={`${className}`}>
      <BleConnect
        setService={setBleService}
        bleService={bleService}
      />
      {!bleService && (
        <div>Waiting for device to connect</div>
      )}
      {bleService && (
        <>
          <div className="preview-container">
            <Accelerometer
              bleService={bleService}
              addSample={addSample}
            />
            <Gyroscope
              bleService={bleService}
              addSample={addSample}
            />
          </div>
          <div className="samples-row">
            <RawSamples
              type={MEASURE_TYPE.ACCELERATION}
              data={acceleration}
              clearData={clearSamples}
            />
            <RawSamples
              type={MEASURE_TYPE.GYROSCOPE}
              data={gyroscope}
              clearData={clearSamples}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default styled(BoardManager)`
  display: grid;
  grid-template-rows: min-content max-content auto;
  grid-auto-columns: 100%;
  height: 100%;
  padding: 20px;
  grid-row-gap: 20px;

  .samples-row {
    display: flex;
    flex-direction: row;
  }
  
  .preview-container {
    display: flex;
    flex-direction: row;
  }
`;
