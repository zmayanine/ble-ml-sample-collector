import React, { useCallback, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ColorPreview, RawSamples } from '../components';
import ColorHuePreview from '../components/ColorHuePreview';
import { Context } from '../context';
import { MEASURE_TYPE, RAW_DATA_CSV_HEADER } from '../utils';

const Color = ({ className }) => {
  const { uuids } = useContext(Context);
  const [lastSample, setLastSample] = useState([0, 0, 0]);
  const [rawData, setRawData] = useState({
    count: 0,
    rawData: RAW_DATA_CSV_HEADER.COLOR,
  });

  const addSample = useCallback((sample) => {
    setLastSample(sample);
    setRawData((oldValue) => {
      let { rawData: prevData } = oldValue;

      prevData = prevData.concat(`${sample[0]},${sample[1]},${sample[2]}\n`);

      return {
        count: oldValue.count + 1,
        rawData: prevData,
      };
    });
  }, []);

  const clearSamples = useCallback(() => {
    setRawData({
      count: 0,
      rawData: RAW_DATA_CSV_HEADER.COLOR,
    });
  }, []);

  return (
    <div className={className}>
      <ColorHuePreview
        className="hue-preview"
        value={lastSample}
      />
      <ColorPreview
        className="color-preview"
        metadata={{
          type: MEASURE_TYPE.COLOR,
          uuid: uuids.colorUuid,
          sensor: 'Color',
        }}
        addSample={addSample}
      />
      <RawSamples
        className="raw-samples"
        type={MEASURE_TYPE.COLOR}
        data={rawData}
        clearData={clearSamples}
      />
    </div>
  );
};

Color.propTypes = {
  className: PropTypes.string.isRequired,
};

export default styled(Color)`
  height: 100%;
  display: grid;
  grid-template-rows: auto min-content;
  grid-template-columns: 50% 50%;
  grid-template-areas:
    'colorPreview rawSamples'
    'colorHuePreview rawSamples';
    
  .hue-preview {
    grid-area: colorHuePreview;
  }
  
  .color-preview {
    grid-area: colorPreview;
  }
  
  .raw-samples {
    grid-area: rawSamples;
  }
`;
