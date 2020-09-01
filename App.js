/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import AcContainer from './src/AcContainer';

const App: () => React$Node = () => {
  return <AcContainer />;
};

const styles = StyleSheet.create({});

export default App;
