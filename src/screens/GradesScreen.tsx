import {StyleSheet, Text} from 'react-native';
import React from 'react';
import Screen from '../components/Screen';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Row, Table} from 'react-native-table-component';
const GradesScreen = () => {
  // to get current route name
  const route = useRoute();
  // to navigate pages
  const navigation = useNavigation();
  const quiztitle = 'meow';
  const headers = ['Student', 'Average', 'Header 4'];
  return (
    <Screen>
      <Text>GradesScreen</Text>
    </Screen>
  );
};

export default GradesScreen;

const styles = StyleSheet.create({});
