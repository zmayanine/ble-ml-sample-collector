#include <Arduino_LSM9DS1.h>
#include <ArduinoBLE.h>

#define BLE_SENSE_UUID(id) ("992c0325-" id "-4e93-9659-e66dd8104f31")

// Significant threshold in G's
const float ACC_THRESHOLD = 2.5;
// We're reading 120 samples
const int NUM_SAMPLES = 120;
// Version, 1. B is Major, 2. B is Minor, 3. & 4. B are PATCH
const int VERSION = 0x01000000;

// BLE definitions
BLEService                      service                     (BLE_SENSE_UUID("0000"));
BLEUnsignedIntCharacteristic    versionCharacteristic       (BLE_SENSE_UUID("1001"), BLERead); // 1 int
BLECharacteristic               accelerationCharacteristic  (BLE_SENSE_UUID("2001"), BLENotify, 3 * sizeof(float)); // Array of 3 floats, in G

int samplesRead = NUM_SAMPLES;
String deviceName = "BLEMLCapture-";

void setup() {
    // Init IMU sensor
    if (!IMU.begin()) {
        // Failed!
        while(1);
    }

    // Init BLE
    if (!BLE.begin()) {
        // Failed!
        while(1);
    }

    //  Setup BLE
    String BLEAddress = BLE.address();
    BLEAddress.toUpperCase();

    deviceName += BLEAddress[BLEAddress.length() - 5];
    deviceName += BLEAddress[BLEAddress.length() - 4];
    deviceName += BLEAddress[BLEAddress.length() - 2];
    deviceName += BLEAddress[BLEAddress.length() - 1];

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
        if (accelerationCharacteristic.subscribed()) {
            float aX, aY, aZ;
            
            // Detecting significant motion by accelerometer
            while(samplesRead == NUM_SAMPLES) {
                if(IMU.accelerationAvailable()) {
                    IMU.readAcceleration(aX, aY, aZ);
                    // Sum the absolutes
                    float absSum = fabs(aX) + fabs(aY) + fabs(aZ);
                    // If above threshold, reset sample count
                    // because new motion needs to be captured
                    if (absSum >= ACC_THRESHOLD) {
                        samplesRead = 0;
                        break;
                    }
                }
            }

            // Reading all samples from significant motion
            while(samplesRead < NUM_SAMPLES) {
                if(IMU.accelerationAvailable()) {
                    IMU.readAcceleration(aX, aY, aZ);

                    samplesRead++;

                    // Send those over BLE
                    float acceleration[3] = {aX, aY, aZ};
                    accelerationCharacteristic.writeValue(acceleration, sizeof(acceleration));
                }
            }
        }
    }
}
