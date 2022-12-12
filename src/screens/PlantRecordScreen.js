/* eslint-disable prettier/prettier */
import {Image, StyleSheet, Text, View, TextInput} from 'react-native';
import React from 'react';
import Screen from '../components/Screen';
import {Button} from '../components/Buttons';
import {IMAGES} from '../common/images';
import BottomNav from '../components/BottomNav';
import {useRoute} from '@react-navigation/native';
import Header from '../components/Header';

const PlantRecordScreen = ({navigation}) => {
  const route = useRoute();
  const handleBack = () => {
    navigation.goBack();
  };
  return (
    <>
      <Screen>
        <Header text="Records" canGoBack={false} />

        {/* <Screen>
    <Image source={IMAGES.ic_app} style={styles.icon} />
    <Text style={[styles.title, TEXT_SHADOW]}>{APP_NAME}</Text>
    <Button
      text={'LOGIN'}
      onPress={handleLogin}
      containerStyle={styles.buttonLoginContainer}
      textStyle={styles.buttonLoginText}
      gradientColor={[COLORS.WHITE, COLORS.GREEN300]}
    />
    <Button
      text={'REGISTER'}
      onPress={handleLogin}
      containerStyle={styles.buttonRegisterContainer}
      textStyle={styles.buttonRegisterText}
    />
  </Screen> */}
        {/* ICONS */}
        <View style={styles.container}>
          <Image
            source={IMAGES.ic_folder}
            style={styles.icon}
            width={30}
            height={30}
          />
          <Image
            source={IMAGES.ic_time}
            style={styles.icon}
            width={30}
            height={30}
          />
          <Image
            source={IMAGES.ic_list}
            style={styles.icon}
            width={30}
            height={30}
          />
        </View>
        {/* SEARCH BAR */}
        <View style={styles.inputContainer}>
          <TextInput style={styles.searchBar} placeholder="SEARCH" />
          <Image
            source={IMAGES.ic_search}
            style={styles.iconers}
            width={30}
            height={30}
          />
        </View>

        {/* CARD COMPONENT */}
        <View style={styles.card}>
          <Image
            source={IMAGES.ic_app_round}
            style={styles.icon}
            width={80}
            height={80}
          />
          <View style={styles.content}>
            <View>
              <Text style={styles.textTitle}>Hello</Text>
            </View>
            <View>
              <Text style={styles.textContent}>lorem2 adfsfsdfhsfjs</Text>
            </View>
          </View>
          <View style={styles.icon2}>
            <Image
              source={IMAGES.ic_three_dots}
              style={styles.icon}
              width={10}
              height={10}
            />
            <Image
              source={IMAGES.ic_note}
              style={styles.icon}
              width={20}
              height={20}
            />
          </View>
        </View>
      </Screen>
      <BottomNav routeName={route.name} navigation={navigation} />
    </>
  );
};

export default PlantRecordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 50,
    borderColor: 'black',
  },
  searchBar: {
    height: 50,
    marginTop: 50,
    marginRight: 35,
    marginLeft: 35,
    padding: 6,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 25,
    paddingLeft: 20,
    alignItems: 'center',
  },
  iconers: {
    position: 'relative',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  card: {
    marginTop: 14,
    padding: 20,
    marginHorizontal: 14,
    borderRadius: 25,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(217,217,217, .3)',
    alignItems: 'center',
  },
  content: {
    marginLeft: 30,
  },
  textTitle: {
    fontWeight: '800',
    fontSize: 16,
  },
  textContent: {
    fontWeight: '500',
    fontSize: 12,
    flexWrap: 'wrap',
  },
  icon2: {
    marginLeft: 50,
    flex: 1,
    flexDirection: 'column',
    // alignContent: 'space-between', AYAW pano ba to
  },
});
