import React from 'react';
import {ScrollView} from 'react-native';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import Icon from '../components/Icon';
import {IMAGES} from '../common/images';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS} from '../common/utils/colors';
import {Button} from '../components/Buttons';
import {SIZE} from '../common/utils/size';
const StudentQuizScreen = () => {
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
          position: 'absolute',
          marginVertical: 30,
          marginHorizontal: 20,
          zIndex: 1,
        }}>
        <Icon source={IMAGES.ic_arrowBack} onPress={handleBack} size={40} />
      </View>
      <View
        style={{
          marginVertical: 30,
          marginHorizontal: 20,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View style={{justifyContent: 'center'}}>
          <Text style={{color: '#000', fontSize: 24}}>Surprise Quiz</Text>
        </View>
        <View
          style={{
            width: SIZE.p60,
            height: SIZE.x6,
            marginTop: 20,
            backgroundColor: '#00CC66',
          }}></View>
      </View>
      <View
        style={{
          backgroundColor: COLORS.WHITE,
          borderRadius: 15,
          marginHorizontal: 16,
        }}>
        <View style={{alignSelf: 'center', marginTop: 40}}>
          <Icon source={IMAGES.ic_catRead} size={200} />
        </View>
        <View style={{alignSelf: 'center', marginTop: 22, marginBottom: 46}}>
          <Text style={{color: '#00CC66', fontSize: 20, fontWeight: 'bold'}}>
            10 Points
          </Text>
        </View>
        <View style={{marginHorizontal: 20, marginBottom: 46}}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 20,
              fontWeight: 'bold',
              color: COLORS.BLACK,
            }}>
            Lorem ipsum dolor sit amet, consectetur sam elit. elit viverra massa
            same ut id?
          </Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <TouchableOpacity
            style={{backgroundColor: '#B3FFD9', padding: 10, borderRadius: 50}}>
            <Text
              style={{color: COLORS.BLACK, fontSize: 16, fontWeight: 'bold'}}>
              4.3 Liters
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{backgroundColor: '#00CC66', padding: 10, borderRadius: 50}}>
            <Text
              style={{color: COLORS.WHITE, fontSize: 16, fontWeight: 'bold'}}>
              4.3 Liters
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{backgroundColor: '#B3FFD9', padding: 10, borderRadius: 50}}>
            <Text
              style={{color: COLORS.BLACK, fontSize: 16, fontWeight: 'bold'}}>
              4.3 Liters
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 20,
            marginBottom: 40,
          }}>
          <TouchableOpacity
            style={{backgroundColor: '#B3FFD9', padding: 10, borderRadius: 50}}>
            <Text
              style={{color: COLORS.BLACK, fontSize: 16, fontWeight: 'bold'}}>
              4.3 Liters
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{backgroundColor: '#B3FFD9', padding: 10, borderRadius: 50}}>
            <Text
              style={{color: COLORS.BLACK, fontSize: 16, fontWeight: 'bold'}}>
              4.3 Liters
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{backgroundColor: '#B3FFD9', padding: 10, borderRadius: 50}}>
            <Text
              style={{color: COLORS.BLACK, fontSize: 16, fontWeight: 'bold'}}>
              4.3 Liters
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Button
        text={'Next'}
        gradientColor={[COLORS.LIGHTGREEN, COLORS.MIDGREEN, COLORS.GREENNORMAL]}
        textStyle={{paddingHorizontal: 20, textTransform: 'uppercase'}}
        containerStyle={{marginHorizontal: 30, marginVertical: 20}}
        onPress={() => {}}
      />
    </ScrollView>
  );
};

export default StudentQuizScreen;
