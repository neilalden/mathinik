import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  Touchable,
  View,
} from 'react-native';
import React from 'react';
import {COLORS} from '../common/utils/colors';
import {SIZE} from '../common/utils/size';
import {IMAGES} from '../common/images';
import Icon from './Icon';
import {ROUTES} from '../common/routes';
import {useNavigation, useRoute} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const BottomNav = props => {
  const routeName = useRoute().name;
  const navigation = useNavigation();
  const handleOnPress = route => {
    navigation.navigate(route);
  };
  return (
    <SafeAreaView style={styles.container}>
      {/*HOME */}
      {routeName === ROUTES.HOME_SCREEN ? (
        <View
          style={[
            {
              borderWidth: 3,
              borderRadius: 14,
              borderColor: '#00CC66',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 10,
              marginVertical: 10,
            },
          ]}>
          <Icon
            onPress={() => handleOnPress(ROUTES.HOME_SCREEN)}
            size={SIZE.x40}
            containerStyle={[styles.icon_container]}
            source={
              routeName === ROUTES.HOME_SCREEN
                ? IMAGES.ic_math1
                : IMAGES.ic_whiteMath
            }
          />
        </View>
      ) : (
        <LinearGradient
          colors={[COLORS.LIGHTGREEN, COLORS.MIDGREEN, COLORS.GREENNORMAL]}
          style={[
            {
              alignItems: 'center',
              justifyContent: 'center',
              padding: 10,
              borderRadius: 14,
              marginVertical: 10,
            },
          ]}>
          <Icon
            onPress={() => handleOnPress(ROUTES.HOME_SCREEN)}
            size={SIZE.x40}
            containerStyle={[styles.icon_container]}
            source={
              routeName === ROUTES.HOME_SCREEN
                ? IMAGES.ic_math
                : IMAGES.ic_whiteMath
            }
          />
        </LinearGradient>
      )}
      {/*GRADES*/}
      {routeName === ROUTES.GRADES_SCREEN ? (
        <View
          style={[
            {
              borderWidth: 3,
              borderRadius: 14,
              borderColor: '#00CC66',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 10,
              marginVertical: 10,
            },
          ]}>
          <Icon
            onPress={() => {
              /*handleOnPress(ROUTES.GRADES_SCREEN)*/
            }}
            size={SIZE.x40}
            containerStyle={[styles.icon_container]}
            source={
              routeName === ROUTES.GRADES_SCREEN
                ? IMAGES.ic_calendar1
                : IMAGES.ic_whiteGrades
            }
          />
        </View>
      ) : (
        <LinearGradient
          colors={[COLORS.LIGHTGREEN, COLORS.MIDGREEN, COLORS.GREENNORMAL]}
          style={[
            {
              alignItems: 'center',
              justifyContent: 'center',
              padding: 10,
              borderRadius: 14,
              marginVertical: 10,
            },
          ]}>
          <Icon
            // onPress={() => handleOnPress(ROUTES.GRADES_SCREEN)}
            size={SIZE.x40}
            containerStyle={[styles.icon_container]}
            source={
              routeName === ROUTES.GRADES_SCREEN
                ? IMAGES.ic_calendar1
                : IMAGES.ic_whiteGrades
            }
          />
        </LinearGradient>
      )}

      {/*LEADERBOARDS */}
      {routeName === ROUTES.LEADERBOARDS_SCREEN ? (
        <View
          style={[
            {
              borderWidth: 3,
              borderRadius: 14,
              borderColor: '#00CC66',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 10,
              marginVertical: 10,
            },
          ]}>
          <Icon
            onPress={() => handleOnPress(ROUTES.LEADERBOARDS_SCREEN)}
            size={SIZE.x40}
            containerStyle={[styles.icon_container]}
            source={
              routeName === ROUTES.LEADERBOARDS_SCREEN
                ? IMAGES.ic_leaderboards1
                : IMAGES.ic_whiteLeaderboards
            }
          />
        </View>
      ) : (
        <LinearGradient
          colors={[COLORS.LIGHTGREEN, COLORS.MIDGREEN, COLORS.GREENNORMAL]}
          style={[
            {
              alignItems: 'center',
              justifyContent: 'center',
              padding: 10,
              borderRadius: 14,
              marginVertical: 10,
            },
          ]}>
          <Icon
            onPress={() => handleOnPress(ROUTES.LEADERBOARDS_SCREEN)}
            size={SIZE.x40}
            containerStyle={[styles.icon_container]}
            source={
              routeName === ROUTES.LEADERBOARDS_SCREEN
                ? IMAGES.ic_leaderboards1
                : IMAGES.ic_whiteLeaderboards
            }
          />
        </LinearGradient>
      )}
      {/*PEOPLE */}
      {routeName === ROUTES.PEOPLE_SCREEN ? (
        <View
          style={[
            {
              borderWidth: 3,
              borderRadius: 14,
              borderColor: '#00CC66',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 10,
              marginVertical: 10,
            },
          ]}>
          <Icon
            onPress={() => handleOnPress(ROUTES.PEOPLE_SCREEN)}
            size={SIZE.x40}
            containerStyle={[styles.icon_container]}
            source={
              routeName === ROUTES.PEOPLE_SCREEN
                ? IMAGES.ic_doubleprofile1
                : IMAGES.ic_whiteDoubleProfile
            }
          />
        </View>
      ) : (
        <LinearGradient
          colors={[COLORS.LIGHTGREEN, COLORS.MIDGREEN, COLORS.GREENNORMAL]}
          style={[
            {
              alignItems: 'center',
              justifyContent: 'center',
              padding: 10,
              borderRadius: 14,
              marginVertical: 10,
            },
          ]}>
          <Icon
            onPress={() => handleOnPress(ROUTES.PEOPLE_SCREEN)}
            size={SIZE.x40}
            containerStyle={[styles.icon_container]}
            source={
              routeName === ROUTES.PEOPLE_SCREEN
                ? IMAGES.ic_doubleprofile1
                : IMAGES.ic_whiteDoubleProfile
            }
          />
        </LinearGradient>
      )}
    </SafeAreaView>
  );
};
export default BottomNav;

const styles = StyleSheet.create({
  icon_container: {},
  container: {
    backgroundColor: '#E0EBEB',
    height: SIZE.x80,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
