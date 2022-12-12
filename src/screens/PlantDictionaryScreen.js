/* eslint-disable prettier/prettier */
import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import Screen from '../components/Screen';
import {Button} from '../components/Buttons';
import BottomNav from '../components/BottomNav';
import {useRoute} from '@react-navigation/native';
import {IMAGES} from '../common/images';
import Header from '../components/Header';

const PlantDictionaryScreen = ({navigation}) => {
  const route = useRoute();
  const handleBack = () => {
    navigation.goBack();
  };
  return (
    <>
      <Screen>
        <Header text="Plant Dictionary" canGoBack={false} />

        {/* SEARCH BAR */}
        <View>
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
        </View>
      </Screen>
      <BottomNav routeName={route.name} navigation={navigation} />
    </>
  );
};

export default PlantDictionaryScreen;

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
});
