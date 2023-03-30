import {
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import Screen from '../../components/Screen';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from '../../components/Icon';
import { IMAGES } from '../../common/images';
import CheckBox from '@react-native-community/checkbox';
import { Button } from '../../components/Buttons';
import { COLORS } from '../../common/utils/colors';
import { ROUTES } from '../../common/routes';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { StateType } from '../../services/redux/type';
import { QuestionType, QuizType, setStateBoolean, setStateString } from '../../common/types';
import { addQuiz, setQuizQuestions } from '../../services/redux/slice/quiz';
import { setStateEmptyArray, setStateEmptyString } from '../../common/utils/utility';
import { isValid } from '../../common/validation';
import AwesomeAlert from 'react-native-awesome-alerts';
import { asyncThunkFullfiled } from "../../common/validation"
export type AddQuestionScreenParams = {
  route: {
    params: {
      quizId: QuizType["id"]
    }
  }
  navigation: any,
}
const AddQuestionScreen = ({ route, navigation }: AddQuestionScreenParams) => {
  const [questions, setQuestions] = useState<QuizType["questions"]>([])
  const [question, setQuestion] = useState<QuestionType["question"]>("")
  const [answer, setAnswer] = useState<QuestionType["answer"]>("")
  const [answerType, setAnswerType] = useState<QuestionType["answerType"]>("write")
  const [options, setOptions] = useState<QuestionType["options"]>([])
  const [option, setOption] = useState<string>("")
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")
  const dispatch = useDispatch<any>();
  const quiz = useSelector((state: StateType) => state.Quiz)
  const { quizId } = route.params
  const handleAddQuestion = () => {
    if (answerType === "write") {
      if (!isValid(question, answer)) {
        setShowAlert(true);
        setAlertMessage("All fields are required");
        return
      }
    } else {
      if (!isValid(question, answer, options)) {
        setShowAlert(true);
        setAlertMessage("All fields are required");
        return
      }
    }
    const data: QuestionType = {
      question: question,
      answer: answer,
      answerType: answerType,
      options: options,
    }
    setQuestions(prev => [...prev, data]);
    setStateEmptyString(setQuestion, setAnswer, setOption)
    setStateEmptyArray(setOptions)
  }
  const handleOnPress = async () => {
    for (let i = 0; i < quiz.quizes.length; i++) {
      const item = quiz.quizes[i];
      if (item.id === quizId) {
        const data: QuizType = {
          ...item,
          questions: questions
        }
        const dispatched = await dispatch(addQuiz(data))
        if (asyncThunkFullfiled(dispatched)) {
          ToastAndroid.showWithGravity(
            'Quiz posted!',
            ToastAndroid.LONG,
            ToastAndroid.CENTER,
          );
          navigation.navigate(ROUTES.HOME_SCREEN)
        } else {
          setShowAlert(true);
          setAlertMessage("Unable to post");
        }
      }
    }
  };
  const handleAddOption = () => {
    setOptions(prev => [...prev, option])
    setStateEmptyString(setOption)
  }
  const handleBack = () => {
    navigation.goBack();
  };
  const removeQuizItem = (index) => {
    const tempQuestions = [...questions]
    tempQuestions.splice(index, 1);
    setQuestions(tempQuestions)
  }
  const removeOptionItem = (index) => {
    const tempOptions = [...options]
    tempOptions.splice(index, 1);
    setOptions(tempOptions)
  }
  return (
    <ScrollView style={{ backgroundColor: '#E0EBEB' }}>
      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title={"Error"}
        message={alertMessage}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        cancelText="Close"
        cancelButtonColor={COLORS.RED}
        onCancelPressed={() => setShowAlert(false)}
      />
      <View
        style={{
          marginVertical: 30,
          marginHorizontal: 18,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View>
          <Icon source={IMAGES.ic_arrowBack} onPress={handleBack} size={40} />
        </View>
      </View>
      <View
        style={{
          backgroundColor: '#fff',
          marginHorizontal: 16,
          borderRadius: 16,
          paddingBottom: 20,
        }}>
        {/* TEXT INPUT VIEW  */}
        <View
          style={{
            backgroundColor: 'transparent',
            marginHorizontal: 16,
            borderWidth: 1,
            borderColor: '#00CC66',
            borderRadius: 16,
            marginBottom: 24,
            marginTop: 30,
          }}>
          <View
            style={{
              position: 'absolute',
              marginHorizontal: 10,
              marginTop: 2,
            }}>
            <Text style={{ fontWeight: 'bold', color: '#000' }}>Question</Text>
          </View>
          <View style={{ marginHorizontal: 6, paddingTop: 12 }}>
            <TextInput
              multiline={true}
              style={{ fontSize: 16, color: '#000' }}
              placeholder="Problems..."
              value={question}
              onChangeText={(text) => setQuestion(text)}
            />
          </View>
        </View>
        {/*END OF TEXT INPUT VIEW  */}
        <View style={{ marginHorizontal: 16 }}>
          <Text style={styles.title}>
            Answer Type
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#00CC66',
            alignSelf: 'center',
            marginTop: 10,
            width: '60%',

            alignItems: 'center',
            justifyContent: 'space-around',
            padding: 10,
            borderRadius: 50,
          }}>
          <TouchableOpacity
            onPress={() => setAnswerType("option")}
            style={
              answerType === "option" ? styles.optionsViewActive : styles.optionsViewInactive
            }>
            <Text
              style={
                answerType === "option" ? styles.optionTextActive : styles.optionTextInactive
              }>
              Option
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setAnswerType("write")}
            style={
              answerType === "option" ? styles.optionsViewInactive : styles.optionsViewActive
            }>
            <Text
              style={
                answerType === "option" ? styles.optionTextInactive : styles.optionTextActive
              }>
              Write
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginHorizontal: 16, marginTop: 20 }}>
          <Text
            style={{ fontSize: 26, fontWeight: '600', color: COLORS.BLACK }}>
            Correct Answer
          </Text>
        </View>

        <View style={{ marginTop: 10 }}>
          <View
            style={{
              marginHorizontal: 16,
              borderWidth: 1,
              borderColor: '#00CC66',
              borderRadius: 16,
            }}>
            <TextInput
              multiline={true}
              style={{ fontSize: 16, textAlign: 'center', color: '#000' }}
              placeholder="Write the correct answer here"
              value={answer}
              onChangeText={(text) =>
                setAnswer(text)
              }
            />
          </View>
        </View>
        {answerType === "option" ? (
          <>
            {/* CHECK BOX AND TEXTINPUT */}
            <View style={{ marginHorizontal: 16, marginTop: 28 }}>
              <Text style={styles.title}>
                Add Option
              </Text>
            </View>
            {/* CHECK BOX AND TEXTINPUT */}
            <View style={{ marginTop: 10, flexDirection: 'row' }}>
              <View
                style={{
                  marginHorizontal: 16,

                  borderWidth: 1,
                  borderColor: '#00CC66',
                  flex: 1,
                  borderRadius: 16,
                }}>
                <TextInput
                  multiline={true}
                  style={{ fontSize: 16, textAlign: 'center', color: '#000' }}
                  placeholder="Write the correct answer here"
                  value={option}
                  onChangeText={(text) => setOption(text)}
                />
              </View>
            </View>
            {/* CHECK BOX AND TEXTINPUT */}
            <Button
              text={'ADD OPTION'}
              textStyle={{ paddingHorizontal: 20, color: 'black', fontSize: 16 }}
              containerStyle={{
                marginHorizontal: 16,
                marginVertical: 20,
                backgroundColor: '#B3FFD9',
              }}
              onPress={handleAddOption}
            />
            <View style={{ marginHorizontal: 16, marginTop: 8 }}>
              <Text style={styles.title}>
                Added Option
              </Text>
              {options.length > 0 ? options.map((option, i) => {
                return (<TouchableOpacity key={i} style={styles.optionContainer} onPress={() => removeOptionItem(i)}><Text style={styles.option}>{option}</Text></TouchableOpacity>)
              }) : <Text
                style={{
                  fontSize: 12,
                  color: '#000',
                  textAlign: 'center',
                  marginTop: 10,
                }}>
                No options added yet.
              </Text>}
            </View>
          </>
        ) : null}

        <Button
          text={'ADD QUESTION'}
          gradientColor={[
            COLORS.LIGHTGREEN,
            COLORS.MIDGREEN,
            COLORS.GREENNORMAL,
          ]}
          textStyle={{ paddingHorizontal: 20, color: '#FFF', fontSize: 16 }}
          containerStyle={{ marginHorizontal: 16, marginVertical: 20 }}
          onPress={handleAddQuestion}
        />
      </View>

      <View >
        <Text style={{ marginHorizontal: 16, marginVertical: 10, fontSize: 26, fontWeight: '600', color: '#000' }}>
          Quiz Items
        </Text>
        {questions.length > 0 ? questions.map((question, i) => {
          return (
            <TouchableOpacity key={i} style={styles.questionCard} onPress={() => removeQuizItem(i)}>
              <Text style={styles.questionTitle}>{"Question: \n"}{question.question}</Text>
              <Text style={styles.questionAnswer}>{"Answer: \n"}{question.answer}</Text>
              {question.answerType === "option" ?
                <Text style={styles.questionOptionItem}>
                  {"Options: \n"}
                  {question.options.map((optionItem, i) => <Text key={i}>{optionItem}</Text>
                  )}
                </Text> : null}
            </TouchableOpacity>
          )
        }) : <Text
          style={{
            fontSize: 12,
            color: '#000',
            textAlign: 'center',
            marginTop: 10,
          }}>
          No Quiz items yet.
        </Text>}
      </View>
      <Button
        text={'POST QUIZ'}
        gradientColor={[COLORS.LIGHTGREEN, COLORS.MIDGREEN, COLORS.GREENNORMAL]}
        textStyle={{ paddingHorizontal: 20, color: '#000', fontSize: 16 }}
        containerStyle={{ marginHorizontal: 30, marginVertical: 10 }}
        onPress={handleOnPress}
      />
    </ScrollView>
  );
};

