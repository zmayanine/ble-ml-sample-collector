import { BLE_VERSION_UUID } from './constants';

/**
 * Retrieves firmware version from the BLE service
 * @param bleService - BLE service
 * @param setVersion - Callback function for setting the firmware version
 * @return {Promise<void>}
 */
const bleGetFwVersion = async ({ bleService, setVersion }) => {
  console.log('BLE - Getting FW version on: ', BLE_VERSION_UUID);

  const characteristic = await bleService.getCharacteristic(BLE_VERSION_UUID);

  characteristic.readValue().then((value) => {
    const major = value.getInt8(3, true);
    const minor = value.getInt8(2, true);
    const patch = value.getInt16(0, true);

    setVersion(`v${major}.${minor}.${patch}`);
  });

  console.log('BLE - Version retrieved from: ', BLE_VERSION_UUID);
};

export default bleGetFwVersion;
