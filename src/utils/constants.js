export const BLE_SERVICE_UUID = '992c0325-0000-4e93-9659-e66dd8104f31';
export const BLE_VERSION_UUID = '992c0325-1001-4e93-9659-e66dd8104f31';
export const BLE_ACCELEROMETER_UUID = '992c0325-2001-4e93-9659-e66dd8104f31';
export const BLE_GYROSCOPE_UUID = '992c0325-2002-4e93-9659-e66dd8104f31';

export const MEASURE_TYPE = {
  ACCELERATION: 'acceleration',
  GYROSCOPE: 'gyroscope',
};

export const BLUETOOTH_STATE = {
  READY: 'Ready to connect!',
  SEARCHING: 'Searching for devices...',
  CONNECTING: 'Connecting to device...',
  GETTING_SERVICE: 'Getting primary service...',
  CONNECTED: 'Connected!',
  DISCONNECTED: (name) => `Device ${name} is disconnected!`,
};

// Number of samples taken by the IMU sensor on Arduino
export const IMU_NUM_SAMPLES = 120;

export const CHART_INITIAL_DATA = [...Array(IMU_NUM_SAMPLES).keys()].map(() => 0);
