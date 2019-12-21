import React, { useCallback, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { IMUDataPreview, RawSamples } from '../components';
import { Context } from '../context';
import { MEASURE_TYPE, parseMeasurement, RAW_DATA_CSV_HEADER } from '../utils';

const AccelAndGyro = ({ className }) => {
  const { uuids } = useContext(Context);
  const [rawAcceleration, setRawAcceleration] = useState({
    count: 0,
    rawData: RAW_DATA_CSV_HEADER.ACCELERATION,
  });
  const [rawGyroscope, setRawGyroscope] = useState({
    count: 0,
    rawData: RAW_DATA_CSV_HEADER.GYROSCOPE,
  });

  const addSample = useCallback(({ type, samples }) => {
    if (type === MEASURE_TYPE.ACCELERATION) {
      setRawAcceleration((oldValue) => parseMeasurement(oldValue, samples));
    } else {
      setRawGyroscope((oldValue) => parseMeasurement(oldValue, samples));
    }
  }, []);

  const clearSamples = useCallback((type) => {
    if (type === MEASURE_TYPE.ACCELERATION) {
      setRawAcceleration({
        count: 0,
        rawData: RAW_DATA_CSV_HEADER.ACCELERATION,
      });
    } else {
      setRawGyroscope({
        count: 0,
        rawData: RAW_DATA_CSV_HEADER.GYROSCOPE,
      });
    }
  }, []);

  return (
    <div className={className}>
      <div className="preview-container">
        <IMUDataPreview
          addSample={addSample}
          metadata={{
            type: MEASURE_TYPE.ACCELERATION,
            uuid: uuids.accelerationUuid,
            sensor: 'Accelerometer',
          }}
        />
        <IMUDataPreview
          addSample={addSample}
          metadata={{
            type: MEASURE_TYPE.GYROSCOPE,
            uuid: uuids.gyroscopeUuid,
            sensor: 'Gyroscope',
          }}
        />
      </div>
      <div className="samples-row">
        <RawSamples
          type={MEASURE_TYPE.ACCELERATION}
          data={rawAcceleration}
          clearData={clearSamples}
        />
        <RawSamples
          type={MEASURE_TYPE.GYROSCOPE}
          data={rawGyroscope}
          clearData={clearSamples}
        />
      </div>
    </div>
  );
};

AccelAndGyro.propTypes = {
  /**
   * Custom component class name
   */
  className: PropTypes.string.isRequired,
};

export default styled(AccelAndGyro)`
  display: grid;
  grid-auto-rows: 0.3fr 0.7fr;
`;
