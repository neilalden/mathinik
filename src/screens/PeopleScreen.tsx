import { StyleSheet, Text, View, TouchableOpacity, TextInput, ToastAndroid, Alert } from 'react-native';
import React, { createRef, useRef, useState } from 'react';
import Screen from '../components/Screen';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from '../components/Icon';
import { IMAGES } from '../common/images';
import { Button, ButtonOutline } from '../components/Buttons';
import { COLORS } from '../common/utils/colors';
import { ROUTES } from '../common/routes';
import { ScrollView } from 'react-native';
import BottomNav from '../components/BottomNav';
import { useDispatch, useSelector } from 'react-redux';
import { StateType } from '../services/redux/type';
import RBSheet from "react-native-raw-bottom-sheet";
import { addStudent, removeStudent, removeStudentPayloadType } from '../services/redux/slice/class';
import { asyncThunkFailed, asyncThunkFullfiled, isValid } from '../common/validation';
import Gap from '../components/Gap';
import { StudentAccountType } from '../common/types';

const PeopleScreen = (props) => {
  const route = useRoute();
  const navigation = props.navigation;
  const refRBSheet = useRef();
  const dispatch = useDispatch()
  const classDetails = useSelector((state: StateType) => state.Class.classDetails);
  const user = useSelector((state: StateType) => state.User.user)
  const [studentId, setStudentId] = useState("")

  const handleOpenBottomSheet = () => {
    if (user?.isTeacher) {
      // @ts-ignore
      refRBSheet.current.open();
    }
  }
  const handleDeleteStudent = (student: StudentAccountType) => {
    if (!user?.isTeacher) return;
    Alert.alert(`Remove student`, `Are you sure you want to remove ${student.fullname} from your class?`, [
      {
        text: 'yes',
        onPress: async () => {
          const temp = [...classDetails?.students].filter((_) => _.id !== student.id);

          const data: removeStudentPayloadType = {
            students: temp,
            studentId: student.id
          }
          // @ts-ignore
          const dispatched = await dispatch(removeStudent(data));
          if (asyncThunkFullfiled(dispatched)) {

          }
        },
        style: 'cancel',
      },
      { text: 'No', onPress: () => false },
    ]);
  }
  if (!classDetails) return <></>
  return (
    <>
      <ScrollView style={{ backgroundColor: '#E0EBEB' }}>
        <View
          style={styles.container}>
          <View
            style={{
              paddingTop: 20,
              paddingLeft: 10,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: "center"
            }}>
            <Text
              style={styles.title}>
              Teacher
            </Text>
          </View>
          <View
            style={styles.textContainer}>

            <View style={{ borderRadius: 100 }}>
              <Icon
                imageStyle={{
                  borderRadius: 100,
                  backgroundColor: 'gray',
                }}
                source={{ uri: classDetails.teacher.photoURL }}
                size={30}
              />
            </View>

            <Gap width={10} />
            <Text
              style={styles.text}>
              {classDetails.teacher.fullname}
            </Text>
          </View>
          {/* STUDENT CARDS */}

          <View
            style={{
              paddingLeft: 40,
              height: 60,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: "center"
            }}>
            <Text
              style={styles.title}>
              Students
            </Text>
            {
              user?.isTeacher ?
                <TouchableOpacity style={{ paddingHorizontal: 10, paddingVertical: 30, }} onPress={handleOpenBottomSheet}>
                  <Icon source={IMAGES.ic_add} size={30} />
                </TouchableOpacity> : <Gap height={90} />
            }
          </View>
          {/* STUDENT CARDS */}
          {classDetails?.students.map((student, _) => {
            return (
              <TouchableOpacity
                disabled={!user?.isTeacher}
                key={_}
                style={styles.textContainer}
                onPress={() => handleDeleteStudent(student)}
              >
                <View style={{ borderRadius: 100 }}>
                  <Icon
                    imageStyle={{
                      borderRadius: 100,
                      backgroundColor: 'gray',
                    }}
                    source={{ uri: student.photoURL }}
                    size={30}
                  />
                </View>
                <Gap width={10} />
                <Text
                  style={styles.text}>
                  {student.fullname}
                </Text>
              </TouchableOpacity>
            )
          })}
        </View>
        <RBSheet
          ref={refRBSheet}
          closeOnDragDown={true}
          closeOnPressMask={false}
          customStyles={{
            wrapper: {
              backgroundColor: "rgba(0,0,0, .50)"
            },
            draggableIcon: {
              backgroundColor: "#000"
            },
            container: styles.sheetContainer
          }}
        >
          <View style={styles.sheetContainer}>
            <View
              style={{
                backgroundColor: 'transparent',
                marginHorizontal: 20,
                borderWidth: 1,
                borderColor: '#00CC66',
                borderRadius: 16,
                marginBottom: 10,
                marginTop: 10,
              }}>
              <View
                style={{
                  position: 'absolute',
                  marginLeft: 10,
                  marginTop: 2,
                }}>
                <Text style={{ fontWeight: 'bold', color: COLORS.BLACK }}>
                  Student ID
                </Text>
              </View>
              <View style={{ marginLeft: 6, paddingTop: 10 }}>
                <TextInput keyboardType="number-pad" style={{ fontSize: 16 }} value={studentId} onChangeText={(text) => { setStudentId(text) }} />
              </View>
            </View>
            <Button text='Add'
              gradientColor={[COLORS.LIGHTGREEN, COLORS.MIDGREEN, COLORS.GREENNORMAL]}
              textStyle={{
                paddingHorizontal: 20,
                textTransform: 'uppercase',
                color: COLORS.BLACK,
              }}
              containerStyle={{
                marginHorizontal: 20,
                marginVertical: 10,
              }}
              onPress={async () => {
                if (!isValid(studentId)) return;
                let isInClass = false;
                const student = [...classDetails.students].find((student) => student.id === studentId);
                if (student) {
                  alert(`${student.fullname} is already in your class`)
                  return;
                }
                const dispatched = await dispatch(addStudent({
                  classId: classDetails.classId,
                  studentId: studentId
                }));
                if (asyncThunkFullfiled(dispatched)) {
                  setStudentId("")
                  refRBSheet.current.close();
                } else if (asyncThunkFailed(dispatched)) {
                  setStudentId("")
                  refRBSheet.current.close();
                  ToastAndroid.showWithGravity(
                    'Failed to add student',
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                  );
                }
              }} />
          </View>
        </RBSheet>
      </ScrollView>
      <BottomNav routeName={route.name} navigation={navigation} />
    </>
  );
};

export default PeopleScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 30,
    borderRadius: 16,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    textTransform: 'uppercase',
    color: COLORS.BLACK,
  },
  textContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    width: '90%',
    borderRadius: 6,
    paddingTop: 10,
  },
  text: { fontSize: 20, fontWeight: '500', color: COLORS.BLACK, },
  sheetContainer: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  }
});
