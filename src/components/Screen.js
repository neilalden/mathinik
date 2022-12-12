import {StyleSheet, SafeAreaView} from 'react-native';
import React from 'react';
import {COLORS} from '../common/utils/colors';
import LinearGradient from 'react-native-linear-gradient';
import {ScrollView} from 'react-native-gesture-handler';

const Screen = ({gradientBG = true, style, children}) => {
  if (gradientBG) {
    return (
      <LinearGradient
        colors={[COLORS.GREEN500, COLORS.DARKGREEN]}
        style={styles.container}>
        <SafeAreaView style={[styles.container, style]}>
          <ScrollView>{children}</ScrollView>
        </SafeAreaView>
      </LinearGradient>
    );
  } else {
    return (
      <SafeAreaView style={[styles.container, style]}>{children}</SafeAreaView>
    );
  }
};

export default Screen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
