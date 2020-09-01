import React, {useEffect, useState} from 'react';

import Autocomplete from './Autocomplete';

const AcContainer = () => {
  const [options] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [hasError, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const onSearch = (text) => {};

  return (
    <Autocomplete
      options={options}
      isLoading={isLoading}
      hasError={hasError}
      errorMsg={errorMsg}
      onSearch={onSearch}
    />
  );
};

export default AcContainer;
