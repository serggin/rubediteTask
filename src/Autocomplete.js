import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
} from 'react-native';

import PropTypes from 'prop-types';

import OptionList from './OptionList';

const ColorItem = ({color}) => {
  const boxStyle = {backgroundColor: '#' + color.hex};
  return (
    <View style={styles.colorItem}>
      <View style={[styles.colorSquare, boxStyle]} />
      <Text style={styles.colorText}>
        {color.name.toLowerCase()} ( #{color.hex} )
      </Text>
    </View>
  );
};

const SEARCH_TIMEOUT = 3000;

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
      }, SEARCH_TIMEOUT);
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
  };

  const onSelect = (text) => {
    setSearchText(text);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Палитра цветов React Native</Text>
      {!editing && hasError && <Text style={styles.error}>{errorMsg}</Text>}
      {isLoading && <Text style={styles.status}>Запрос выполняется ...</Text>}
      {!isLoading && (
        <Text style={styles.status}>Введите название цвета :</Text>
      )}
      <TextInput
        style={styles.input}
        placeholder="Наименование цвета"
        value={searchText}
        editable={!isLoading}
        onChangeText={(text) => {
          onChange(text);
        }}
      />
      {editing && searchText.length > 0 && (
        <OptionList options={autocompleteOptions} onSelect={onSelect} />
      )}
      {!isLoading &&
        !editing &&
        searchText.length > 0 &&
        colors.length == 0 &&
        !hasError && <Text style={styles.status}>Данные не найдены</Text>}
      {!isLoading && !editing && colors.length > 0 && (
        <ScrollView>
          {colors.map((color) => (
            <ColorItem color={color} key={color.hex} />
          ))}
        </ScrollView>
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
  colors: PropTypes.array,
};
Autocomplete.defaultProps = {
  errorMsg: '',
  colors: [],
};

const FONT_SIZE = 16;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: 10,
    backgroundColor: 'beige',
  },
  headerText: {
    fontSize: FONT_SIZE * 1.4,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: 'white',
    fontSize: FONT_SIZE,
  },
  status: {
    paddingBottom: 10,
    paddingTop: 10,
  },
  error: {
    color: 'red',
    paddingBottom: 10,
  },
  colorItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
  },
  colorSquare: {
    padding: FONT_SIZE,
    borderColor: 'lightgrey',
    borderWidth: 1,
    marginRight: 10,
  },
  colorText: {
    fontSize: FONT_SIZE,
  },
});

export default Autocomplete;
