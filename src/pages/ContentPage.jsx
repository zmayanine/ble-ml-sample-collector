import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import PAGES_CONFIG from './pagesConfig';

const ContentPage = ({ className }) => {
  const [selected, setSelected] = useState(PAGES_CONFIG.initial);

  const onChangeSelection = useCallback((event) => {
    const selection = event.target.getAttribute('data-selection-id');

    setSelected(PAGES_CONFIG[selection]);
  }, []);

  return (
    <div className={className}>
      <div className="side-navigation">
        {Object.values(PAGES_CONFIG).slice(1).map((item) => (
          <button
            key={item.id}
            data-selection-id={item.id}
            className={[
              'waves-effect waves-teal btn-flat button-override',
              item.id === selected.id ? 'teal lighten-5' : '',
            ].join(' ')}
            onClick={onChangeSelection}
            type="button"
            title={item.title}
          >
            <span
              className="button-text"
              data-selection-id={item.id}
            >
              {item.title}
            </span>
          </button>
        ))}
      </div>
      <div className="main-content">
        {selected.Component()}
      </div>
    </div>
  );
};

ContentPage.propTypes = {
  /**
   * Custom component class name
   */
  className: PropTypes.string.isRequired,
};

export default styled(ContentPage)`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(200px, 260px) auto;
  grid-column-gap: 15px;

  .side-navigation {
    display: flex;
    flex-flow: column;
    
    .button-override {
      &:focus,
      &:hover {
        background-color: #E0F2F1;
      }
    }
  }

  .button-text {
    overflow: hidden;
    white-space: nowrap;
    display: block;
    text-overflow: ellipsis;
  }

  .main-content {
    width: 100%;
  }
`;
