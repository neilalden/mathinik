import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View, ScrollView
} from 'react-native';
import React, { useState } from 'react';
import Screen from '../../components/Screen';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from '../../components/Icon';
import { IMAGES } from '../../common/images';
import Quiz from '../../components/Quiz';
import { Button } from '../../components/Buttons';
import { COLORS } from '../../common/utils/colors';
import Activities from '../../components/Activities';
import Lectures from '../../components/Lectures';
import { ROUTES } from '../../common/routes';
import DateTimePicker from '@react-native-community/datetimepicker';
import AwesomeAlert from 'react-native-awesome-alerts';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { BackHandler } from 'react-native';
const CreateTodoScreen = () => {
  const dispatch = useDispatch()

  const handleBack = async () => {
    navigation.goBack();
  };

  const View1 = () => {
    return (
      <Quiz
        deadline={deadline}
        deadlineSwitch={deadlineSwitch}
        setDeadlineSwitch={setDeadlineSwitch}
        showTimepicker={showTimepicker}
        showDatepicker={showDatepicker}
        setShowAlert={setShowAlert}
        setAlertMessage={setAlertMessage}
      />
    );
  };
  const View2 = () => {
    return (
      <Activities
        deadline={deadline}
        deadlineSwitch={deadlineSwitch}
        setDeadlineSwitch={setDeadlineSwitch}
        showTimepicker={showTimepicker}
        showDatepicker={showDatepicker}
        setShowAlert={setShowAlert}
        setAlertMessage={setAlertMessage}
      />
    );
  };
  const View3 = () => {
    return (
      <Lectures
        deadline={deadline}
        deadlineSwitch={deadlineSwitch}
        setDeadlineSwitch={setDeadlineSwitch}
        setShowAlert={setShowAlert}
        setAlertMessage={setAlertMessage}
      />
    );
  };
  const renderView = () => {
    switch (index) {
      case 1:
        return View1();
      case 2:
        return View2();
      case 3:
        return View3();
    }
  };

  // to get current route name
  const route = useRoute();
  // to navigate pages
  const navigation = useNavigation();
  const [index, setIndex] = useState(1);
  const [deadlineSwitch, setDeadlineSwitch] = useState(false);
  const [deadline, setDeadline] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || deadline;
    setShow(Platform.OS === 'ios');
    setDeadline(currentDate);
  };
  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };
  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBack);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBack);
    };
  }, []);
  return (
    <>
      <ScrollView style={{ backgroundColor: '#E0EBEB' }}>

        <View
          style={{
            marginVertical: 30,
            marginLeft: 16,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View>
            <Icon source={IMAGES.ic_arrowBack} onPress={handleBack} size={30} />
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginRight: 16,
              backgroundColor: '#00CC66',
              alignItems: 'center',
              padding: 4,
              borderRadius: 50,
            }}>

            <TouchableOpacity
              style={{
                marginHorizontal: 6,
                backgroundColor: index == 1 ? '#00FF80' : '#00CC66',
                padding: 6,
                borderRadius: 50,
              }}
              onPress={() => {
                setIndex(1);
              }}>

              <Text
                style={{
                  fontSize: 22,
                  fontWeight: '500',
                  textAlign: 'center',
                  color: index == 1 ? COLORS.BLACK : COLORS.WHITE,
                }}>
                Quiz
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                marginHorizontal: 6,
                backgroundColor: index == 2 ? '#00FF80' : '#00CC66',

                padding: 6,
                borderRadius: 50,
              }}
              onPress={() => {
                setIndex(2);
              }}>
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: '500',
                  textAlign: 'center',
                  color: index == 2 ? COLORS.BLACK : COLORS.WHITE,
                }}>
                Activity
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                marginHorizontal: 6,
                backgroundColor: index == 3 ? '#00FF80' : '#00CC66',
                padding: 6,
                borderRadius: 50,
              }}
              onPress={() => {
                setIndex(3);
              }}>
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: '500',
                  textAlign: 'center',
                  color: index == 3 ? COLORS.BLACK : COLORS.WHITE,
                }}>
                Lectures
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={deadline}
            mode={mode}
            is24Hour={false}
            display={'default'}
            onChange={onChange}
          />
        )}

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
        {renderView()}
      </ScrollView>
    </>
  );
};

export default CreateTodoScreen;

const styles = StyleSheet.create({});
