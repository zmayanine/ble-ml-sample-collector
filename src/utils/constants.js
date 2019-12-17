/* Default BLE service UUIDs. They match with the provided
 * sketch file for Arduino Nano 33 BLE Sense */
export const BLE_SERVICE_UUID = '992c0325-0000-4e93-9659-e66dd8104f31';
export const BLE_VERSION_UUID = '992c0325-1001-4e93-9659-e66dd8104f31';
export const BLE_ACCELEROMETER_UUID = '992c0325-2001-4e93-9659-e66dd8104f31';
export const BLE_GYROSCOPE_UUID = '992c0325-2002-4e93-9659-e66dd8104f31';

export const MEASURE_TYPE = {
  ACCELERATION: 'acceleration',
  GYROSCOPE: 'gyroscope',
};

export const RAW_DATA_CSV_HEADER = {
  ACCELERATION: 'aX,aY,aZ\n',
  GYROSCOPE: 'gX,gY,gZ\n',
};

export const BLUETOOTH_STATE = {
  READY: 'Ready to connect!',
  SEARCHING: 'Searching for devices...',
  CONNECTING: 'Connecting to device...',
  GETTING_SERVICE: 'Getting primary service...',
  CONNECTED: 'Connected!',
  DISCONNECTED: (name) => `Device ${name} is disconnected!`,
  ERROR: 'Ups! A boo boo happened... Try turning it off and on again!',
};

// Number of samples taken by the IMU sensor on Arduino Nano 33 BLE Sense board
export const IMU_NUM_SAMPLES = 120;

export const CHART_INITIAL_DATA = [...Array(IMU_NUM_SAMPLES).keys()].map((num) => ({
  sequence: num + 1,
  x: 0,
  y: 0,
  z: 0,
}));
