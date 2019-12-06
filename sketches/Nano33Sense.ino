#include <Arduino_LSM9DS1.h>
#include <ArduinoBLE.h>

#define BLE_SENSE_UUID(id) ("6fbe1da7-" id "-44de-92c4-bb6e04fb0212")

const int VERSION = 0x00000000;

BLEService                     service                       (BLE_SENSE_UUID("0000"));
BLEUnsignedIntCharacteristic   versionCharacteristic         (BLE_SENSE_UUID("1001"), BLERead);
// BLEUnsignedShortCharacteristic ambientLightCharacteristic    (BLE_SENSE_UUID("2001"), BLENotify); // 16-bit
// BLECharacteristic              colorCharacteristic           (BLE_SENSE_UUID("2002"), BLENotify, 3 * sizeof(unsigned short)); // Array of 16-bit, RGB
// BLEUnsignedCharCharacteristic  proximityCharacteristic       (BLE_SENSE_UUID("2003"), BLENotify); // Byte, 0 - 255 => close to far
// BLEByteCharacteristic          gestureCharacteristic         (BLE_SENSE_UUID("2004"), BLENotify); // NONE = -1, UP = 0, DOWN = 1, LEFT = 2, RIGHT = 3
BLECharacteristic              accelerationCharacteristic    (BLE_SENSE_UUID("3001"), BLENotify, 3 * sizeof(float)); // Array of 3 floats, [G]
// BLECharacteristic              gyroscopeCharacteristic       (BLE_SENSE_UUID("3002"), BLENotify, 3 * sizeof(float)); // Array of 3 floats, dps
// BLECharacteristic              magneticFieldCharacteristic   (BLE_SENSE_UUID("3003"), BLENotify, 3 * sizeof(float)); // Array of 3 floats, uT

// BLEFloatCharacteristic         pressureCharacteristic        (BLE_SENSE_UUID("4001"), BLERead); // Float, kPa
// BLEFloatCharacteristic         temperatureCharacteristic     (BLE_SENSE_UUID("4002"), BLERead); // Float, Celcius
// BLEFloatCharacteristic         humidityCharacteristic        (BLE_SENSE_UUID("4003"), BLERead); // Float, Percentage
// BLECharacteristic              microphoneLevelCharacteristic (BLE_SENSE_UUID("5001"), BLENotify, 32); // Int, RMS of audio input
// BLECharacteristic              rgbLedCharacteristic          (BLE_SENSE_UUID("6001"), BLERead | BLEWrite, 3 * sizeof(byte)); // Array of 3 bytes, RGB

String deviceName;

void setup() {
    Serial.begin(9600);

    Serial.println("Started!");

    if (!IMU.begin()) {
        Serial.println("Failed to initialized IMU!");

        while (1);
    }

    if (!BLE.begin()) {
        Serial.println("Failed to initialize BLE!");

        while(1);
    }

    String BLEAddress = BLE.address();

    Serial.print("BLEAddress = ");
    Serial.println(BLEAddress);

    BLEAddress.toUpperCase();

    deviceName = "BLESense-";
    deviceName += BLEAddress[BLEAddress.length() - 5];
    deviceName += BLEAddress[BLEAddress.length() - 4];
    deviceName += BLEAddress[BLEAddress.length() - 2];
    deviceName += BLEAddress[BLEAddress.length() - 1];

    Serial.print("deviceName = ");
    Serial.println(deviceName);

    BLE.setLocalName(deviceName.c_str());
    BLE.setDeviceName(deviceName.c_str());
    BLE.setAdvertisedService(service);

    service.addCharacteristic(versionCharacteristic);
    service.addCharacteristic(accelerationCharacteristic);

    versionCharacteristic.setValue(VERSION);
    
    BLE.addService(service);

    BLE.advertise();
}

void loop() {
    while(BLE.connected()) {
        if(accelerationCharacteristic.subscribed() && IMU.accelerationAvailable()) {
            float x, y, z;
            IMU.readAcceleration(x, y, z);
            float acceleration[3] = {x, y, z};
            accelerationCharacteristic.writeValue(acceleration, sizeof(acceleration));       
        }
    }
}
