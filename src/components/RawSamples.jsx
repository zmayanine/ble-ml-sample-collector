import PropTypes from 'prop-types';
import React, { useCallback, useRef } from 'react';
import styled from 'styled-components';

const RawSamples = ({
  className,
  type,
  data,
  clearData,
}) => {
  const textareaRef = useRef(null);

  const onCopy = useCallback((event) => {
    textareaRef.current.select();
    document.execCommand('copy');
    event.target.focus();
  }, []);

  const onDownloadCSV = useCallback((dataSize) => {
    const blob = new Blob([textareaRef.current.value], { type: 'data:text/csv;charset=utf-8,' });
    const blobURL = window.URL.createObjectURL(blob);

    // Create new tag for download file
    const anchor = document.createElement('a');
    anchor.download = `${type}_${dataSize}_samples.csv`;
    anchor.href = blobURL;
    anchor.dataset.downloadurl = ['text/csv', anchor.download, anchor.href].join(':');
    anchor.click();

    // Remove URL.createObjectURL. The browser should not save the reference to the file.
    setTimeout(() => {
      URL.revokeObjectURL(blobURL);
    }, 100);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={className}>
      <div className="clear-copy-header">
        <span>{`Total measurements: ${data.count}`}</span>
        <button
          className="btn btn-small"
          type="button"
          onClick={clearData}
        >
          Clear
        </button>
        <button
          className="btn btn-small copy-button"
          type="button"
          onClick={onCopy}
        >
          Copy
        </button>
        <button
          className="btn btn-small"
          type="button"
          onClick={() => onDownloadCSV(data.count)}
        >
          Download
        </button>
      </div>
      <textarea
        className="raw-data-textarea"
        readOnly
        placeholder="This is the sample data"
        ref={textareaRef}
        value={data.rawData}
      />
    </div>
  );
};

RawSamples.propTypes = {
  className: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  data: PropTypes.shape({
    count: PropTypes.number.isRequired,
    rawData: PropTypes.string.isRequired,
  }).isRequired,
  clearData: PropTypes.func.isRequired,
};

export default styled(RawSamples)`
  height: 100%;
  width: 100%;
  padding 10px;
  display: flex;
  flex-direction: column;

  .raw-data-textarea {
    min-height: 150px;
    height: inherit;
    width: 100%;
    resize: none;
    font-family: monospace;
    font-size: 12px;
  }

  .clear-copy-header {
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: auto min-content min-content min-content;
    grid-column-gap: 10px;
    align-items: center;
    padding-bottom: 10px;

    .copy-button {
      margin-left: 50px;
    }
  }
`;
