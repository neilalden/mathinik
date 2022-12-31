import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {SIZE} from '../common/utils/size';
import {IMAGES} from '../common/images';
import {IconPropType} from './types';

const Icon = (props: IconPropType) => {
  const source = props?.source ?? IMAGES.ic_app;
  const size = props?.size ?? SIZE.x20;
  const imageStyle = props?.imageStyle;
  const containerStyle = props?.containerStyle;
  const onPress = props?.onPress;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={onPress ? 0.5 : 1}
      style={[containerStyle, {height: size, width: size}]}>
      <Image
        source={source}
        style={[imageStyle, styles.icon, {height: size, width: size}]}
      />
    </TouchableOpacity>
  );
};

export default Icon;

const styles = StyleSheet.create({
  icon: {
    resizeMode: 'contain',
    alignSelf: 'center',
  },
});
