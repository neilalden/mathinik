import {
  StyleSheet, Text, Image, View, TouchableOpacity
  , ScrollView
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
import { firebaseCurrentUser } from '../services/auth/googleSignIn';
import { getTodos } from '../services/redux/slice/todo';
import { getTodoColor, getTotalPoints } from '../common/utils/utility';
import { ActivityType, QuizType, TodoType } from '../common/types';
import firestore from '@react-native-firebase/firestore';
import { asyncThunkFullfiled, customTypeOf, isActivity, isLecture, isQuiz } from '../common/validation';
import { setCurrentQuiz } from "../services/redux/slice/quiz"
import { setCurrentActivity } from "../services/redux/slice/activity"
import { getClassDetails } from '../services/redux/slice/class';
const HomeScreen = (props) => {
  // to get current route name
  const route = useRoute();
  // to navigate pages
  const taskcompleted = 80;
  const navigation = props.navigation;
  const dispatch = useDispatch<any>()
  const user = useSelector((state: StateType) => state.User.user)
  const submissions = useSelector((state: StateType) => state.Todo.submissions);
  const todos = useSelector((state: StateType) => state.Todo.todos)
  const displayName = String(user?.fullname).split(" ").slice(0, 2).join(" ");
  const classDetails = useSelector((state: StateType) => state.Class?.classDetails);
  const [hasAnswered, setHasAnswered] = useState(0);
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


  const handleOnPress = async () => {
    navigation.navigate(ROUTES.CREATE_TODO_SCREEN);
  };
  const handleOpenTodo = (todo: TodoType) => {
    const todoType = customTypeOf(todo);
    if (todoType === "quiz") {
      const quiz: QuizType = todo
      dispatch(setCurrentQuiz(quiz))
      navigation.navigate(ROUTES.STUDENT_QUIZ_SCREEN);
    }
    else if (todoType === "activity") {
      const activity: ActivityType = todo
      dispatch(setCurrentActivity(activity))
      navigation.navigate(ROUTES.STUDENT_ACTIVITY_SCREEN)
    }
  }


  if (!user) navigation.navigate(ROUTES.LANDING_SCREEN);
  else
    return (
      <>
        <ScrollView style={{ backgroundColor: '#E0EBEB' }} >
          <View
            style={styles.headerContainer}>
            <Text
              style={styles.headerGreetText}>{`${getPeriodOfDay()}\n${displayName}`}</Text>
            <Icon
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

          <View style={{ marginTop: 40, marginHorizontal: 30, flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000000' }}>
              TODO
            </Text>
            {user.isTeacher ? <Icon source={IMAGES.ic_add} size={30} onPress={handleOnPress} /> : null}
          </View>

          {
            todos.length > 0 ?
              todos.map((todo: TodoType, i) => {
                const color = getTodoColor(todo)
                const points = getTotalPoints(todo)
                return (
                  <TouchableOpacity key={i} onPress={() => handleOpenTodo(todo)}>
                    <LinearGradient
                      colors={color}
                      style={styles.cardContainer}>
                      <View style={styles.cardTitleContainer}>
                        <Text style={styles.cardTitle1}>{todo.title}</Text>
                        <Text style={styles.cardTitle2}>{points} points</Text>
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
        </ScrollView>
        <BottomNav routeName={route.name} navigation={navigation} />
      </>
    );
};


export default HomeScreen;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    margin: 30,
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
    marginHorizontal: 30,
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
    marginHorizontal: 30,
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
  }
});