export default AddQuestionScreen;

const styles = StyleSheet.create({
  title: { fontSize: 26, fontWeight: '600', color: '#000' },
  questionCard: {
    marginHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#00CC66',
    marginTop: 8,
    paddingBottom: 16
  },
  questionTitle: { fontSize: 20, fontWeight: '600', color: '#000', backgroundColor: "#fff", marginHorizontal: 16, marginTop: 16, textAlign: "center", borderRadius: 16 },
  questionAnswer: { fontSize: 20, fontWeight: '600', color: '#000', backgroundColor: "#fff", marginHorizontal: 16, marginTop: 16, textAlign: "center", borderRadius: 16 },
  questionOptionItem: { fontSize: 20, fontWeight: '600', color: '#000', backgroundColor: "#fff", marginHorizontal: 16, marginTop: 16, textAlign: "center", borderRadius: 16 },
  optionsViewActive: {
    backgroundColor: '#00FF80',
    paddingHorizontal: 6,
    borderRadius: 50,
  },
  optionsViewInactive: {
    backgroundColor: '#00CC66',
    paddingHorizontal: 6,
    borderRadius: 50,
  },
  optionTextActive: {
    fontSize: 20,
    color: '#000',
    padding: 8,
  },
  optionTextInactive: {
    fontSize: 20,
    padding: 8,
    color: 'white',
  },
  optionContainer: {
    borderWidth: 1,
    borderColor: '#00CC66',
    borderRadius: 16,
    marginTop: 8
  },
  option: {
    fontSize: 18,
    color: '#000',
    padding: 8,
    textAlign: "center"
  },
});