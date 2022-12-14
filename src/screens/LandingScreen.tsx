import {StyleSheet, Text} from 'react-native';
import React from 'react';
import Screen from '../components/Screen';
import {useNavigation, useRoute} from '@react-navigation/native';
const LandingScreen = () => {
  // to get current route name
  const route = useRoute();
  // to navigate pages
  const navigation = useNavigation();
  return (
    <Screen>
      <Text>LandingScreen</Text>
    </Screen>
  );
};

export default LandingScreen;

const styles = StyleSheet.create({});