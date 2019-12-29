import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Acceleration from './Acceleration';
import Gyroscope from './Gyroscope';

const AccelAndGyro = ({ className }) => (
  <div className={className}>
    <Acceleration />
    <Gyroscope />
  </div>
);

AccelAndGyro.propTypes = {
  /**
   * Custom component class name
   */
  className: PropTypes.string.isRequired,
};

export default styled(AccelAndGyro)`
  height: 100%;
  display: grid;
  grid-auto-flow: column;
`;
