import {StyleSheet, SafeAreaView} from 'react-native';
import React from 'react';
import {COLORS} from '../common/utils/colors';
import LinearGradient from 'react-native-linear-gradient';
import {ScrollView} from 'react-native-gesture-handler';
import {ScreenPropType} from './types';
const Screen = (props: ScreenPropType) => {
  const isBGGradient = props?.isBGGradient ?? true;
  const style = props?.style;
  const children = props?.children;
  if (isBGGradient) {
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
