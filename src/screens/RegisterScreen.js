/* eslint-disable prettier/prettier */
import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Screen from '../components/Screen';
import {Button, ButtonOutline} from '../components/Buttons';
import BottomNav from '../components/BottomNav';
import {useRoute} from '@react-navigation/native';
import Header from '../components/Header';
import {TEXT_SHADOW} from '../common/utils/styles';
import {IMAGES} from '../common/images';
import {ROUTES} from '../common/routes';
import {TextField} from 'rn-material-ui-textfield';
import {COLORS} from '../common/utils/colors';
import {SIZE} from '../common/utils/size';
import {FONT_WEIGHT} from '../common/utils/font';

const RegisterScreen = ({navigation}) => {
  const [email, setEmail] = React.useState();
  const [username, setUsername] = React.useState();
  const [password, setPassword] = React.useState();
  const [confirmPassword, setConfirmPassword] = React.useState();
  const handleLogin = () => {
    navigation.navigate(ROUTES.HOME_SCREEN);
  };
  return (
    <Screen>
      <Header />
      <Image source={IMAGES.ic_app_round} style={styles.icon} />
      <Text style={[styles.title, TEXT_SHADOW]}>LOGIN</Text>
      <View style={styles.textInputContainer}>
        <TextField
          tintColor={COLORS.GREEN100}
          baseColor={COLORS.WHITE}
          textColor={COLORS.WHITE}
          labelFontSize={SIZE.x16}
          fontSize={SIZE.x22}
          value={email}
          onChangeText={text => setEmail(text)}
          label="Email"
          keyboardtype="email-address"
        />
      </View>
      <View style={styles.textInputContainer}>
        <TextField
          tintColor={COLORS.GREEN100}
          baseColor={COLORS.WHITE}
          textColor={COLORS.WHITE}
          labelFontSize={SIZE.x16}
          fontSize={SIZE.x22}
          value={username}
          onChangeText={text => setUsername(text)}
          label="Username"
        />
      </View>
      <View style={styles.textInputContainer}>
        <TextField
          tintColor={COLORS.GREEN100}
          baseColor={COLORS.WHITE}
          textColor={COLORS.WHITE}
          labelFontSize={SIZE.x16}
          fontSize={SIZE.x22}
          secureTextEntry={true}
          value={password}
          onChangeText={text => setPassword(text)}
          label="Password"
        />
      </View>
      <View style={styles.textInputContainer}>
        <TextField
          tintColor={COLORS.GREEN100}
          baseColor={COLORS.WHITE}
          textColor={COLORS.WHITE}
          labelFontSize={SIZE.x16}
          fontSize={SIZE.x22}
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={text => setConfirmPassword(text)}
          label="Confirm Password"
        />
      </View>
      <ButtonOutline
        text={'REGISTER'}
        onPress={handleLogin}
        containerStyle={styles.buttonContainer}
        textStyle={styles.buttonText}
      />
    </Screen>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  icon: {
    height: SIZE.x150,
    marginTop: SIZE.x20,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  title: {
    fontSize: SIZE.x30,
    FONT_WEIGHT: FONT_WEIGHT.x700,
    color: COLORS.WHITE,
    marginTop: SIZE.x46,
    alignSelf: 'center',
  },
  textInputContainer: {
    width: SIZE.x300,
    alignSelf: 'center',
  },
  buttonContainer: {
    width: SIZE.x300,
    marginTop: SIZE.x50,
    alignSelf: 'center',
  },
  buttonText: {
    color: COLORS.WHITE,
  },
});
