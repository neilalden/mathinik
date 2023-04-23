import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import Screen from '../components/Screen';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Table, TableWrapper, Row, Rows, Col, Cell } from 'react-native-table-component';

import BottomNav from '../components/BottomNav';
import { COLORS } from '../common/utils/colors';
import { useDispatch, useSelector } from 'react-redux';
import { StateType } from '../services/redux/type';
import { StudentAccountType, TodoType } from '../common/types';
import { asyncThunkFullfiled, customTypeOf } from '../common/validation';
import { getTotalPoints } from '../common/utils/utility';
import { getSubmissions } from '../services/redux/slice/todo';
import { setRanking } from '../services/redux/slice/class';
const GradesScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch()
  const classId = useSelector((state: StateType) => state.Class.classDetails?.classId);
  const studentsState = useSelector((state: StateType) => state.Class.classDetails?.students);
  const todosState = useSelector((state: StateType) => state.Todo.todos);
  const submissions = useSelector((state: StateType) => state.Todo.submissions);
  const [totalPoints, setTotalPoints] = useState(0)
  const [todos, setTodos] = useState<Array<string>>([]);
  const [students, setStudents] = useState<Array<StudentAccountType>>([])
  const [scores, setScores] = useState([]);
  const [tempscores, tempsetScores] = useState({});
  /*
    student_id:{
      quiz_id: num,
      avg: num
    }
  */
  useEffect(() => {
    (async () => {
      const dispatched = await dispatch(getSubmissions({
        todos: todosState,
        students: studentsState,
        classId: classId,
      }));
      if (submissions && scores.length === 0) {
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
        Object.keys(Students).map(key => {
          setScores(prev => [...prev, Students[key]])
        })
        tempsetScores(tempStudents)
        const dispatched = await dispatch(setRanking(tempStudents))
      }
      if (studentsState)
        setStudents(studentsState)
      if (todosState) {
        const titles: string[] = []
        titles.push("")
        todosState.map(_ => {
          const type = customTypeOf(_);
          if (type !== "lecture") {
            const todoPoints = getTotalPoints(_);
            setTotalPoints(prev => prev + todoPoints)
            titles.push(`${_.title}\n${todoPoints}`)
          }
        })
        setTodos(titles)
      }
    })();
  }, []);
  return (
    <>
      <Screen>
        <View style={styles.container}>
          <Table borderStyle={{ borderWidth: 1, borderRadius: 10 }}>
            <Row data={todos} style={styles.head} textStyle={styles.textTitle} />
            <TableWrapper style={styles.rowWrapper}>
              <Col data={students.map(_ => _.fullname)} style={styles.title} textStyle={styles.text} />
              <Rows data={scores} style={styles.row} textStyle={styles.text} />
            </TableWrapper>
          </Table>
        </View>
      </Screen>
      <BottomNav routeName={route.name} navigation={navigation} />
    </>
  );
};

export default GradesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: '#fff',
  },
  head: {
    height: 40,
    backgroundColor: '#f1f8ff',
    minWidth: 200,
    maxWidth: 350
  },
  columnWrapper: {
    flexDirection: 'column',
  },
  rowWrapper: {
    flexDirection: 'row',
  },
  title: {
    flex: 1,
    backgroundColor: '#f6f8fa',
    maxWidth: 109
  },
  row: {
    height: 40,
    minWidth: 200,
    maxWidth: 350
  },
  text: {
    textAlign: 'center',
    color: COLORS.BLACK,
    marginVertical: 4,
    marginHorizontal: 6
  },
  textTitle: {
    textAlign: 'center',
    color: COLORS.BLACK,
    fontWeight: "bold",
  },
});
