import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from '../components/Icon';
import { IMAGES } from '../common/images';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS } from '../common/utils/colors';
import { Button } from '../components/Buttons';
import { ROUTES } from '../common/routes';
import { StateType } from '../services/redux/type';
import { useSelector } from 'react-redux';
import Gap from '../components/Gap';
import { getFileName, viewFile } from '../common/utils/utility';


const StudentLessonScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const Activity = useSelector((state: StateType) => state.Activity.currentActivity);
  const [answer, setAnswer] = useState("")
  const handleOnPress = () => {
    navigation.goBack();
  };
  const handleBack = () => {
    navigation.goBack();
  };



  return (
    <ScrollView style={{ backgroundColor: '#E0EBEB' }}>
      <LinearGradient
        colors={[COLORS.LIGHTGREEN, COLORS.MIDGREEN, COLORS.GREENNORMAL]}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 20,
          borderRadius: 26,
          margin: 16
        }}>
        <View style={{ flex: 2 }}>
          <Text
            style={{
              color: 'white',
              fontSize: 20,
              fontWeight: "bold"
            }}>{`Kindly read the instructions and answer the problem`}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Icon source={IMAGES.ic_catRead} size={100} />
        </View>
      </LinearGradient>
      <View
        style={{
          backgroundColor: '#fff',
          marginHorizontal: 16,
          marginTop: 20,
          borderRadius: 16,
        }}>
        <View
          style={{
            marginTop: 40,
            marginHorizontal: 20,
          }}>
          <Text style={{ color: '#000', fontSize: 20, fontWeight: 'bold' }}>
            {Activity?.title}
          </Text>
        </View>
        <View style={{ marginHorizontal: 20, marginVertical: 40 }}>
          <Text style={{ color: '#000', fontSize: 16, fontWeight: 'bold' }}>
            {Activity?.instructions}
          </Text>
        </View>
      </View>

      {
        Activity?.filesRef && Activity?.filesRef.map((fileRef: string, i) => {
          return (
            <TouchableOpacity key={i} style={styles.fileCard} onPress={() => viewFile(fileRef)}>
              <Text style={styles.fileName}>{getFileName(fileRef)}</Text>
            </TouchableOpacity>
          )
        })}

      <View
        style={styles.instructionsCard}>
        <View
          style={styles.instructionsContainer}>
          <Text style={styles.textInputtitle}>
            Your answer
          </Text>
        </View>
        <View style={{ marginLeft: 6, paddingTop: 12 }}>
          <TextInput multiline={true} style={{ fontSize: 16 }} value={answer} onChangeText={(text) => setAnswer(text)} />
        </View>
      </View>
      <Button
        text={'Submit'}
        gradientColor={[COLORS.LIGHTGREEN, COLORS.MIDGREEN, COLORS.GREENNORMAL]}
        textStyle={{ paddingHorizontal: 20 }}
        containerStyle={{ marginHorizontal: 16, marginVertical: 10 }}
        onPress={handleOnPress}
      />
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  textInputtitle: { fontWeight: 'bold', color: COLORS.BLACK },
  instructionsCard: {
    backgroundColor: 'white',
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: '#00CC66',
    borderRadius: 16,
    marginBottom: 24,
    marginTop: 30,
    height: 100
  },
  instructionsContainer: {
    position: 'absolute',
    marginLeft: 10,
    marginTop: 2,
  },
  fileCard: {
    margin: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#00CC66',
  },
  fileName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    textAlign: "center",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,

  },
});

export default StudentLessonScreen;
