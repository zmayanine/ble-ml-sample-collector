import React from 'react';
import AccelAndGyro from './AccelAndGyro';
import Acceleration from './Acceleration';
import Gyroscope from './Gyroscope';

const PAGES_CONFIG = {
  initial: {
    id: 'initial',
    title: 'Initial page',
    Component: () => (<div style={{ paddingTop: '10px' }}>Select something in the menu</div>),
  },
  acceleration: {
    id: 'acceleration',
    title: 'Acceleration',
    Component: () => (<Acceleration />),
  },
  gyroscope: {
    id: 'gyroscope',
    title: 'Gyroscope',
    Component: () => (<Gyroscope />),
  },
  accelerationAndGyroscope: {
    id: 'accelerationAndGyroscope',
    title: 'Acceleration & Gyroscope',
    Component: () => (<AccelAndGyro />),
  },
};

export default PAGES_CONFIG;
