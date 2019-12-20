import React, { useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  BLE_ACCELEROMETER_UUID,
  BLE_GYROSCOPE_UUID,
  BLE_SERVICE_UUID,
  BLE_VERSION_UUID,
} from '../utils';
import InputField from './InputField';

const CONFIG_FIELDS = [{
  label: 'Service UUID',
  dataId: 'serviceUuid',
  uuid: BLE_SERVICE_UUID,
}, {
  label: 'Version characteristic UUID',
  dataId: 'versionUuid',
  uuid: BLE_VERSION_UUID,
}, {
  label: 'Acceleration characteristic UUID',
  dataId: 'accelerationUuid',
  uuid: BLE_ACCELEROMETER_UUID,
}, {
  label: 'Gyroscope characteristic UUID',
  dataId: 'gyroscopeUuid',
  uuid: BLE_GYROSCOPE_UUID,
}];

const ConfigForm = ({ className, setUuids }) => {
  const newUuids = useRef({
    serviceUuid: BLE_SERVICE_UUID,
    versionUuid: BLE_VERSION_UUID,
    accelerationUuid: BLE_ACCELEROMETER_UUID,
    gyroscopeUuid: BLE_GYROSCOPE_UUID,
  });

  const onChangeHandler = useCallback((type, newUuid) => {
    newUuids.current[type] = newUuid;
  }, []);

  const onSaveConfig = useCallback(() => {
    // If non-empty ones are valid, then save
    // And show small saved message
    setUuids(newUuids.current);
  }, [setUuids]);

  return (
    <div className={className}>
      {CONFIG_FIELDS.map((data) => (
        <InputField
          key={data.dataId}
          metadata={data}
          onChangeValue={onChangeHandler}
          showErrorMessage={false}
        />
      ))}
      <div>
        <button
          type="button"
          className="btn btn-small save-button"
          onClick={onSaveConfig}
        >
          Save
        </button>
        <span>Copied!</span>
      </div>
    </div>
  );
};

ConfigForm.propTypes = {
  className: PropTypes.string.isRequired,
  setUuids: PropTypes.func.isRequired,
};

export default styled(ConfigForm)`
  padding: 5px 20px 0 0;
  
  .save-button {
    margin-top: 30px;
  }
`;
