/**
 * Subscribing to BLE characteristics (sensors), which are determined by the BLE UUID
 * configured withing the service itself.
 * @param bleService - BLE service retrieved after connecting to BLE
 * @param handler - Handler for data retrieved from given UUID characteristic
 * @param uuid - UUID of the characteristic for subscription
 * @return {Promise<void>}
 */
const bleSubscribe = async ({ bleService, handler, uuid }) => {
  console.log('BLE - Subscribing to service: ', uuid);

  const characteristic = await bleService.getCharacteristic(uuid);

  characteristic.addEventListener('characteristicvaluechanged', handler);

  await characteristic.startNotifications();

  console.log('BLE - Subscribed to service: ', uuid);
};

export default bleSubscribe;
