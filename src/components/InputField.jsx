import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { getDebounce } from '../utils';

const debounce = getDebounce(500); // 0.5s

const InputField = ({
  className,
  onChangeValue,
  metadata,
  isValid,
  showError,
}) => {
  const onChangeHandler = useCallback((event) => {
    const type = event.target.getAttribute('data-id');
    const newUuid = event.target.value;

    debounce(() => {
      onChangeValue(type, newUuid);
    });
  }, [onChangeValue]);

  const classNames = useMemo(() => {
    if (!showError) {
      return 'validate';
    }

    if (!isValid) {
      return 'validate invalid';
    }

    return 'validate valid';
  }, [isValid, showError]);

  return (
    <div className={className}>
      <label>{metadata.label}</label>
      <input
        className={classNames}
        data-id={metadata.dataId}
        onChange={onChangeHandler}
        placeholder={`Defaults to: ${metadata.uuid}`}
      />
      {(showError && !isValid) && (
        <label className="error-message red-text">Please enter a valid UUID</label>
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
  isValid: PropTypes.bool.isRequired,
  showError: PropTypes.bool.isRequired,
};

export default styled(InputField)`
  padding: 5px 0;

  .error-message {
    font-size: 12px;
  }
`;
