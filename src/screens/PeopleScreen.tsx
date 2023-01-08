import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Screen from '../components/Screen';
import {useNavigation, useRoute} from '@react-navigation/native';
import Icon from '../components/Icon';
import {IMAGES} from '../common/images';
import {Button} from '../components/Buttons';
import {COLORS} from '../common/utils/colors';
import {ROUTES} from '../common/routes';
import {ScrollView} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import BottomNav from '../components/BottomNav';
const PeopleScreen = () => {
  // to get current route name
  const route = useRoute();
  // to navigate pages
  const navigation = useNavigation();
  const taskcompleted = 90;
  const score = 70;
  const handleOnPress = route => {
    navigation.navigate(route);
  };
  const name = 'Alden Escobarta';
  return (
    <>
      <ScrollView style={{backgroundColor: '#E0EBEB'}}>
        <View
          style={{
            backgroundColor: '#fff',
            marginHorizontal: 30,
            marginTop: 30,
            borderRadius: 16,
            paddingBottom: 20,
          }}>
          <View
            style={{
              marginVertical: 30,
              marginLeft: 30,
            }}>
            <Text
              style={{
                fontSize: 28,
                fontWeight: '800',
                textTransform: 'uppercase',
                color: COLORS.BLACK,
              }}>
              Teacher
            </Text>
          </View>
          {/* STUDENT CARDS */}
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
              alignItems: 'center',
              width: '80%',

              paddingHorizontal: 10,
              borderRadius: 6,
              justifyContent: 'space-between',
            }}>
            <Text
              style={{fontSize: 20, fontWeight: '500', color: COLORS.BLACK}}>
              {name}
            </Text>

            <View style={{borderRadius: 100}}>
              <Icon
                imageStyle={{
                  borderRadius: 100,
                  backgroundColor: 'gray',
                }}
                source={IMAGES.ic_badge}
                size={30}
              />
            </View>
          </View>
          {/* STUDENT CARDS */}
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
              alignItems: 'center',
              width: '80%',

              paddingHorizontal: 10,
              borderRadius: 6,
              justifyContent: 'space-between',
              marginVertical: 10,
            }}>
            <Text
              style={{fontSize: 20, fontWeight: '500', color: COLORS.BLACK}}>
              {name}
            </Text>

            <View style={{borderRadius: 100}}>
              <Icon
                imageStyle={{
                  borderRadius: 100,
                  backgroundColor: 'gray',
                }}
                source={IMAGES.ic_badge}
                size={30}
              />
            </View>
          </View>
          {/* END OF STUDENT CARDS */}

          <View
            style={{
              marginVertical: 30,
              marginLeft: 30,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                fontSize: 28,
                fontWeight: '800',
                textTransform: 'uppercase',
                color: COLORS.BLACK,
              }}>
              Students
            </Text>
            <TouchableOpacity style={{marginRight: 40}}>
              <Icon source={IMAGES.ic_add} size={30} />
            </TouchableOpacity>
          </View>
          {/* STUDENT CARDS */}
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
              alignItems: 'center',
              width: '80%',

              paddingHorizontal: 10,
              borderRadius: 6,
              justifyContent: 'space-between',
            }}>
            <Text
              style={{fontSize: 20, fontWeight: '500', color: COLORS.BLACK}}>
              {name}
            </Text>

            <View style={{borderRadius: 100}}>
              <Icon
                imageStyle={{
                  borderRadius: 100,
                  backgroundColor: 'gray',
                }}
                source={IMAGES.ic_badge}
                size={30}
              />
            </View>
          </View>
          {/* STUDENT CARDS */}
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
              alignItems: 'center',
              width: '80%',

              paddingHorizontal: 10,
              borderRadius: 6,
              justifyContent: 'space-between',
              marginVertical: 10,
            }}>
            <Text
              style={{fontSize: 20, fontWeight: '500', color: COLORS.BLACK}}>
              {name}
            </Text>

            <View style={{borderRadius: 100}}>
              <Icon
                imageStyle={{
                  borderRadius: 100,
                  backgroundColor: 'gray',
                }}
                source={IMAGES.ic_badge}
                size={30}
              />
            </View>
          </View>
          {/* END OF STUDENT CARDS */}
        </View>
        <Button
          text={'Continue to Register SC'}
          gradientColor={[COLORS.GREEN300, COLORS.GREEN500]}
          textStyle={{paddingHorizontal: 20}}
          containerStyle={{marginHorizontal: 30, marginVertical: 20}}
          onPress={() => handleOnPress(ROUTES.REGISTER_SCREEN)}
        />
      </ScrollView>
      <BottomNav routeName={route.name} navigation={navigation} />
    </>
  );
};

export default PeopleScreen;

const styles = StyleSheet.create({});
