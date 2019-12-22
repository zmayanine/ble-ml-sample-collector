import React from 'react';
import AccelAndGyro from './AccelAndGyro';
import Acceleration from './Acceleration';

const PAGES_CONFIG = {
  initial: {
    id: 'initial',
    title: 'Initial page',
    Component: () => (<div>Please make a selection in the menu</div>),
  },
  acceleration: {
    id: 'acceleration',
    title: 'Acceleration',
    Component: () => (<Acceleration />),
  },
  accelerationAndGyroscope: {
    id: 'accelerationAndGyroscope',
    title: 'Acceleration & Gyroscope',
    Component: () => (<AccelAndGyro />),
  },
};

export default PAGES_CONFIG;
