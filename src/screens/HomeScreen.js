/* eslint-disable prettier/prettier */
import {Image, StyleSheet, Text, View, TextInput} from 'react-native';
import React from 'react';
import Screen from '../components/Screen';
import {Button} from '../components/Buttons';
import {ScrollView} from 'react-native-gesture-handler';
import {IMAGES} from '../common/images';
import BottomNav from '../components/BottomNav';
import {useRoute} from '@react-navigation/native';
import {COLORS} from '../common/utils/colors';
import Header from '../components/Header';
const HomeScreen = ({navigation}) => {
  const route = useRoute();
  const handleBack = () => {
    navigation.goBack();
  };
  return (
    <React.Fragment>
      <Screen>
        <Header text="Home" canGoBack={false} />
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

        <Text style={styles.textLabel}>Plant Collection</Text>

        <View style={styles.collection}>
          <View style={styles.imgContainer}>
            <Image
              source={IMAGES.ic_app_round}
              style={styles.icon}
              width={60}
              height={60}
            />
          </View>
          <View style={styles.imgContainer}>
            <Image
              source={IMAGES.ic_app_round}
              style={styles.icon}
              width={60}
              height={60}
            />
          </View>
          <View style={styles.imgContainer}>
            <Image
              source={IMAGES.ic_app_round}
              style={styles.icon}
              width={60}
              height={60}
            />
          </View>
        </View>

        <View style={styles.collection}>
          <View style={styles.imgContainerers}>
            <Image
              source={IMAGES.ic_app_round}
              style={styles.icon}
              width={60}
              height={60}
            />
          </View>
          <View style={styles.imgContainerers}>
            <Image
              source={IMAGES.ic_app_round}
              style={styles.icon}
              width={60}
              height={60}
            />
          </View>
          <View style={styles.imgContainerers}>
            <Image
              source={IMAGES.ic_app_round}
              style={styles.icon}
              width={60}
              height={60}
            />
          </View>
        </View>

        <View style={styles.collection}>
          <View style={styles.imgContainerist}>
            <Image
              source={IMAGES.ic_app_round}
              style={styles.icon}
              width={60}
              height={60}
            />
          </View>
          <View style={styles.imgContainerist}>
            <Image
              source={IMAGES.ic_app_round}
              style={styles.icon}
              width={60}
              height={60}
            />
          </View>
          <View style={styles.imgContainerist}>
            <Image
              source={IMAGES.ic_app_round}
              style={styles.icon}
              width={60}
              height={60}
            />
          </View>
        </View>

        <Text style={styles.textLabel}>Useful Tips</Text>
        <View style={styles.div} />
        <Text style={styles.textLabel}>Houseplant Care</Text>
        <View style={styles.div} />
        <Text style={styles.textLabel}>Trends</Text>
        <View style={styles.div} />
      </Screen>
      <BottomNav routeName={route.name} navigation={navigation} />
    </React.Fragment>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
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
  textLabel: {
    marginTop: 20,
    marginLeft: 20,
  },
  collection: {
    flex: 1,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 15,
  },
  icon: {},
  imgContainer: {
    borderRadius: 50,
    backgroundColor: '#313131',
    padding: 10,
  },
  imgContainerers: {
    borderRadius: 50,
    backgroundColor: COLORS.DARKGREEN,
    padding: 10,
  },
  imgContainerist: {
    borderRadius: 50,
    backgroundColor: 'rgba(217,217,217,.30)',
    padding: 10,
  },
  div: {
    marginVertical: 20,
    padding: 40,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: 'white',
    borderTopRightRadius: 25,
  },
});
