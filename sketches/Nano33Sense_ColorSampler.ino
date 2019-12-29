#include <Arduino_APDS9960.h>
#include <ArduinoBLE.h>

#define BLE_SENSE_UUID(id) ("992c0325-" id "-4e93-9659-e66dd8104f31")

// Version, 1. B is Major, 2. B is Minor, 3. & 4. B are PATCH
const int VERSION = 0x01000000;

// BLE definitions
BLEService                      service                     (BLE_SENSE_UUID("0000"));
BLEUnsignedIntCharacteristic    versionCharacteristic       (BLE_SENSE_UUID("1001"), BLERead); // 1 int
BLECharacteristic               colorCharacteristic         (BLE_SENSE_UUID("2003"), BLENotify, 3 * sizeof(unsigned short)); // Array of 16-bit, RGB

String deviceName = "BLEMLCapture-";

void setup() {
    // Init 
    if (!APDS.begin()) {
        // Failed!
        while (1);
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
    service.addCharacteristic(colorCharacteristic);

    versionCharacteristic.setValue(VERSION);

    BLE.addService(service);
    BLE.advertise();
}

void loop() {
    while(BLE.connected()) {
        if (colorCharacteristic.subscribed()) {
            int r, g, b, ambientLight, proximity;
            float sum;

            if(APDS.colorAvailable() && APDS.proximityAvailable()) {
                APDS.readColor(r, g, b, ambientLight);
                sum = r + g + b;

                // read the proximity
                // - 0   => close
                // - 255 => far
                // - -1  => error
                proximity = APDS.readProximity();

                // if object is close and well enough illumated
                if (proximity == 0 && ambientLight > 10 && sum > 0) {
                    float redRatio = r / sum;
                    float greenRatio = g / sum;
                    float blueRatio = b / sum;

                    unsigned short colors[3] = { redRatio, greenRatio, blueRatio };
                    colorCharacteristic.writeValue(colors, sizeof(colors));
                }
            }
        }
    }
}
