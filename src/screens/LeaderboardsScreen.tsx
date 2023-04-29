import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import Screen from '../components/Screen';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from '../components/Icon';
import { IMAGES } from '../common/images';
import { COLORS } from '../common/utils/colors';
import { Button } from '../components/Buttons';
import { ROUTES } from '../common/routes';
import LinearGradient from 'react-native-linear-gradient';
import BottomNav from '../components/BottomNav';
import { useDispatch, useSelector } from 'react-redux';
import { StateType } from '../services/redux/type';
import { sortArrOfObj, sortArrayOfObjects, truncate } from '../common/utils/utility';
import { getSubmissions } from '../services/redux/slice/todo';
import { setRanking } from '../services/redux/slice/class';
import Gap from '../components/Gap';
const LeaderboardsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch()
  const User = useSelector((state: StateType) => state.User.user)
  const classDetails = useSelector((state: StateType) => state.Class.classDetails)
  const ranking = useSelector((state: StateType) => state.Class.ranking)
  const submissions = useSelector((state: StateType) => state.Todo.submissions);
  const [arr, setArr] = useState([])
  const taskcompleted = 90;

  useEffect(() => {
    if (!ranking) {
      (async () => {
        const dispatched = await dispatch(getSubmissions({
          todos: todosState,
          students: studentsState,
          classId: classId,
        }));
        if (submissions) {
          const Students = {};
          const tempStudents = {}
          submissions.map(_ => {
            Students[_.id] = []
            tempStudents[_.id] = {}
          })
          submissions.map(_ => {
            Students[_.id].push(_.score ?? 0)
            tempStudents[_.id][_.todoId] = _.score;
          });
          const dispatched = await dispatch(setRanking(tempStudents))
        }
      })();
    } else {
      const temp = (classDetails?.students.map(student => {
        if (ranking[student.id]) {
          const keys = Object.keys(ranking[student.id]);
          let score = 0;
          for (const key of keys) {
            score += (ranking[student.id][key])
          }
          score = score
          return {
            score: score,
            ...student,
          }
        }
      }))
      setArr(sortArrayOfObjects(temp, "asc", "score"))
    }
  }, [submissions, ranking, classDetails])
  if (!User) return <></>
  return (
    <>
      <ScrollView style={{ backgroundColor: '#E0EBEB' }}>
        {
          !User.isTeacher ? <LinearGradient
            colors={[COLORS.LIGHTPINK, COLORS.MIDPINK, COLORS.PINKNORMAL]}
            style={{
              flexDirection: 'row',
              marginHorizontal: 16,
              marginTop: 30,
              alignItems: 'center',
              padding: 20,
              borderRadius: 26,
            }}>
            <View style={{ flex: 2 }}>
              <Text
                style={{
                  fontSize: 24,
                }}>{`Your Total Points Is ${taskcompleted}!`}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Icon source={IMAGES.ic_catStanding} size={120} />
            </View>
          </LinearGradient> : null
        }
        <View
          style={{
            backgroundColor: '#fff',
            marginHorizontal: 16,
            marginTop: 30,
            borderRadius: 16,
          }}>
          <Text
            style={{
              fontSize: 32,
              textAlign: 'center',
              marginTop: 44,
              fontWeight: '900',
              color: '#000',
            }}>
            Congratulations!
          </Text>
          {arr.length > 0 ?
            <>
              <View style={{ alignSelf: 'center', marginTop: 38, }}>
                <Icon imageStyle={{ borderRadius: 130 / 2 }} source={{ uri: arr[0]?.photoURL }} size={130} />
              </View>
              <View style={{ alignItems: 'center', marginTop: 30, marginBottom: 40 }}>
                <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#000' }}>
                  {arr[0]?.fullname}
                </Text>
                <View style={{ alignItems: 'center', marginTop: 30 }}>
                  <Text style={{ fontSize: 24, fontWeight: '500', color: '#000' }}>
                    Points
                  </Text>
                  <Text style={{ fontSize: 24, textAlign: 'center', color: '#000' }}>
                    {arr[0]?.score}
                  </Text>
                </View>
              </View>
            </>
            : null}
          {/* STUDENT CARDS */}
          {
            arr && arr.map((_, i) => {
              if (i === 0) return null
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    alignSelf: 'center',
                    alignItems: 'center',
                    width: '90%',
                    marginBottom: 10,
                  }}>

                  <Text style={{ fontSize: 20, fontWeight: '500', color: '#000', width: 30 }}>
                    {_?.score}
                  </Text>
                  <View style={{ borderRadius: 100 }}>
                    <Icon
                      imageStyle={{
                        borderRadius: 100,
                        backgroundColor: 'gray',
                      }}
                      source={{ uri: _?.photoURL }}
                      size={30}
                    />
                  </View>
                  <Gap width={10} />

                  <Text style={{ fontSize: 20, fontWeight: '500', color: '#000' }}>
                    {truncate(String(_?.fullname))}
                  </Text>
                </View>
              )
            })
          }

        </View>
      </ScrollView>
      <BottomNav routeName={route.name} navigation={navigation} />
    </>
  );
};

export default LeaderboardsScreen;

const styles = StyleSheet.create({});
