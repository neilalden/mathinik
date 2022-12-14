import {StyleSheet, Text} from 'react-native';
import React from 'react';
import Screen from '../components/Screen';
import {useNavigation, useRoute} from '@react-navigation/native';
const LeaderboardsScreen = () => {
  // to get current route name
  const route = useRoute();
  // to navigate pages
  const navigation = useNavigation();
  return (
    <Screen>
      <Text>LeaderboardsScreen</Text>
    </Screen>
  );
};

export default LeaderboardsScreen;

const styles = StyleSheet.create({});
