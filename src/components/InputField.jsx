import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const InputField = ({
  className,
  onChangeValue,
  metadata,
  showErrorMessage,
}) => {
  const onChangeHandler = useCallback((event) => {
    const type = event.target.getAttribute('data-id');
    const newUuid = event.target.value;

    onChangeValue(type, newUuid);
  }, [onChangeValue]);

  return (
    <div className={className}>
      <label>{metadata.label}</label>
      <input
        className="validate"
        data-id={metadata.dataId}
        onChange={onChangeHandler}
        placeholder={`Defaults to: ${metadata.uuid}`}
      />
      {showErrorMessage && (
        <span className="error-message">Please enter a valid UUID</span>
      )}
    </div>
  );
};

InputField.propTypes = {
  className: PropTypes.string.isRequired,
  onChangeValue: PropTypes.func.isRequired,
  metadata: PropTypes.shape({
    label: PropTypes.string.isRequired,
    dataId: PropTypes.string.isRequired,
    uuid: PropTypes.string.isRequired,
  }).isRequired,
  showErrorMessage: PropTypes.bool.isRequired,
};

export default styled(InputField)`
  padding: 5px 0;
`;
