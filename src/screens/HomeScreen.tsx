import {
  StyleSheet, Text, Image, View, TouchableOpacity
  , ScrollView,
  Alert,
  BackHandler
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import Screen from '../components/Screen';
import { useNavigation, useRoute } from '@react-navigation/native';
import { IMAGES } from '../common/images';
import Icon from '../components/Icon';
import { Button } from '../components/Buttons';
import { COLORS } from '../common/utils/colors';
import { ROUTES } from '../common/routes';
import LinearGradient from 'react-native-linear-gradient';
import BottomNav from '../components/BottomNav';
import { getPeriodOfDay } from '../common/utils/time';
import { useDispatch, useSelector } from 'react-redux';
import { StateType } from '../services/redux/type';
import { firebaseCurrentUser, signOut } from '../services/auth/googleSignIn';
import { deleteTodo, deleteTodoType, getTodos } from '../services/redux/slice/todo';
import { getTodoColor, getTotalPoints } from '../common/utils/utility';
import { ActivitySubmission, ActivityType, FirebaseCurrentUserType, LectureType, QuizType, TodoType } from '../common/types';
import firestore from '@react-native-firebase/firestore';
import { asyncThunkFullfiled, customTypeOf, isActivity, isLecture, isQuiz, isValid } from '../common/validation';
import { getQuizSubmission, getQuizSubmissions, setCurrentQuiz } from "../services/redux/slice/quiz"
import { getActivitySubmissions, setCurrentActivity, setCurrentLecture } from "../services/redux/slice/activity"
import { getClassDetails } from '../services/redux/slice/class';
import auth from "@react-native-firebase/auth";
import { fetchUser } from '../services/redux/slice/user';
import RBSheet from 'react-native-raw-bottom-sheet';
import Gap from '../components/Gap';

const HomeScreen = (props) => {
  // to get current route name
  const route = useRoute();
  // to navigate pages
  const taskcompleted = 80;
  const refRBSheet = useRef();
  const navigation = useNavigation();
  const dispatch = useDispatch<any>()
  const user = useSelector((state: StateType) => state.User.user)
  const submissions = useSelector((state: StateType) => state.Todo.submissions);
  const todos = useSelector((state: StateType) => state.Todo.todos)
  const displayName = String(user?.fullname).split(" ").slice(0, 3).join(" ");
  const classDetails = useSelector((state: StateType) => state.Class?.classDetails);
  const [hasAnswered, setHasAnswered] = useState(0);
  const [activityAnswers, setActivityAnswers] = useState<Array<ActivitySubmission & ActivityType>>([])
  const [selectedActivity, setSelectedActivity] = useState<ActivitySubmission & ActivityType>()

  const [currTodo, setCurrTodo] = useState(undefined);
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(async (firebaseCurrentUser: FirebaseCurrentUserType) => {
      if (!firebaseCurrentUser) navigation.navigate(ROUTES.LANDING_SCREEN)
      if (firebaseCurrentUser?.displayName) {
        const dispatched = await dispatch(fetchUser(firebaseCurrentUser.displayName))
        // is firebase authenticated and registered
        if (asyncThunkFullfiled(dispatched) && isValid(firebaseCurrentUser) && isValid(user)) navigation.navigate(ROUTES.HOME_SCREEN)
        // is firebase authenticated but not registered
        if (asyncThunkFullfiled(dispatched) && isValid(firebaseCurrentUser) && isValid(user) === false) navigation.navigate(ROUTES.REGISTER_SCREEN)
      }
    });
    return subscriber; // unsubscribe on unmount
  }, []);
  useEffect(() => {
    if (submissions && hasAnswered !== 0) {
      let num = 0
      submissions.map(_ => {
        num += _.score > 0 ? 1 : 0
      });
      setHasAnswered((num / classDetails?.students.length) * 100)
    }
  }, [])
  useEffect(() => {
    const subscriber = firestore()
      .collection(`Classes/${classDetails?.classId}/quizes`)
      .onSnapshot(async (documentSnapshot) => {
        const dispatched = await dispatch(getTodos(classDetails?.classId))
      });
    return () => subscriber();
  }, [classDetails?.classId]);

  useEffect(() => {
    const subscriber = firestore()
      .collection(`Classes/${classDetails?.classId}/activities`)
      .onSnapshot(async (documentSnapshot) => {
        const dispatched = await dispatch(getTodos(classDetails?.classId))
      });
    return () => subscriber();
  }, [classDetails?.classId]);

  useEffect(() => {
    const subscriber = firestore()
      .collection(`Classes/${classDetails?.classId}/lectures`)
      .onSnapshot(async (documentSnapshot) => {
        const dispatched = await dispatch(getTodos(classDetails?.classId))
      });
    return () => subscriber();
  }, [classDetails?.classId]);

  useEffect(() => {
    (async () => {
      try {
        if (!user?.classId || classDetails && !Object.keys(classDetails)) return;
        const dispatched = await dispatch(getClassDetails(user?.classId))
      } catch (error) {
        console.error(error)
      }
    })();
  }, [user?.id]);
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        navigation.navigate(ROUTES.HOME_SCREEN)
        return true
      },
    );

    return () => backHandler.remove();
  }, [])


  const handleOnPress = async () => {
    navigation.navigate(ROUTES.CREATE_TODO_SCREEN);
  };
  const handleOpenTodo = async (todo: TodoType) => {
    const todoType = customTypeOf(todo);
    if (todoType === "quiz") {
      const quiz: QuizType = todo
      if (user.isTeacher) {
        const x = await getQuizSubmissions({ classId: classDetails?.classId, quizId: todo.id })
        setActivityAnswers(x)
        setSelectedActivity(quiz)
        refRBSheet.current.open()
        setCurrTodo(todo)
        return;
      }

      dispatch(setCurrentQuiz(quiz))
      navigation.navigate(ROUTES.STUDENT_QUIZ_SCREEN);
    }
    else if (todoType === "activity") {
      const activity: ActivityType = todo

      if (user.isTeacher) {
        const x = await getActivitySubmissions({ classId: classDetails?.classId, activityId: todo.id })
        setActivityAnswers(x)
        setSelectedActivity(activity)
        refRBSheet.current.open()
        setCurrTodo(todo)
        return;
      }

      dispatch(setCurrentActivity(activity))
      navigation.navigate(ROUTES.STUDENT_ACTIVITY_SCREEN)
    }
    else if (todoType === "lecture") {
      const lecture: LectureType = todo

      dispatch(setCurrentLecture(lecture))
      navigation.navigate(ROUTES.STUDENT_LESSON_SCREEN)

    }
  }
  const openActivitySubmission = (index: number) => {
    const activity: ActivitySubmission = activityAnswers[index];
    refRBSheet.current.close()
    if (!!activity.answers) {
      dispatch(setCurrentQuiz({ ...selectedActivity, studentId: activity.id, id: selectedActivity?.id }))
      navigation.navigate(ROUTES.STUDENT_QUIZ_SCREEN)
      return
    }
    dispatch(setCurrentActivity({ ...activity, ...selectedActivity, studentId: activity.id, id: selectedActivity?.id }))
    navigation.navigate(ROUTES.STUDENT_ACTIVITY_SCREEN)
  }

  const handleLogout = () => {
    Alert.alert('', 'Logout?', [
      {
        text: 'yes',
        onPress: () => signOut(),
        style: 'cancel',
      },
      { text: 'No', onPress: () => false },
    ]);
  }
  const handleDeleteTodo = () => {
    if (!currTodo) return;

    Alert.alert(`Delete ${currTodo.title}?`, 'Are you sure you want to delete this todo from your class', [
      {
        text: 'yes',
        onPress: async () => {
          const todoType = customTypeOf(currTodo) === "quiz" ? "quizes" : "activities";
          const data: deleteTodoType = {
            todoId: currTodo.id,
            todoType,
            classId: classDetails?.classId
          }
          const dispatched = await dispatch(deleteTodo(data))
          if (asyncThunkFullfiled(dispatched)) {
            refRBSheet.current.close()
          }
        },
        style: 'cancel',
      },
      { text: 'No', onPress: () => false },
    ]);
  }


  if (!user) navigation.navigate(ROUTES.LANDING_SCREEN);
  if (!classDetails) {
    return (

      <ScrollView style={{ backgroundColor: '#E0EBEB' }} >
        <View
          style={styles.headerContainer}>
          <Text
            style={styles.headerGreetText}>{`${getPeriodOfDay()}\n${displayName}`}</Text>
          <Icon
            onPress={handleLogout}
            source={{ uri: user?.photoURL }}
            size={80}
            imageStyle={styles.profilePicture}
          />
        </View>
        <Text
          style={{
            fontSize: 12,
            color: '#000',
            textAlign: 'center',
            marginTop: 10,
          }}>You aren't in any class yet</Text>
      </ScrollView>

    )
  }
  else
    return (
      <>
        <ScrollView style={{ backgroundColor: '#E0EBEB' }} >
          <View
            style={styles.headerContainer}>
            <Text
              style={styles.headerGreetText}>{`${getPeriodOfDay()}\n${displayName}`}</Text>
            <Icon
              onPress={handleLogout}
              source={{ uri: user?.photoURL }}
              size={80}
              imageStyle={styles.profilePicture}
            />
          </View>

          <LinearGradient
            colors={[COLORS.LIGHTGREEN, COLORS.MIDGREEN, COLORS.GREENNORMAL]}
            style={styles.jumbotron}>
            <View style={{ flex: 2 }}>
              <Text
                style={styles.jumbotronText}>{user.isTeacher ? `${hasAnswered}% of students has answered the latest todo` : `You have solved ${taskcompleted}% of your task!`}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Icon source={IMAGES.ic_catSleep} size={150} />
            </View>
          </LinearGradient>

          <View style={{ marginTop: 40, marginHorizontal: 16, flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000000' }}>
              TODO
            </Text>
            {user.isTeacher ? <Icon source={IMAGES.ic_add} size={30} onPress={handleOnPress} /> : null}
          </View>

          {
            todos.length > 0 ?
              [...todos].sort((a, b) => new Date(b.deadline) - new Date(a.deadline)
              ).map((todo: TodoType, i) => {
                const color = getTodoColor(todo)
                const points = getTotalPoints(todo);
                return (
                  <TouchableOpacity key={i} onPress={() => handleOpenTodo(todo)}>
                    <LinearGradient
                      colors={color}
                      style={styles.cardContainer}>
                      <View style={styles.cardTitleContainer}>
                        <Text style={styles.cardTitle1}>{todo.title}</Text>
                        {!!todo.datePosted ? <Text style={styles.cardTitle2}>{new Date(todo.deadline).toDateString()}</Text> : <Text style={styles.cardTitle2}>{points} points</Text>}
                      </View>
                      {
                        todo.topScorer ?
                          <View style={styles.cardDescImgContainer}>
                            <View style={styles.cardDescContainer}>
                              <Text style={styles.cardDesc1}>Top Scorer</Text>
                              <Text style={styles.cardDesc2}>{`${displayName}`}</Text>
                            </View>
                            <Icon
                              source={IMAGES.ic_catRead}
                              size={50}
                            />
                          </View>
                          : null
                      }
                    </LinearGradient>
                  </TouchableOpacity>)
              })
              :
              <Text
                style={{
                  fontSize: 12,
                  color: '#000',
                  textAlign: 'center',
                  marginTop: 10,
                }}>
                No options added yet.
              </Text>
          }
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
            <ScrollView style={styles.sheetContainer}>
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text>s</Text>
                <Text style={[styles.text, { margin: 20, textAlign: "center", fontWeight: "bold", paddingLeft: 20 }]}>Submissions</Text>

                <TouchableOpacity onPress={handleDeleteTodo}>
                  <Text style={{ alignSelf: "center", marginRight: 10, padding: 5, }}>🗑️</Text>
                </TouchableOpacity>
              </View>
              {activityAnswers && activityAnswers.map((student, _) => {
                return <TouchableOpacity key={_} style={styles.textContainer} onPress={() => openActivitySubmission(_)}>
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
                    {student.name}
                  </Text>
                </TouchableOpacity>
              })}
            </ScrollView>
          </RBSheet>
        </ScrollView>
        <BottomNav routeName={route.name} navigation={navigation} />
      </>
    );
};


export default HomeScreen;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    marginVertical: 30,
    marginHorizontal: 16,
    justifyContent: 'space-between',
  },
  headerGreetText: {
    fontSize: 28,
    color: '#313131',
    fontWeight: '600',
  },
  profilePicture: {
    borderRadius: 100,
    backgroundColor: '#152238',
  },
  jumbotron: {
    flexDirection: 'row',
    marginHorizontal: 16,
    alignItems: 'center',
    padding: 20,
    borderRadius: 26,
  },
  jumbotronText: {
    color: 'white',
    fontSize: 24,
  },
  cardContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 12,
    justifyContent: 'space-between',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
  },
  cardTitleContainer: { flexDirection: 'column' },
  cardTitle1: {
    color: 'white',
    fontSize: 20,
  },
  cardDescImgContainer: { flexDirection: 'row', alignItems: 'center' },
  cardDescContainer: { flexDirection: 'column', marginRight: 6 },
  cardTitle2: {
    color: 'black',
    fontSize: 20,
  }, cardDesc1: {
    color: 'white',
    fontSize: 14,
    textAlign: "right"
  }, cardDesc2: {
    color: 'black',
    fontSize: 14,
    textAlign: "right"
  },
  sheetContainer: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    height: "80%",
  },
  textContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    width: '80%',
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#00cc66",
    borderRadius: 16,
    paddingVertical: 10,
    marginBottom: 10,
  },
  text: { fontSize: 20, fontWeight: '500', color: COLORS.BLACK },
});