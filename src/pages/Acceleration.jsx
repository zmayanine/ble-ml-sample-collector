import React, { useCallback, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { IMUDataPreview, RawSamples } from '../components';
import { Context } from '../context';
import { MEASURE_TYPE, parseMeasurement, RAW_DATA_CSV_HEADER } from '../utils';

const Acceleration = ({ className }) => {
  const { uuids } = useContext(Context);
  const [rawAcceleration, setRawAcceleration] = useState({
    count: 0,
    rawData: RAW_DATA_CSV_HEADER.ACCELERATION,
  });

  const addSample = useCallback(({ type, samples }) => {
    if (type === MEASURE_TYPE.ACCELERATION) {
      setRawAcceleration((oldValue) => parseMeasurement(oldValue, samples));
    }
  }, []);

  const clearSamples = useCallback((type) => {
    if (type === MEASURE_TYPE.ACCELERATION) {
      setRawAcceleration({
        count: 0,
        rawData: RAW_DATA_CSV_HEADER.ACCELERATION,
      });
    }
  }, []);

  return (
    <div className={className}>
      <div className="chart-preview">
        <IMUDataPreview
          addSample={addSample}
          metadata={{
            type: MEASURE_TYPE.ACCELERATION,
            uuid: uuids.accelerationUuid,
            sensor: 'Accelerometer',
          }}
        />
      </div>
      <div className="raw-sample">
        <RawSamples
          type={MEASURE_TYPE.ACCELERATION}
          data={rawAcceleration}
          clearData={clearSamples}
        />
      </div>
    </div>
  );
};

Acceleration.propTypes = {
  /**
   * Custom component class name
   */
  className: PropTypes.string.isRequired,
};

export default styled(Acceleration)`
  display: grid;
  grid-auto-rows: 0.3fr 0.7fr;
`;
