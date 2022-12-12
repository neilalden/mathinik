import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Screen from '../components/Screen';
import {Button} from '../components/Buttons';
import {COLORS} from '../common/utils/colors';
import {SIZE} from '../common/utils/size';
import {FONT_WEIGHT} from '../common/utils/font';
import {IMAGES} from '../common/images';
import {TextField} from 'rn-material-ui-textfield';
import {TEXT_SHADOW} from '../common/utils/styles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Header from '../components/Header';
import {ROUTES} from '../common/routes';
const LoginScreen = ({navigation}) => {
  const [username, setUsername] = React.useState();
  const [password, setPassword] = React.useState();
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
      <Button
        text={'LOGIN'}
        onPress={handleLogin}
        containerStyle={styles.buttoContainer}
        textStyle={styles.buttoText}
        gradientColor={[COLORS.WHITE, COLORS.GREEN300]}
      />
    </Screen>
  );
};

export default LoginScreen;

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
    marginTop: SIZE.x10,
  },
  buttoContainer: {
    width: SIZE.x300,
    marginTop: SIZE.x50,
    alignSelf: 'center',
  },
  buttoText: {
    color: COLORS.DARKGREEN,
  },
});
