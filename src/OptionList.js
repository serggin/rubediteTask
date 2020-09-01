import React from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import PropTypes from 'prop-types';

const ListItem = ({text, onPress}) => (
  <TouchableOpacity style={styles.item} onPress={() => onPress(text)}>
    <Text style={styles.itemText}>{text}</Text>
  </TouchableOpacity>
);

const DummyListItem = ({text}) => (
  <View style={styles.item}>
    <Text style={styles.itemText}>{text}</Text>
  </View>
);

const OptionList = ({options, limit, moreOptions, noOptions, onSelect}) => {
  return (
    <ScrollView style={styles.container}>
      {options.length === 0 && <DummyListItem text={noOptions} />}
      {options.length > 0 &&
        options.map((option, index) => {
          if (
            index < limit - 1 ||
            (index === limit - 1 && options.lenght === limit)
          ) {
            return <ListItem text={option} onPress={onSelect} key={option} />;
          } else if (index === limit - 1) {
            return <DummyListItem text={moreOptions} key={moreOptions} />;
          } else {
            return null;
          }
        })}
    </ScrollView>
  );
};

OptionList.propTypes = {
  options: PropTypes.array.isRequired,
  limit: PropTypes.number,
  moreOptions: PropTypes.string,
  noOptions: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
};
OptionList.defaultProps = {
  limit: 10,
  moreOptions: '...',
  noOptions: 'No options availabe',
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'lavender',
  },
  itemText: {},
});

export default OptionList;
