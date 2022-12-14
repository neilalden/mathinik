import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Screen from '../components/Screen';
import {useNavigation, useRoute} from '@react-navigation/native';
import Icon from '../components/Icon';
import {IMAGES} from '../common/images';
import {COLORS} from '../common/utils/colors';
import {Button} from '../components/Buttons';
import {ROUTES} from '../common/routes';
import {ScrollView} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
const LeaderboardsScreen = () => {
  // to get current route name
  const route = useRoute();
  // to navigate pages
  const navigation = useNavigation();
  const handleOnPress = route => {
    navigation.navigate(route);
  };
  // to go back

  const taskcompleted = 90;
  const score = 70;
  const name = 'Alden Escobarta';
  return (
    <ScrollView style={{backgroundColor: '#E0EBEB'}}>
      <LinearGradient
        colors={[COLORS.LIGHTPINK, COLORS.MIDPINK, COLORS.PINKNORMAL]}
        style={{
          flexDirection: 'row',
          marginHorizontal: 30,
          marginTop: 30,
          alignItems: 'center',

          padding: 20,
          borderRadius: 26,
        }}>
        <View style={{flex: 2}}>
          <Text
            style={{
              fontSize: 24,
            }}>{`Your Total Points Is ${taskcompleted}!`}</Text>
        </View>
        <View style={{flex: 1}}>
          <Icon source={IMAGES.ic_catStanding} size={120} />
        </View>
      </LinearGradient>
      <View
        style={{
          backgroundColor: '#fff',
          marginHorizontal: 30,
          marginTop: 30,
          borderRadius: 16,
        }}>
        <Text
          style={{
            fontSize: 32,
            textAlign: 'center',
            marginTop: 44,
            fontWeight: '900',
            color: '#000',
          }}>
          Congratulations!
        </Text>
        <View style={{alignSelf: 'center', marginTop: 38}}>
          <Icon source={IMAGES.ic_badge} size={130} />
        </View>

        <View style={{alignItems: 'center', marginTop: 30, marginBottom: 40}}>
          <Text style={{fontSize: 28, fontWeight: 'bold', color: '#000'}}>
            {name}
          </Text>
          <View style={{alignItems: 'center', marginTop: 30}}>
            <Text style={{fontSize: 24, fontWeight: '500', color: '#000'}}>
              Points
            </Text>
            <Text style={{fontSize: 24, textAlign: 'center', color: '#000'}}>
              {taskcompleted}
            </Text>
          </View>
        </View>
        {/* STUDENT CARDS */}
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            alignItems: 'center',
            width: '80%',
            justifyContent: 'space-between',
            marginVertical: 20,
          }}>
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
          <Text style={{fontSize: 20, fontWeight: '500', color: '#000'}}>
            {name}
          </Text>
          <Text style={{fontSize: 20, fontWeight: '500', color: '#000'}}>
            {score}
          </Text>
        </View>

        {/* STUDENT CARDS */}
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            alignItems: 'center',
            width: '80%',
            justifyContent: 'space-between',
            marginVertical: 20,
          }}>
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
          <Text style={{fontSize: 20, fontWeight: '500', color: '#000'}}>
            {name}
          </Text>
          <Text style={{fontSize: 20, fontWeight: '500', color: '#000'}}>
            {score}
          </Text>
        </View>

        {/* STUDENT CARDS */}
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            alignItems: 'center',
            width: '80%',
            justifyContent: 'space-between',
            marginVertical: 20,
          }}>
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
          <Text style={{fontSize: 20, fontWeight: '500', color: '#000'}}>
            {name}
          </Text>
          <Text style={{fontSize: 20, fontWeight: '500', color: '#000'}}>
            {score}
          </Text>
        </View>
      </View>
      <Button
        text={'Continue to People SC'}
        gradientColor={[COLORS.GREEN300, COLORS.GREEN500]}
        textStyle={{paddingHorizontal: 20}}
        containerStyle={{marginHorizontal: 30, marginVertical: 20}}
        onPress={() => handleOnPress(ROUTES.PEOPLE_SCREEN)}
      />
    </ScrollView>
  );
};

export default LeaderboardsScreen;

const styles = StyleSheet.create({});
