import React from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import Icon from '../components/Icon';
import {IMAGES} from '../common/images';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS} from '../common/utils/colors';
import {Button} from '../components/Buttons';
import {ROUTES} from '../common/routes';

const StudentLessonScreen = () => {
  const route = useRoute();
  // to navigate pages
  const navigation = useNavigation();
  const handleOnPress = route => {
    navigation.navigate(route);
  };
  const handleBack = () => {
    navigation.goBack();
  };

  return (
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
      </View>
      <LinearGradient
        colors={[COLORS.LIGHTGREEN, COLORS.MIDGREEN, COLORS.GREENNORMAL]}
        style={{
          flexDirection: 'row',
          marginHorizontal: 30,
          alignItems: 'center',
          padding: 20,
          borderRadius: 26,
        }}>
        <View style={{flex: 2}}>
          <Text
            style={{
              color: 'white',
              fontSize: 20,
            }}>{`Kindly check the given module and analyze the sample problems below`}</Text>
        </View>
        <View style={{flex: 1}}>
          <Icon source={IMAGES.ic_catRead} size={100} />
        </View>
      </LinearGradient>
      <View
        style={{
          backgroundColor: '#fff',
          marginHorizontal: 30,
          marginTop: 30,
          borderRadius: 16,
        }}>
        <View
          style={{
            marginTop: 40,
            marginHorizontal: 20,
          }}>
          <Text style={{color: '#000', fontSize: 20, fontWeight: 'bold'}}>
            Parabola
          </Text>
        </View>
        <View style={{marginHorizontal: 20, marginVertical: 40}}>
          <Text style={{color: '#000', fontSize: 16, fontWeight: 'bold'}}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </Text>
        </View>
      </View>
      <Button
        text={'Take the Quiz'}
        gradientColor={[COLORS.LIGHTGREEN, COLORS.MIDGREEN, COLORS.GREENNORMAL]}
        textStyle={{paddingHorizontal: 20, textTransform: 'uppercase'}}
        containerStyle={{marginHorizontal: 30, marginVertical: 20}}
        onPress={() => {}}
      />
      <Button
        text={'STUDENT QUIZ SCREEN'}
        gradientColor={[COLORS.GREEN100, COLORS.MIDGREEN]}
        textStyle={{paddingHorizontal: 20}}
        containerStyle={{marginHorizontal: 30, marginVertical: 20}}
        onPress={() => handleOnPress(ROUTES.STUDENT_QUIZ_SCREEN)}
      />
    </ScrollView>
  );
};

export default StudentLessonScreen;
