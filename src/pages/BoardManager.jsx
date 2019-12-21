import PropTypes from 'prop-types';
import React, { useState } from 'react';
import styled from 'styled-components';
import {
  BLE_ACCELEROMETER_UUID,
  BLE_GYROSCOPE_UUID,
  BLE_VERSION_UUID,
  BLE_SERVICE_UUID,
} from '../utils';
import { BleConnect, InfoAndConfig } from '../components';
import ContentPage from './ContentPage';
import { ContextProvider } from '../context';

const BoardManager = ({ className }) => {
  const [bleService, setBleService] = useState(null);
  const [uuids, setUuids] = useState({
    serviceUuid: BLE_SERVICE_UUID,
    versionUuid: BLE_VERSION_UUID,
    accelerationUuid: BLE_ACCELEROMETER_UUID,
    gyroscopeUuid: BLE_GYROSCOPE_UUID,
  });

  return (
    <div className={className}>
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
        <ContextProvider value={{ bleService, uuids }}>
          <ContentPage />
        </ContextProvider>
      )}
    </div>
  );
};

BoardManager.propTypes = {
  className: PropTypes.string.isRequired,
};

export default styled(BoardManager)`
  display: grid;
  grid-template-rows: min-content auto;
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
