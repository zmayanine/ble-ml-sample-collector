import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { BLUETOOTH_STATE, bleConnect, bleGetFwVersion } from '../utils';

const BleConnect = ({
  className,
  setService,
  bleService,
  serviceUuid,
  versionUuid,
}) => {
  const [status, setStatus] = useState(BLUETOOTH_STATE.READY);
  const [version, setVersion] = useState('-');

  const onConnect = useCallback(async () => {
    await bleConnect({ setStatus, setService, serviceUuid });
  }, [serviceUuid]);

  useEffect(() => {
    if (bleService) {
      bleGetFwVersion({
        bleService,
        setVersion,
        versionUuid,
      });
    }
  }, [bleService, versionUuid]);

  return (
    <div className={className}>
      <button
        type="button"
        className="btn"
        onClick={onConnect}
      >
        Connect
      </button>
      <span>{status}</span>
      <span>{`Firmware version: ${version}`}</span>
    </div>
  );
};

BleConnect.propTypes = {
  bleService: PropTypes.shape({}),
  className: PropTypes.string,
  setService: PropTypes.func.isRequired,
  serviceUuid: PropTypes.string.isRequired,
  versionUuid: PropTypes.string.isRequired,
};

BleConnect.defaultProps = {
  bleService: null,
  className: '',
};

export default styled(BleConnect)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;
`;
