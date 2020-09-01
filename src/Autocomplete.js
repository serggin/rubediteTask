import React, {useEffect, useState, useRef} from 'react';
import {
  Alert,
  View,
  Text,
  TextInput,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import PropTypes from 'prop-types';

import OptionList from './OptionList';

const Autocomplete = ({options}) => {
  const [searchText, setSearchText] = useState('');
  const [autocompleteOptions, setAutocompleteOptions] = useState([]);

  const [timeoutId, setTimeoutId] = useState(0);

  useEffect(() => {
    //console.log('useEffect() timeoutId.current=', timeoutId.current);
    cleanup();
    if (searchText.length > 0) {
      setAutocompleteOptions(
        options.filter(
          (option) =>
            option.toLowerCase().indexOf(searchText.toLowerCase()) > -1,
        ),
      );
      const tId = setTimeout(() => {
        handle();
      }, 1000);
      setTimeoutId(tId);
    } else {
      setAutocompleteOptions([]);
    }
    return () => {
      cleanup();
    };
  }, [options, searchText]);

  const cleanup = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  };

  const handle = () => {
    Alert.alert('Timeout', searchText);
  };

  const onChange = (text) => {
    setSearchText(text);
    console.log('onChange() text=', text);
  };

  const onSelect = (text) => {
    setSearchText(text);
    console.log('onSelect() text=', text);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Color's name"
        value={searchText}
        onChangeText={(text) => {
          onChange(text);
        }}
      />
      {searchText.length > 0 && (
        <OptionList options={autocompleteOptions} onSelect={onSelect} />
      )}
    </View>
  );
};

Autocomplete.propTypes = {
  options: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  hasError: PropTypes.bool.isRequired,
  errorMsg: PropTypes.string,
  onSearch: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {},
  input: {},
});

export default Autocomplete;
