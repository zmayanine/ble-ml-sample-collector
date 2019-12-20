import React, { useCallback, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  BLE_ACCELEROMETER_UUID,
  BLE_GYROSCOPE_UUID,
  BLE_SERVICE_UUID,
  BLE_VERSION_UUID,
  getDebounce,
  validateUuid,
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

const debounce = getDebounce(3000); // 3s

const INITIAL_VALUES = {
  serviceUuid: BLE_SERVICE_UUID,
  versionUuid: BLE_VERSION_UUID,
  accelerationUuid: BLE_ACCELEROMETER_UUID,
  gyroscopeUuid: BLE_GYROSCOPE_UUID,
};

const ConfigForm = ({ className, setUuids }) => {
  const [invalidFields, setInvalidFields] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const newUuids = useRef({ ...INITIAL_VALUES });

  const onChangeHandler = useCallback((type, newUuid) => {
    if (newUuid.length === 0) {
      newUuids.current[type] = INITIAL_VALUES[type];
    } else {
      newUuids.current[type] = newUuid;
    }
  }, []);

  const onSaveConfig = useCallback(() => {
    const invalid = [];
    Object.entries(newUuids.current).forEach(([key, value]) => {
      if (!validateUuid(value)) {
        invalid.push(key);
      }
    });

    setInvalidFields(invalid);

    if (invalid.length === 0) {
      setUuids(newUuids.current);
    }

    setIsSaved(true);

    debounce(() => {
      setIsSaved(false);
    });
  }, [setUuids]);

  const copiedClassname = (isSaved && invalidFields && invalidFields.length === 0) ? 'saved' : '';

  return (
    <div className={className}>
      {CONFIG_FIELDS.map((data) => (
        <InputField
          key={data.dataId}
          metadata={data}
          onChangeValue={onChangeHandler}
          isValid={!!invalidFields && !invalidFields.includes(data.dataId)}
          showError={invalidFields !== null}
        />
      ))}
      <div className="save-section">
        <button
          type="button"
          className="btn btn-small save-button"
          onClick={onSaveConfig}
        >
          Save
        </button>
        <span className={['copied-message', copiedClassname].join(' ')}>
          Saved!
        </span>
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

  .save-section {
    padding-top: 30px;
  }

  .copied-message {
    opacity: 0;
    padding-left: 15px;
    transition: opacity .250s linear;

    &.saved {
      opacity: 1;
    }
  }
`;
