import {StyleSheet, Text, Image, View} from 'react-native';
import React from 'react';
import Screen from '../components/Screen';
import {useNavigation, useRoute} from '@react-navigation/native';
import {IMAGES} from '../common/images';
import Icon from '../components/Icon';
import {Button} from '../components/Buttons';
import {COLORS} from '../common/utils/colors';
import {ROUTES} from '../common/routes';
import LinearGradient from 'react-native-linear-gradient';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {ScrollView} from 'react-native-gesture-handler';
import BottomNav from '../components/BottomNav';
const HomeScreen = () => {
  // to get current route name
  const route = useRoute();
  // to navigate pages
  const name = 'Reister';
  const studentName = 'Neil';
  const taskcompleted = 80;
  const navigation = useNavigation();
  const handleOnPress = route => {
    navigation.navigate(route);
  };
  return (
    <>
      <ScrollView style={{backgroundColor: '#E0EBEB'}}>
        <View
          style={{
            flexDirection: 'row',
            margin: 30,

            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontSize: 28,
              color: '#313131',
              fontWeight: 'semibold',
            }}>{`Good Morning ☀️ ${name}`}</Text>
          <Icon
            source={IMAGES.ic_catRead}
            size={80}
            imageStyle={{
              borderRadius: 100,
              backgroundColor: '#152238',
            }}
          />
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
                fontSize: 24,
              }}>{`You have solved ${taskcompleted}% of your task!`}</Text>
          </View>
          <View style={{flex: 1}}>
            <Icon source={IMAGES.ic_catSleep} size={150} />
          </View>
        </LinearGradient>

        <View style={{marginTop: 40, marginHorizontal: 30}}>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: '#000000'}}>
            TODO
          </Text>
        </View>

        {/* CARD COMPONENT */}
        <TouchableOpacity>
          <LinearGradient
            colors={[COLORS.LIGHTBLUE, COLORS.MIDBLUE, COLORS.BLUENORMAL]}
            style={{
              flexDirection: 'row',

              marginHorizontal: 30,
              marginTop: 30,
              justifyContent: 'space-between',
              padding: 20,
              borderRadius: 16,
              alignItems: 'center',
            }}>
            <View style={{flexDirection: 'column'}}>
              <Text>Lesson 1</Text>
              <Text>20 points</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={{flexDirection: 'column', marginRight: 6}}>
                <Text>Top Scorer</Text>
                <Text>{`${studentName}`}</Text>
              </View>
              <Icon
                source={IMAGES.ic_catRead}
                size={50}
                imageStyle={{borderRadius: 100, backgroundColor: '#152238'}}
              />
            </View>
          </LinearGradient>
        </TouchableOpacity>
        {/* CARD COMPONENT */}
        <TouchableOpacity>
          <LinearGradient
            colors={[COLORS.LIGHTORANGE, COLORS.MIDORANGE, COLORS.ORANGENORMAL]}
            style={{
              flexDirection: 'row',
              backgroundColor: '#152238',
              marginHorizontal: 30,
              marginTop: 30,
              justifyContent: 'space-between',
              padding: 20,
              borderRadius: 16,
              alignItems: 'center',
            }}>
            <View style={{flexDirection: 'column'}}>
              <Text>Lesson 2</Text>
              <Text>20 points</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={{flexDirection: 'column', marginRight: 6}}>
                <Text>Top Scorer</Text>
                <Text>{`${name}`}</Text>
              </View>
              <Icon
                source={IMAGES.ic_catRead}
                size={50}
                imageStyle={{borderRadius: 100, backgroundColor: '#152238'}}
              />
            </View>
          </LinearGradient>
        </TouchableOpacity>
        <Button
          text={'Continue to Leaderboards'}
          gradientColor={[COLORS.GREEN100, COLORS.MIDGREEN]}
          textStyle={{paddingHorizontal: 20}}
          containerStyle={{marginHorizontal: 30, marginVertical: 20}}
          onPress={() => handleOnPress(ROUTES.LEADERBOARDS_SCREEN)}
        />
      </ScrollView>
      <BottomNav routeName={route.name} navigation={navigation} />
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
