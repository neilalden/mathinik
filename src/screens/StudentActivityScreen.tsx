import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, ToastAndroid } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from '../components/Icon';
import { IMAGES } from '../common/images';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS } from '../common/utils/colors';
import { Button } from '../components/Buttons';
import { ROUTES } from '../common/routes';
import { StateType } from '../services/redux/type';
import { useDispatch, useSelector } from 'react-redux';
import { getFileName, viewFile } from '../common/utils/utility';
import { asyncThunkFullfiled, isValid } from '../common/validation';
import { getActivitySubmission, gradeStudentActivity, submitActivity } from '../services/redux/slice/activity';
import { SubmitActivityGradeType, SubmitActivityType } from '../common/types';


const StudentLessonScreen = (props) => {
  const route = useRoute();
  const navigation = props.navigation
  const dispatch = useDispatch()
  const User = useSelector((state: StateType) => state.User.user);
  const Activity = useSelector((state: StateType) => state.Activity.currentActivity);
  const [answer, setAnswer] = useState("");
  const [grade, setGrade] = useState("");

  useEffect(() => {
    (async () => {
      const dispatched = await dispatch(getActivitySubmission({
        studentId: User?.id,
        classId: User?.classId,
        activityId: Activity?.id
      }));
    })();
  }, [])

  const handleOnPress = async () => {
    if (!User || !Activity) return;
    if (!isValid(answer)) {
      ToastAndroid.showWithGravity(
        'Enter your answer',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
      );
      return;
    }
    const data: SubmitActivityType = {
      payload: {
        answer,
        createdAt: new Date(),
        id: User.id,
        name: User.fullname,
        photoURL: User.photoURL,
        score: null
      },
      classId: String(User.classId),
      activityId: Activity.id
    }
    setAnswer("")
    const dispatched = await dispatch(submitActivity(data))
    if (asyncThunkFullfiled(dispatched)) {
      ToastAndroid.showWithGravity(
        'Activity answered!',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
      );
      navigation.navigate(ROUTES.HOME_SCREEN)
    }
  };

  const handleEnterGrade = async () => {
    const valid = isValid(Number(grade))
    if (!isValid(valid)) {
      ToastAndroid.showWithGravity(
        'Enter proper grade',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
      );
      return;
    }
    if (Activity.points && Number(grade) > Activity.points) {
      ToastAndroid.showWithGravity(
        'Enter proper grade',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
      );
      return;
    }
    const data: SubmitActivityGradeType = {
      score: Number(grade),
      classId: String(User.classId),
      studentId: Activity?.studentId,
      activityId: Activity.id
    }
    const dispatched = await dispatch(gradeStudentActivity(data))
    if (asyncThunkFullfiled(dispatched)) {
      console.log(dispatched)
      navigation.goBack();
    }
  }
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

      {Activity?.score ? <Text style={{ color: '#000', fontSize: 20, fontWeight: 'bold', textAlign: "center" }}>{`${Activity.score}/${Activity.points}`}</Text> : null}
      <View
        style={Activity?.answer ? styles.answeredCard : styles.instructionsCard}>
        <View
          style={styles.instructionsContainer}>
          <Text style={styles.textInputtitle}>
            {User?.isTeacher ? `${Activity.name}'s answer` : "Your answer"}
          </Text>
        </View>
        <View style={{ marginLeft: 6, paddingTop: 12 }}>
          <TextInput multiline={true} style={{ fontSize: 16 }} value={Activity.answer || answer} onChangeText={(text) => setAnswer(text)} />
        </View>
      </View>
      {!Activity.answer ?
        <Button
          text={'Submit'}
          gradientColor={[COLORS.LIGHTGREEN, COLORS.MIDGREEN, COLORS.GREENNORMAL]}
          textStyle={{ paddingHorizontal: 20 }}
          containerStyle={{ marginHorizontal: 16, marginVertical: 10 }}
          onPress={handleOnPress}
        /> : null}
      {User?.isTeacher ?
        <>
          <View
            style={styles.gradeCard}>
            <View
              style={styles.instructionsContainer}>
              <Text style={styles.textInputtitle}>
                Grade student {`(upto ${Activity.points} points)`}
              </Text>
            </View>
            <View style={{ marginLeft: 6, paddingTop: 12 }}>
              <TextInput style={{ fontSize: 16 }} value={grade} onChangeText={(text) => setGrade(text)} />
            </View>
          </View>
          <Button
            text={'Submit'}
            gradientColor={[COLORS.LIGHTGREEN, COLORS.MIDGREEN, COLORS.GREENNORMAL]}
            textStyle={{ paddingHorizontal: 20 }}
            containerStyle={{ marginHorizontal: 16, }}
            onPress={handleEnterGrade}
          />
        </>

        : null}
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
    marginBottom: 16,
    marginTop: 30,
    height: 100
  },
  gradeCard: {
    backgroundColor: 'white',
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: '#00CC66',
    borderRadius: 16,
    marginBottom: 16,
    height: 60
  },
  answeredCard: {
    backgroundColor: 'white',
    marginHorizontal: 16,
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
