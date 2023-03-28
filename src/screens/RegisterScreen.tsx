import { Text, View, StyleSheet } from 'react-native';
import React, { useEffect, useState, } from 'react';
import Screen from '../components/Screen';
import { useRoute } from '@react-navigation/native';
import Icon from '../components/Icon';
import { Button } from '../components/Buttons';
import { COLORS } from '../common/utils/colors';
import { ROUTES } from '../common/routes';
import { ScrollView } from 'react-native-gesture-handler';
import { IMAGES } from '../common/images';
import TextInput from '../components/TextInput';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, getUser, registerUser } from '../services/redux/slice/user';
import { FirebaseCurrentUserType, StudentAccountType } from '../common/types';
import { Style } from '../common/styles';
import { StateType } from '../services/redux/type';
import AwesomeAlert from 'react-native-awesome-alerts';
import { isValid } from '../common/validation';
import { setStateEmptyString } from '../common/utils/utility';
import auth from "@react-native-firebase/auth";
import { unwrapResult } from '@reduxjs/toolkit';
import { asyncThunkFullfiled } from '../services/redux/store';


const RegisterScreen = (props) => {
  const navigation = props.navigation;
  const dispatch = useDispatch()
  const [fullname, setFullname] = useState("")
  const [id, setId] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")
  const user = useSelector((state: StateType) => state.User);

  useEffect(() => {
    if (!user.loading && user?.error) {
      setShowAlert(true)
      setAlertMessage(user.error)
    }
  }, [user.user])

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((firebaseCurrentUser: FirebaseCurrentUserType) => {
      if (firebaseCurrentUser?.displayName) {
        dispatch(fetchUser(firebaseCurrentUser.displayName))
      }
      // is firebase authenticated and registered
      if (isValid(firebaseCurrentUser) && isValid(user.user)) navigation.navigate(ROUTES.HOME_SCREEN)
      // is firebase authenticated but not registered
      if (!isValid(firebaseCurrentUser)) navigation.navigate(ROUTES.LANDING_SCREEN)
    });
    return subscriber; // unsubscribe on unmount
  }, []);

  const handleOnPress = async () => {
    const valid = isValid(fullname, id, phoneNumber)
    if (!valid) {
      setShowAlert(true)
      setAlertMessage("Please fill up every field in the form")
      return
    }
    const data: StudentAccountType = {
      fullname,
      id,
      phoneNumber,
      isTeacher: false,
      dateCreated: new Date()
    }
    const registration = await dispatch(registerUser(data))
    if (asyncThunkFullfiled(registration)) {
      navigation.navigate(ROUTES.HOME_SCREEN)
    }
    setStateEmptyString(
      setFullname,
      setId,
      setPhoneNumber,
      setAlertMessage
    )
  };

  return (
    <ScrollView style={{ backgroundColor: '#E0EBEB' }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 30,
        }}>
        <View>
          <Text style={{ color: '#000', fontSize: 16, fontWeight: '700' }}>
            Excited to learn with you,
          </Text>
          <Text style={Style.MegaTitle} >
            sign up!
          </Text>
        </View>
      </View>
      <View
        style={{
          backgroundColor: '#fff',
          marginHorizontal: 30,
          marginTop: 30,
          borderRadius: 16,
          paddingBottom: 20,
        }}>
        <View style={{ marginTop: 46, alignSelf: 'center', marginBottom: 80 }}>
          <Icon
            source={IMAGES.ic_catRead}
            size={140}
            imageStyle={{ borderRadius: 100, backgroundColor: '#152238' }}
          />
        </View>
        <TextInput
          label={"Fullname"}
          value={fullname}
          onChange={(text: string) => setFullname(text)}
          placeholder={"Juan Dela Cruz"}
          containerStyle={styles.containerStyle}
        />
        <TextInput
          label={"Student ID"}
          value={id}
          onChange={(text: string) => setId(text)}
          placeholder={"0418-xxxx"}
          keyboardType="numeric"
          containerStyle={styles.containerStyle}
        />
        {/* TEXT INPUT VIEW  */}
        <TextInput
          label={"Phone Number"}
          value={phoneNumber}
          onChange={(text: string) => setPhoneNumber(text)}
          keyboardType="phone-pad"
          placeholder="+639042541336"
          containerStyle={styles.containerStyle}
        />
      </View>
      <Button
        text={'Continue ADD Question SC'}
        gradientColor={[COLORS.GREEN300, COLORS.GREEN500]}
        textStyle={{ paddingHorizontal: 20 }}
        containerStyle={{ marginHorizontal: 30, marginVertical: 20 }}
        onPress={handleOnPress}
      />
      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title={"Error"}
        message={alertMessage}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        cancelText="Close"
        cancelButtonColor={COLORS.RED}
        onCancelPressed={() => setShowAlert(false)}
      />
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  containerStyle: { paddingHorizontal: 12, paddingBottom: 12 }
})
export default RegisterScreen;

