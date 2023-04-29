import { StyleSheet, Text } from 'react-native';
import React, { useEffect } from 'react';
import Screen from '../components/Screen';
import { useRoute } from '@react-navigation/native';
import { View } from 'react-native';
import Icon from '../components/Icon';
import { IMAGES } from '../common/images';
import { Button } from '../components/Buttons';
import { COLORS } from '../common/utils/colors';
import { ROUTES } from '../common/routes';
import { onGoogleButtonPress } from '../services/auth/googleSignIn';
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { fetchUser } from '../services/redux/slice/user';
import { useDispatch, useSelector } from 'react-redux';
import { FirebaseCurrentUserType } from '../common/types';
import { StateType } from '../services/redux/type';
import { isValid } from '../common/validation';
import { asyncThunkFullfiled } from '../common/validation';
const LandingScreen = (props) => {
  const route = useRoute();
  const navigation = props.navigation
  const user = useSelector((state: StateType) => state.User.user);
  const dispatch = useDispatch<any>()
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(async (firebaseCurrentUser: FirebaseCurrentUserType) => {
      if (firebaseCurrentUser?.displayName) {
        const dispatched = await dispatch(fetchUser(firebaseCurrentUser.displayName))
        // is firebase authenticated and registered
        if (asyncThunkFullfiled(dispatched) && isValid(firebaseCurrentUser) && isValid(user)) navigation.navigate(ROUTES.HOME_SCREEN)
        // is firebase authenticated but not registered
        if (asyncThunkFullfiled(dispatched) && isValid(firebaseCurrentUser) && isValid(user) === false) navigation.navigate(ROUTES.REGISTER_SCREEN)
      }
    });
    return subscriber; // unsubscribe on unmount
  }, []);


  const handleOnPress = async () => {
    try {
      const googleSignIn = await onGoogleButtonPress();
    } catch (error) {
      console.error(error);
    }
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
        <Text style={{ color: '#000', fontSize: 40, textAlign: 'center' }}>
          Welcome
        </Text>
        <Text style={{ color: '#000' }}>Join us with your Google account</Text>
      </View>
      <Icon source={IMAGES.ic_catSmile} size={240} />
      <Button
        text={'Continue wtih Google'}
        gradientColor={[COLORS.LIGHTGREEN, COLORS.MIDGREEN, COLORS.GREENNORMAL]}
        textStyle={{ paddingHorizontal: 20 }}
        onPress={handleOnPress}
      />
    </View>
  );
};

export default LandingScreen;

const styles = StyleSheet.create({});
