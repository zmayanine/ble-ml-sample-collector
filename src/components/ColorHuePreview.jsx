import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { getHexColor } from '../utils';

const Tooltip = styled.div`
  margin-top: 10px;
  position: relative;
  width: 100px;
  height: 40px;
  background: #${(props) => props.background};
  border-radius: 6px 6px 6px 6px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ColorHuePreview = ({ className, value }) => {
  const hexValue = getHexColor(value);

  return (
    <div className={className}>
      <Tooltip background={hexValue} />
      <span>{`#${hexValue.toUpperCase()}`}</span>
    </div>
  );
};

ColorHuePreview.propTypes = {
  className: PropTypes.string.isRequired,
  value: PropTypes.arrayOf(PropTypes.number).isRequired,
};


export default styled(ColorHuePreview)``;
