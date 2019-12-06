import React, { useCallback } from 'react';
import {Button} from 'react-materialize';
import { BLESense } from '../utils';

const SERVICE_UUID = '6fbe1da7-0000-44de-92c4-bb6e04fb0212';
const MAX_RECORDS = 64;

const BleConnect = () => {
  const onDisconnect = useCallback((event) => {
    const device = event.target;

    console.log('Device ', device.name, ' is disconnected!');
  }, []);

  const handleAccelerometer = useCallback((event) => {
   const dataReceived = event.target.value;
   const columns = Object.keys(BLESense.accelerometer.data);

   let packetPointer = 0, i = 0;

   // Read sensor value in the BLE packet and push into the data array
   BLESense.accelerometer.structure.forEach(() => {
     // Function to extract data for given sensor property type
     const dataViewFunction = DataView.prototype.getFloat32.bind(dataReceived);
     // Read sensor output value - true => Little Endian
     const unpackedValue = dataViewFunction(packetPointer, i);

     // Push sensor reading onto data array
     BLESense.accelerometer.data[columns[i]].push(unpackedValue);

     // Keep array at buffer size
     if(BLESense.accelerometer.data[columns[i]].length > MAX_RECORDS) {
       BLESense.accelerometer.data[columns[i]].shift();
     }
    // move pointer forward in data packet to next value
     packetPointer += 4; // Bytes of Float32

     i++;
   });
   console.log('Reading: ', BLESense.accelerometer.data);
  }, []);

  const onConnect = useCallback(async () => {
    console.log('Requesting device...');
    const device = await navigator.bluetooth.requestDevice({
      filters: [{
          services: [SERVICE_UUID]
      }]
    });

    console.log('Connecting to device...');
    device.addEventListener('gattserverdisconnected', onDisconnect);

    const server = await device.gatt.connect();
    console.log('Getting primary service...');
    const service = await server.getPrimaryService(SERVICE_UUID);

    // Set up accelerometer
    BLESense.accelerometer.characteristic = await service.getCharacteristic(BLESense.accelerometer.uuid);
    // Set up notification
    BLESense.accelerometer.characteristic.addEventListener('characteristicvaluechanged', handleAccelerometer);
    await BLESense.accelerometer.characteristic.startNotifications();
    console.log('Connected!');
  }, []);

  return (
    <div>
      <Button onClick={onConnect}>Connect</Button>
    </div>
  );
};

export default BleConnect;
