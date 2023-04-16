import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, ToastAndroid, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from '../components/Icon';
import { IMAGES } from '../common/images';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS } from '../common/utils/colors';
import { Button } from '../components/Buttons';
import { SIZE } from '../common/utils/size';
import { useDispatch, useSelector } from 'react-redux';
import { StateType } from '../services/redux/type';
import Gap from '../components/Gap';
import { FirebaseCurrentUserType, QuestionType, QuizAnswer, QuizType, SubmitQuizType } from '../common/types';
import QuestionCard from '../components/QuestionCard';
import { getQuizSubmission, submitQuiz } from '../services/redux/slice/quiz';
import { asyncThunkFullfiled } from '../common/validation';
import { ROUTES } from '../common/routes';
import { isValid } from '../common/validation';
import firestore from '@react-native-firebase/firestore';

const StudentQuizScreen = (props) => {
  const route = useRoute();
  const dispatch = useDispatch<any>();
  const navigation = props.navigation;
  const Quiz = useSelector((state: StateType) => state.Quiz.currentQuiz);
  const User = useSelector((state: StateType) => state.User.user);
  const questionLength = Quiz?.questions?.length || 0;
  const width = React.useRef(1);
  const [questionIndex, setQuestionIndex] = React.useState(0);
  const [quizAnswers, setQuizAnswers] = React.useState<Array<QuizAnswer>>([]);
  const [answer, setAnswer] = React.useState("");
  useEffect(() => {
    (async () => {
      const dispatched = await dispatch(getQuizSubmission({
        studentId: User?.id,
        classId: User?.classId,
        quizId: Quiz?.id
      }));
      if (asyncThunkFullfiled(dispatched)) {
      }
    })();
  }, [])

  useEffect(() => {
    (async () => {
      if (!questionLength || !User || !Quiz) return
      if (questionIndex === questionLength && !Quiz.answers) {
        const score = quizAnswers.reduce((total, item) => String(item.answer).toLowerCase() == String(item.correctAnswer).toLowerCase() ? total + (1 * Quiz.pointsPerRight) : total + (1 * Quiz?.pointsPerWrong || 0), 0)
        const data: SubmitQuizType = {
          payload: {
            answers: quizAnswers,
            score: score,
            createdAt: new Date(),
            id: User.id,
            name: User.fullname
          },
          classId: User.classId || User.id,
          quizId: Quiz.id
        }
        const dispatched = await dispatch(submitQuiz(data))
        if (asyncThunkFullfiled(dispatched)) {
          ToastAndroid.showWithGravity(
            'Quiz answered!',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
          );
        }
      }
    })();
  }, [questionIndex])
  const handleBack = () => {
    navigation.goBack();
  };
  const handlePress = async () => {
    if (!User || !Quiz) return;
    if (Quiz.answers) {
      width.current = width.current + 1;
      setQuestionIndex(prev => prev + 1,)
      if (questionIndex === questionLength - 1) {
        navigation.navigate(ROUTES.HOME_SCREEN)
      }
      return;
    }

    if (!isValid(answer)) {
      ToastAndroid.showWithGravity(
        'enter your answer',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
      );
      return
    }
    const data = {
      question: Quiz.questions[questionIndex].question,
      correctAnswer: Quiz.questions[questionIndex].answer,
      answer: answer
    }
    setQuizAnswers(prev => [...prev, data])
    width.current = width.current + 1;
    setQuestionIndex(prev => prev + 1,)
  }
  if (!Quiz) {
    navigation.navigate(ROUTES.HOME_SCREEN);
    return <></>
  }

  return (
    <ScrollView style={{ backgroundColor: '#E0EBEB', paddingHorizontal: 16 }}>
      <View style={styles.header}>
        <Icon source={IMAGES.ic_arrowBack} onPress={handleBack} size={30} />
        <Text style={styles.title}>{Quiz.title}</Text>
        <Gap width={30} />
      </View>
      <Text style={styles.pointText}>{Quiz.answers ? `${Quiz.score} / ${(Quiz.pointsPerRight * questionLength)}` : `${(Quiz.pointsPerRight * questionLength)} Point Quiz`}</Text>
      <View
        style={styles.barContainer}>
        <View
          style={[styles.bar, { width: `${(width.current / questionLength) * 100}%` }]} />
      </View>
      {Quiz.questions && Quiz.questions[questionIndex] || Quiz.answers ? <>
        <QuestionCard question={
          Quiz.answers ? Quiz.answers[questionIndex] : Quiz.questions[questionIndex]
        } answer={answer} setAnswer={setAnswer} />
        <Button
          text={questionIndex === questionLength - 1 ? Quiz.answers ? 'Done' : 'Submit' : 'Next'}
          gradientColor={[COLORS.LIGHTGREEN, COLORS.MIDGREEN, COLORS.GREENNORMAL]}
          textStyle={{ textTransform: 'uppercase' }}
          containerStyle={{ marginVertical: 20 }}
          onPress={handlePress}
        />
      </> : null}
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    paddingVertical: 10,
    justifyContent: "space-between"
  },
  title: { color: '#000', fontSize: 24, },
  pointText: { color: '#00CC66', fontSize: 20, fontWeight: 'bold', textAlign: "center" },
  barContainer: {
    width: SIZE.p100,
    height: SIZE.x6,
    marginBottom: 16,
    backgroundColor: 'grey',
    borderRadius: 10
  },
  bar: {
    width: SIZE.p60,
    height: SIZE.x6,
    marginTop: 20,
    backgroundColor: '#00CC66',
    bottom: 20,
    borderRadius: 10
  },
})
export default StudentQuizScreen;
