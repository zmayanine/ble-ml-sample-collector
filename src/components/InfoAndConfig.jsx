import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ConfigForm from './ConfigForm';

const InfoAndConfig = ({ className, setCustomUuids }) => (
  <div className={className}>
    <p>
      <span>Waiting for device to connect</span>
    </p>
    <h2>Hello, friend!</h2>
    <a
      href="https://twitter.com/zmayanine?ref_src=twsrc%5Etfw"
      className="twitter-follow-button"
      data-show-screen-name="false"
      data-show-count="false"
    >
        Follow
    </a>
    <span>&nbsp;&nbsp;Have questions? Feel free to DM me.</span>
    <p>
      <span>
        The default UUIDs used for searching and connecting to BLE services service and
        characteristics, are the ones used in the sketches for Arduino Nano 33 BLE Sense board.
        Sketches can be found&nbsp;
      </span>
      <a
        href="https://github.com/zmayanine/ble-ml-sample-collector/tree/master/sketches"
        rel="noopener noreferrer"
        target="_blank"
      >
          here
      </a>
      <span>
        &nbsp;within a repo of this project.
      </span>
    </p>
    <p>
      <span>
        Before proceeding checkout the&nbsp;
      </span>
      <a
        href="https://github.com/zmayanine/ble-ml-sample-collector"
        rel="noopener noreferrer"
        target="_blank"
      >
          README
      </a>
      <span>
        &nbsp;file for additional information, specifically around how data should be structured
        for each sensor and sent to this app.
      </span>
    </p>
    <p>
      <span>
        If you wish to use default UUIDs, just go on an click on Connect. Otherwise,
        just fill out and save the new UUIDs in the following form:
      </span>
    </p>
    <ConfigForm
      setUuids={setCustomUuids}
    />
  </div>
);

InfoAndConfig.propTypes = {
  className: PropTypes.string.isRequired,
  setCustomUuids: PropTypes.func.isRequired,
};

export default styled(InfoAndConfig)``;
