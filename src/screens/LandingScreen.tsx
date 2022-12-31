import {StyleSheet, Text} from 'react-native';
import React from 'react';
import Screen from '../components/Screen';
import {useNavigation, useRoute} from '@react-navigation/native';
import {View} from 'react-native';
import Icon from '../components/Icon';
import {IMAGES} from '../common/images';
import {Button} from '../components/Buttons';
import {COLORS} from '../common/utils/colors';
import {ROUTES} from '../common/routes';

const LandingScreen = () => {
  // to get current route name
  const route = useRoute();
  // to navigate pages
  const navigation = useNavigation();
  const handleOnPress = route => {
    navigation.navigate(route);
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E0EBEB',
      }}>
      <View>
        <Text style={{color: '#000', fontSize: 40, textAlign: 'center'}}>
          Welcome
        </Text>
        <Text style={{color: '#000'}}>Join us with your Google account</Text>
      </View>
      <Icon source={IMAGES.ic_catSmile} size={240} />
      <Button
        text={'Continue to Home Screen'}
        gradientColor={[COLORS.LIGHTGREEN, COLORS.MIDGREEN, COLORS.GREENNORMAL]}
        textStyle={{paddingHorizontal: 20}}
        onPress={() => handleOnPress(ROUTES.HOME_SCREEN)}
      />
    </View>
  );
};

export default LandingScreen;

const styles = StyleSheet.create({});
