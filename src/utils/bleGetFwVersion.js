/**
 * Retrieves firmware version from the BLE service
 * @param bleService - BLE service
 * @param setVersion - Callback function for setting the firmware version
 * @param versionUuid - UUID of the version characteristic
 * @return {Promise<void>}
 */
const bleGetFwVersion = async ({ bleService, setVersion, versionUuid }) => {
  console.log('BLE - Getting FW version on: ', versionUuid);

  const characteristic = await bleService.getCharacteristic(versionUuid);

  characteristic.readValue().then((value) => {
    const major = value.getInt8(3, true);
    const minor = value.getInt8(2, true);
    const patch = value.getInt16(0, true);

    setVersion(`v${major}.${minor}.${patch}`);
  });

  console.log('BLE - Version retrieved from: ', versionUuid);
};

export default bleGetFwVersion;
