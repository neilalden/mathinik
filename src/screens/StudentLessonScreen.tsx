import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from '../components/Icon';
import { IMAGES } from '../common/images';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS } from '../common/utils/colors';
import { Button, ButtonOutline } from '../components/Buttons';
import { ROUTES } from '../common/routes';
import { StateType } from '../services/redux/type';
import { useDispatch, useSelector } from 'react-redux';
import Gap from '../components/Gap';
import { getFileName, viewFile } from '../common/utils/utility';
import { asyncThunkFullfiled } from '../common/validation';
import { deleteTodo, deleteTodoType } from '../services/redux/slice/todo';


const StudentLessonScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch()
  const Lecture = useSelector((state: StateType) => state.Activity.currentLecture);
  const Class = useSelector((state: StateType) => state.Class.classDetails);
  const User = useSelector((state: StateType) => state.User.user)
  const [answer, setAnswer] = useState("")
  const handleOnPress = () => {
    navigation.goBack();
  };
  const handleBack = () => {
    navigation.goBack();
  };
  const handleDeleteLecture = () => {
    if (!User?.isTeacher) return;

    Alert.alert('Delete', `Delete ${Lecture?.title}?`, [
      {
        text: 'yes',
        onPress: () => {
          (async () => {
            const data: deleteTodoType = {
              classId: Class?.classId,
              todoId: Lecture?.id,
              todoType: "lectures"
            }
            const dispatched = await dispatch(deleteTodo(data))
            if (asyncThunkFullfiled(dispatched)) {
              navigation.navigate(ROUTES.HOME_SCREEN)
            }
          })();
        },
        style: 'cancel',
      },
      { text: 'No', onPress: () => false },
    ]);
  }



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
            }}>{Lecture?.title}</Text>
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
            marginVertical: 40,
            marginHorizontal: 20,
          }}>
          <Text style={{ color: '#000', fontSize: 20, fontWeight: 'bold' }}>
            {Lecture?.instructions}
          </Text>
        </View>
      </View>

      {
        Lecture?.filesRef && Lecture?.filesRef.map((fileRef: string, i) => {
          return (
            <TouchableOpacity key={i} style={styles.fileCard} onPress={() => viewFile(fileRef)}>
              <Text style={styles.fileName}>{getFileName(fileRef)}</Text>
            </TouchableOpacity>
          )
        })}

      {User?.isTeacher ? <ButtonOutline text={"Delete Lecture"} onPress={handleDeleteLecture} containerStyle={styles.deleteButtonContainer} textStyle={styles.deleteButtonText} /> : null}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  deleteButtonContainer: {
    borderColor: COLORS.RED,
    margin: 16,
  },
  deleteButtonText: {
    color: COLORS.RED
  },
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
