import {StyleSheet, Text, View, TextInput} from 'react-native';
import React from 'react';
import Screen from '../components/Screen';
import {useNavigation, useRoute} from '@react-navigation/native';
import Icon from '../components/Icon';
import {Button} from '../components/Buttons';
import {COLORS} from '../common/utils/colors';
import {ROUTES} from '../common/routes';
import {ScrollView} from 'react-native-gesture-handler';
import {IMAGES} from '../common/images';
const RegisterScreen = () => {
  // to get current route name
  const route = useRoute();
  // to navigate pages
  const navigation = useNavigation();
  const handleOnPress = route => {
    navigation.navigate(route);
  };
  return (
    <ScrollView style={{backgroundColor: '#E0EBEB'}}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 30,
        }}>
        <View>
          <Text style={{color: '#000', fontSize: 16, fontWeight: '700'}}>
            Excited to learn with you,
          </Text>
          <Text
            style={{
              color: '#000',
              fontSize: 40,
              textAlign: 'center',
              fontWeight: '800',
              textTransform: 'uppercase',
            }}>
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
        <View style={{marginTop: 46, alignSelf: 'center', marginBottom: 80}}>
          <Icon
            source={IMAGES.ic_catRead}
            size={140}
            imageStyle={{borderRadius: 100, backgroundColor: '#152238'}}
          />
        </View>
        {/* TEXT INPUT VIEW  */}
        <View
          style={{
            backgroundColor: 'transparent',
            marginHorizontal: 20,
            borderWidth: 1,
            borderColor: '#00CC66',
            borderRadius: 16,
            marginBottom: 30,
          }}>
          <View
            style={{
              position: 'absolute',
              marginLeft: 10,
              marginTop: 2,
            }}>
            <Text style={{fontWeight: 'bold', color: '#000'}}>Name</Text>
          </View>
          <View style={{marginLeft: 6, paddingTop: 12}}>
            <TextInput style={{fontSize: 16}} placeholder="Neil Escobarta" />
          </View>
        </View>
        {/* TEXT INPUT VIEW  */}
        <View
          style={{
            backgroundColor: 'transparent',
            marginHorizontal: 20,
            borderWidth: 1,
            borderColor: '#00CC66',
            borderRadius: 16,
            marginBottom: 30,
          }}>
          <View
            style={{
              position: 'absolute',
              marginLeft: 10,
              marginTop: 2,
            }}>
            <Text style={{fontWeight: 'bold', color: '#000'}}>Student ID</Text>
          </View>
          <View style={{marginLeft: 6, marginTop: 10}}>
            <TextInput
              style={{fontSize: 16}}
              keyboardType="numeric"
              placeholder="0418-xxxx"
            />
          </View>
        </View>
        {/* TEXT INPUT VIEW  */}
        <View
          style={{
            backgroundColor: 'transparent',
            marginHorizontal: 20,
            borderWidth: 1,
            borderColor: '#00CC66',
            borderRadius: 16,
            marginBottom: 30,
          }}>
          <View
            style={{
              position: 'absolute',
              marginLeft: 10,
              marginTop: 2,
            }}>
            <Text style={{fontWeight: 'bold', color: '#000'}}>Password</Text>
          </View>
          <View style={{marginLeft: 6, marginTop: 10}}>
            <TextInput style={{fontSize: 16}} secureTextEntry={true} />
          </View>
        </View>
        {/* TEXT INPUT VIEW  */}
        <View
          style={{
            backgroundColor: 'transparent',
            marginHorizontal: 20,
            borderWidth: 1,
            borderColor: '#00CC66',
            borderRadius: 16,
            marginBottom: 30,
          }}>
          <View
            style={{
              position: 'absolute',
              marginLeft: 10,
              marginTop: 2,
            }}>
            <Text style={{fontWeight: 'bold', color: '#000'}}>
              Phone Number
            </Text>
          </View>
          <View style={{marginLeft: 6, marginTop: 10}}>
            <TextInput
              style={{fontSize: 16}}
              keyboardType="numeric"
              placeholder="+639042541336"
            />
          </View>
        </View>
      </View>
      <Button
        text={'Continue ADD Question SC'}
        gradientColor={[COLORS.GREEN300, COLORS.GREEN500]}
        textStyle={{paddingHorizontal: 20}}
        containerStyle={{marginHorizontal: 30, marginVertical: 20}}
        onPress={() => handleOnPress(ROUTES.ADD_QUESTION_SCREEN)}
      />
    </ScrollView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
