import React, {useEffect, useState} from 'react';
import {
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
  //const [showOptions, setShowOptions] = useState(false);
  const [autocompleteOptions, setAutocompleteOptions] = useState([]);

  useEffect(() => {
    if (searchText.length > 0) {
      //setShowOptions(true);
      setAutocompleteOptions(
        options.filter((option) => option.indexOf(searchText) > -1),
      );
    } else {
      setAutocompleteOptions([]);
    }
  }, [options, searchText]);

  const onChange = (text) => {
    setSearchText(text);
    console.log('onChange() text=', text);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Color's name"
        value={searchText}
        onChangeText={(text) => {}}
      />
      {searchText.length > 0 && (
        <OptionList options={autocompleteOptions} onSelect={onChange} />
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
