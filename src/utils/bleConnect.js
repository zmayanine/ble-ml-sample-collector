import { BLUETOOTH_STATE } from './constants';

/**
 * Function handles connecting to the BLE device
 * @param setStatus - Updates connection status
 * @param setService - Sets retrieved BLE service, from the device
 * @param serviceUuid - UUID of the Bluetooth service
 * @return {Promise<void>}
 */
const bleConnect = async ({ setStatus, setService, serviceUuid }) => {
  setStatus(BLUETOOTH_STATE.SEARCHING);
  console.log('BLE - Searching...', serviceUuid);

  const device = await navigator.bluetooth.requestDevice({
    filters: [{
      services: [serviceUuid],
    }],
  });

  setStatus(BLUETOOTH_STATE.CONNECTING);
  console.log('BLE - Connecting...');

  device.addEventListener('gattserverdisconnected', (event) => {
    const deviceName = event.target.name;

    setStatus(BLUETOOTH_STATE.DISCONNECTED(deviceName));
  });

  const server = await device.gatt.connect();

  setStatus(BLUETOOTH_STATE.GETTING_SERVICE);

  console.log('BLE - Getting service...');
  const service = await server.getPrimaryService(serviceUuid);

  setService(service);
  setStatus(BLUETOOTH_STATE.CONNECTED);
  console.log('BLE - Connected!');
};

export default bleConnect;
