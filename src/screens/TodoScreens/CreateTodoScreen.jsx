import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Screen from '../../components/Screen';
import {useNavigation, useRoute} from '@react-navigation/native';
import Icon from '../../components/Icon';
import {IMAGES} from '../../common/images';
import Quiz from '../../components/Quiz';
import {Button} from '../../components/Buttons';
import {COLORS} from '../../common/utils/colors';
import Activities from '../../components/Activities';
import Lectures from '../../components/Lectures';
import {ScrollView} from 'react-native-gesture-handler';
import {ROUTES} from '../../common/routes';

const CreateTodoScreen = () => {
  const handleBack = () => {
    navigation.goBack();
  };

  const handleOnPress = route => {
    navigation.navigate(route);
  };
  const View1 = () => {
    return (
      <Quiz
        day={day}
        date={date}
        pst={pst}
        deadlineSwitch={deadlineSwitch}
        setDeadlineSwitch={setDeadlineSwitch}
      />
    );
  };
  const View2 = () => {
    return (
      <Activities
        day={day}
        date={date}
        pst={pst}
        deadlineSwitch={deadlineSwitch}
        setDeadlineSwitch={setDeadlineSwitch}
      />
    );
  };
  const View3 = () => {
    return (
      <Lectures
        day={day}
        date={date}
        pst={pst}
        deadlineSwitch={deadlineSwitch}
        setDeadlineSwitch={setDeadlineSwitch}
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
  const date = 'October 10, 2010';
  const day = 'Monday';
  const pst = '12:00: 00';

  return (
    <>
      <ScrollView style={{backgroundColor: '#E0EBEB'}}>
        <View
          style={{
            marginVertical: 30,
            marginLeft: 18,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View>
            <Icon source={IMAGES.ic_arrowBack} onPress={handleBack} size={40} />
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginRight: 14,
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
                  fontSize: 20,
                  fontWeight: 'bold',
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
                  fontWeight: 'bold',
                  fontSize: 20,
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
                  fontWeight: 'bold',
                  fontSize: 20,
                  textAlign: 'center',
                  color: index == 3 ? COLORS.BLACK : COLORS.WHITE,
                }}>
                Lectures
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {renderView()}
        <Button
          text={'STUDENT LESSON SCREEN'}
          gradientColor={[COLORS.GREEN100, COLORS.MIDGREEN]}
          textStyle={{paddingHorizontal: 20}}
          containerStyle={{marginHorizontal: 30, marginVertical: 20}}
          onPress={() => handleOnPress(ROUTES.STUDENT_LESSON_SCREEN)}
        />
      </ScrollView>
    </>
  );
};

export default CreateTodoScreen;

const styles = StyleSheet.create({});
