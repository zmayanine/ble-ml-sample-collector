import PropTypes from 'prop-types';
import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import {
  MEASURE_TYPE,
  RAW_DATA_CSV_HEADER,
  BLE_ACCELEROMETER_UUID,
  BLE_GYROSCOPE_UUID,
  BLE_VERSION_UUID,
  BLE_SERVICE_UUID,
  parseMeasurement,
} from '../utils';
import BleConnect from './BleConnect';
import IMUDataPreview from './IMUDataPreview';
import InfoAndConfig from './InfoAndConfig';
import RawSamples from './RawSamples';

const BoardManager = ({ className }) => {
  const [bleService, setBleService] = useState(null);
  const [rawAcceleration, setRawAcceleration] = useState({
    count: 0,
    rawData: RAW_DATA_CSV_HEADER.ACCELERATION,
  });
  const [rawGyroscope, setRawGyroscope] = useState({
    count: 0,
    rawData: RAW_DATA_CSV_HEADER.GYROSCOPE,
  });
  const [uuids, setUuids] = useState({
    serviceUuid: BLE_SERVICE_UUID,
    versionUuid: BLE_VERSION_UUID,
    accelerationUuid: BLE_ACCELEROMETER_UUID,
    gyroscopeUuid: BLE_GYROSCOPE_UUID,
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
    <div className={`${className}`}>
      <BleConnect
        serviceUuid={uuids.serviceUuid}
        versionUuid={uuids.versionUuid}
        setService={setBleService}
        bleService={bleService}
      />
      {!bleService && (
        <InfoAndConfig
          setCustomUuids={setUuids}
        />
      )}
      {bleService && (
        <>
          <div className="preview-container">
            <IMUDataPreview
              bleService={bleService}
              addSample={addSample}
              metadata={{
                type: MEASURE_TYPE.ACCELERATION,
                uuid: uuids.accelerationUuid,
                sensor: 'Accelerometer',
              }}
            />
            <IMUDataPreview
              bleService={bleService}
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
        </>
      )}
    </div>
  );
};

BoardManager.propTypes = {
  className: PropTypes.string,
};

BoardManager.defaultProps = {
  className: '',
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
