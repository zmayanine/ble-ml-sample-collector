# ML Sample Collection over Bluetooth

### Introduction
This project came out as a result of me getting annoyed by collecting data samples from serial output of Arduino,
for training my machine learning models. I was using [Arduino Nano 33 BLE Sense](https://store.arduino.cc/arduino-nano-33-ble-sense)
board and since it already comes with Bluetooth module on it, my thought was that in long term I could save 
loads of time by building a web sampling app, which will have everything I needed in one place. ¯\\_(ツ)_/¯

### Features
The app enables you to send data collected from different sensors via Bluetooth. Such data is then visualized,
grouped, parsed and made available in CSV format.

#### Sensors
The following sensors are supported:
* Accelerometer
* Gyroscope

_Note: This project is still WIP and as such, support for other sensors will be added sequentially. 
My main goal for starters, is to support all sensors that are available on the Arduino Nano 33 BLE Sense board and
then go from there._

#### Supported boards
In theory, every board is supported. The data from sensors just needs to be formatted correctly upon sending it
via Bluetooth. Some of the boards already have Bluetooth module on it, but there are plenty that don't. In that case,
you could get a [HC-05 Bluetooth module](https://components101.com/wireless/hc-05-bluetooth-module) which is 
fairly cheap, widely used and supported. But any module will do.

This project contains sketches for Arduino Nano 33 BLE Sense board and those can be found in `./sketches` directory
of the project. Here is the list of the available ones:
* [Nano33Sense_IMUAcceleration.ino](sketches/Nano33Sense_IMUAcceleration.ino) - Capturing acceleration samples
* [Nano33Sense_IMUGyroscope.ino](sketches/Nano33Sense_IMUGyroscope.ino) - Capturing gyroscope samples
* [Nano33Sense_IMUAccelAndGyro.ino](sketches/Nano33Sense_IMUAccelAndGyro.ino) - Capturing acceleration and gyroscope samples

### Bluetooth Data Interface
Following paragraphs explain how you should format your data upon sending it over Bluetooth. Every measurement should
contain configured number of samples, which depends on the sensor.

#### Accelerometer
Number of samples for one measurement of the accelerometer is 120. 
The app expects 120 arrays, each array consists of 3 floats: `[xValue, yValue, zValue]`. Here's an example of it:
```c
// Init
float aX, aY, aZ;

// Get readings
aX = ...;
aY = ...;
aZ = ...;

// Format for sending
float acceleration[3] = {aX, aY, aZ};

// Send sample
bleAccelCharacteristic.writeValue(acceleration, sizeOf(acceleration));

```

#### Gyroscope
Number of samples for one measurement of the gyroscope is 120. 
The app expects 120 arrays, each array consists of 3 floats: `[xValue, yValue, zValue]`. Here's an example of it:
```c
// Init
float gX, gY, gZ;

// Get readings
gX = ...;
gY = ...;
gZ = ...;

// Format for sending
float gyroscope[3] = {gX, gY, gZ};

// Send sample
bleGyroCharacteristic.writeValue(gyroscope, sizeOf(gyroscope));

```
