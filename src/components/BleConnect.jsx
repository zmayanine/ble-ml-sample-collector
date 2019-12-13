import React, { useCallback, useEffect, useState } from 'react';
import { Button } from 'react-materialize';
import styled from 'styled-components';
import { BLUETOOTH_STATE } from '../utils';
import bleConnect from '../utils/bleConnect';
import bleGetFwVersion from '../utils/bleGetFwVersion';

const BleConnect = ({ className, setService, bleService }) => {
  const [status, setStatus] = useState(BLUETOOTH_STATE.READY);
  const [version, setVersion] = useState('-');

  const onConnect = useCallback(async () => {
    await bleConnect({ setStatus, setService });
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

export default styled(BleConnect)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;
`;
