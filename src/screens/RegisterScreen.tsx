import {StyleSheet, Text} from 'react-native';
import React from 'react';
import Screen from '../components/Screen';
import {useNavigation, useRoute} from '@react-navigation/native';
const RegisterScreen = () => {
  // to get current route name
  const route = useRoute();
  // to navigate pages
  const navigation = useNavigation();
  return (
    <Screen>
      <Text>RegisterScreen</Text>
    </Screen>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
