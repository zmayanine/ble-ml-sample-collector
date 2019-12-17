import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import { Button } from 'react-materialize';
import styled from 'styled-components';
import { BLUETOOTH_STATE, bleConnect, bleGetFwVersion } from '../utils';

const BleConnect = ({ className, setService, bleService }) => {
  const [status, setStatus] = useState(BLUETOOTH_STATE.READY);
  const [version, setVersion] = useState('-');

  const onConnect = useCallback(async () => {
    await bleConnect({ setStatus, setService });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (bleService) {
      bleGetFwVersion({
        bleService,
        setVersion,
      });
    }
  }, [bleService]);

  return (
    <div className={className}>
      <Button onClick={onConnect}>Connect</Button>
      <span>{status}</span>
      <span>{`Firmware version: ${version}`}</span>
    </div>
  );
};

BleConnect.propTypes = {
  bleService: PropTypes.shape({}),
  className: PropTypes.string,
  setService: PropTypes.func.isRequired,
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
