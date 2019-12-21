import React from 'react';
import AccelAndGyro from './AccelAndGyro';

const PAGES_CONFIG = {
  initial: {
    id: 'initial',
    title: 'Initial page',
    Component: () => (<div>Please make a selection in the menu</div>),
  },
  accelerationAndGyroscope: {
    id: 'accelerationAndGyroscope',
    title: 'Acceleration & Gyroscope',
    Component: () => (<AccelAndGyro />),
  },
};

export default PAGES_CONFIG;
