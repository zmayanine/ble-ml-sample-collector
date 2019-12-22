import React, { useCallback, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { IMUDataPreview, RawSamples } from '../components';
import { Context } from '../context';
import { MEASURE_TYPE, parseMeasurement, RAW_DATA_CSV_HEADER } from '../utils';

const Gyroscope = ({ className }) => {
  const { uuids } = useContext(Context);
  const [rawData, setRawData] = useState({
    count: 0,
    rawData: RAW_DATA_CSV_HEADER.GYROSCOPE,
  });

  const addSample = useCallback(({ samples }) => {
    setRawData((oldValue) => parseMeasurement(oldValue, samples));
  }, []);

  const clearSamples = useCallback(() => {
    setRawData({
      count: 0,
      rawData: RAW_DATA_CSV_HEADER.GYROSCOPE,
    });
  }, []);

  return (
    <div className={className}>
      <IMUDataPreview
        addSample={addSample}
        metadata={{
          type: MEASURE_TYPE.GYROSCOPE,
          uuid: uuids.gyroscopeUuid,
          sensor: 'Gyroscope',
        }}
      />
      <RawSamples
        type={MEASURE_TYPE.GYROSCOPE}
        data={rawData}
        clearData={clearSamples}
      />
    </div>
  );
};

Gyroscope.propTypes = {
  /**
   * Custom component class name
   */
  className: PropTypes.string.isRequired,
};

export default styled(Gyroscope)`
  display: grid;
  grid-auto-flow: row;
  height: 100%;
`;
