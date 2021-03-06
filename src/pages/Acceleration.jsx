import React, { useCallback, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { IMUDataPreview, RawSamples } from '../components';
import { Context } from '../context';
import { MEASURE_TYPE, parseMeasurement, RAW_DATA_CSV_HEADER } from '../utils';

const Acceleration = ({ className }) => {
  const { uuids } = useContext(Context);
  const [rawData, setRawData] = useState({
    count: 0,
    rawData: RAW_DATA_CSV_HEADER.ACCELERATION,
  });

  const addSample = useCallback(({ samples }) => {
    setRawData((oldValue) => parseMeasurement(oldValue, samples));
  }, []);

  const clearSamples = useCallback(() => {
    setRawData({
      count: 0,
      rawData: RAW_DATA_CSV_HEADER.ACCELERATION,
    });
  }, []);

  return (
    <div className={className}>
      <IMUDataPreview
        addSample={addSample}
        metadata={{
          type: MEASURE_TYPE.ACCELERATION,
          uuid: uuids.accelerationUuid,
          sensor: 'Accelerometer',
        }}
      />
      <RawSamples
        type={MEASURE_TYPE.ACCELERATION}
        data={rawData}
        clearData={clearSamples}
      />
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
  grid-auto-flow: row;
  height: 100%;
`;
