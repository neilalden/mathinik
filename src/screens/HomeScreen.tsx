import { StyleSheet, Text, Image, View } from 'react-native';
import React, { useEffect } from 'react';
import Screen from '../components/Screen';
import { useNavigation, useRoute } from '@react-navigation/native';
import { IMAGES } from '../common/images';
import Icon from '../components/Icon';
import { Button } from '../components/Buttons';
import { COLORS } from '../common/utils/colors';
import { ROUTES } from '../common/routes';
import LinearGradient from 'react-native-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ScrollView } from 'react-native-gesture-handler';
import BottomNav from '../components/BottomNav';
import { getPeriodOfDay } from '../common/utils/time';
import { useDispatch, useSelector } from 'react-redux';
import { StateType } from '../services/redux/type';
import { firebaseCurrentUser } from '../services/auth/googleSignIn';
import { getTodos } from '../services/redux/slice/todo';
import { getTotalPoints } from '../common/utils/utility';
import { TodoType } from '../common/types';
import firestore from '@react-native-firebase/firestore';
const HomeScreen = (props) => {
  // to get current route name
  const route = useRoute();
  // to navigate pages
  const studentName = 'Neil';
  const taskcompleted = 80;
  const navigation = props.navigation;
  const dispatch = useDispatch<any>()
  const user = useSelector((state: StateType) => state.User.user)
  const todos = useSelector((state: StateType) => state.Todo.todos)
  const displayName = String(user?.fullname).split(" ").slice(0, 2).join(" ")


  useEffect(() => {
    const subscriber = firestore()
      .collection(`Classes/${user?.id}/quizes`)
      .onSnapshot(async (documentSnapshot) => {
        const dispatched = await dispatch(getTodos())
      });
    return () => subscriber();
  }, [user?.id]);

  useEffect(() => {
    const subscriber = firestore()
      .collection(`Classes/${user?.id}/activities`)
      .onSnapshot(async (documentSnapshot) => {
        const dispatched = await dispatch(getTodos())
      });
    return () => subscriber();
  }, [user?.id]);

  useEffect(() => {
    const subscriber = firestore()
      .collection(`Classes/${user?.id}/lectures`)
      .onSnapshot(async (documentSnapshot) => {
        const dispatched = await dispatch(getTodos())
      });
    return () => subscriber();
  }, [user?.id]);


  const handleOnPress = async () => {
    navigation.navigate(ROUTES.CREATE_TODO_SCREEN);
  };
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
                style={styles.jumbotronText}>{`You have solved ${taskcompleted}% of your task!`}</Text>
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
                const points = getTotalPoints(todo)
                return (
                  <TouchableOpacity key={i}>
                    <LinearGradient
                      colors={[COLORS.LIGHTBLUE, COLORS.MIDBLUE, COLORS.BLUENORMAL]}
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
                              <Text style={styles.cardDesc2}>{`${studentName}`}</Text>
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
          {/* <Button
            text={'Continue to Leaderboards'}
            gradientColor={[COLORS.GREEN100, COLORS.MIDGREEN]}
            textStyle={{ paddingHorizontal: 20 }}
            containerStyle={{ marginHorizontal: 30, marginVertical: 20 }}
            onPress={() => handleOnPress(ROUTES.LEADERBOARDS_SCREEN)}
          /> */}
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
