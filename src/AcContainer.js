import React, { useState} from 'react';

import {colorNames} from './data';
import Autocomplete from './Autocomplete';
import {HOST, fetch} from './data/mockServer';

const AcContainer = () => {
  const [options] = useState(colorNames());
  const [isLoading, setLoading] = useState(false);
  const [hasError, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [colors, setColors] = useState([]);

  const onSearch = (text) => {
    setError(false);
    setColors([]);
    setLoading(true);
    fetch(HOST + text)
      .then((response) => response.json())
      .then((result) => {
        setLoading(false);
        setColors(result);
      })
      .catch((error) => {
        setLoading(false);
        setError(true);
        setErrorMsg(error);
      });
  };

  return (
    <Autocomplete
      options={options}
      isLoading={isLoading}
      hasError={hasError}
      errorMsg={errorMsg}
      onSearch={onSearch}
      colors={colors}
    />
  );
};

export default AcContainer;
