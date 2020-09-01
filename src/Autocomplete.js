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

const ColorItem = ({color}) => (
  <View style={styles.colorItem}>
    <Text>{color.name}</Text>
  </View>
);

const Autocomplete = ({
  options,
  onSearch,
  isLoading,
  hasError,
  errorMsg,
  colors,
}) => {
  const [searchText, setSearchText] = useState('');
  const [autocompleteOptions, setAutocompleteOptions] = useState([]);
  const [editing, setEditing] = useState(false);
  const [timeoutId, setTimeoutId] = useState(0);

  useEffect(() => {
    //console.log('useEffect() timeoutId.current=', timeoutId.current);
    setEditing(true);
    cleanup();
    if (searchText.length > 0) {
      const searchString = searchText.toLowerCase();
      setAutocompleteOptions(
        options.filter(
          (option) => option.toLowerCase().indexOf(searchString) > -1,
        ),
      );
      const tId = setTimeout(() => {
        handleTimeout();
      }, 1000);
      setTimeoutId(tId);
    } else {
      setAutocompleteOptions([]);
    }
    return () => {
      cleanup();
    };
  }, [options, searchText]);

  useEffect(() => {
    setEditing(false);
  }, [colors]);

  const cleanup = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  };

  const handleTimeout = () => {
    // Alert.alert('Timeout', searchText);
    onSearch(searchText);
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
      {isLoading && <Text>Запрос выполняется ...</Text>}
      {hasError && <Text style={styles.error}>{errorMsg}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Color's name"
        value={searchText}
        editable={!isLoading}
        onChangeText={(text) => {
          onChange(text);
        }}
      />
      {editing && searchText.length > 0 && (
        <OptionList options={autocompleteOptions} onSelect={onSelect} />
      )}
      {!editing && colors.map((color) => <ColorItem color={color} />)}
    </View>
  );
};

Autocomplete.propTypes = {
  options: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  hasError: PropTypes.bool.isRequired,
  errorMsg: PropTypes.string,
  onSearch: PropTypes.func.isRequired,
  colors: PropTypes.array,
};
Autocomplete.defaultProps = {
  errorMsg: '',
  colors: [],
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  input: {},
  error: {
    color: 'red',
  },
});

export default Autocomplete;
