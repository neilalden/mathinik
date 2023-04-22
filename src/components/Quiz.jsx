import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button } from './Buttons';
import { COLORS } from '../common/utils/colors';
import { ScrollView } from 'react-native';
import { ROUTES } from '../common/routes';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { isValid } from '../common/validation';
import { useDispatch } from 'react-redux';
import { setQuiz } from '../services/redux/slice/quiz';

const Quiz = ({
  deadline,
  setDeadlineSwitch,
  deadlineSwitch,
  showTimepicker,
  showDatepicker,
  setShowAlert,
  setAlertMessage
}) => {

  const [title, setTitle] = useState("")
  const [instructions, setInstructions] = useState("")
  const [pointsPerRight, setPointsPerRight] = useState("5")
  const [pointsPerWrong, setPointsPerWrong] = useState("0")

  const navigation = useNavigation()
  const dispatch = useDispatch()

  const handleCreateQuiz = async () => {
    const valid = isValid(title, instructions, Number(pointsPerRight), Number(pointsPerWrong))
    if (!valid) {
      setShowAlert(true);
      setAlertMessage("All fields are required");
      return
    }
    try {
      const dispatched = await dispatch(setQuiz({
        title: title,
        deadline: deadline,
        closeOnDeadline: deadlineSwitch,
        instructions: instructions,
        pointsPerRight: Number(pointsPerRight),
        pointsPerWrong: Number(pointsPerWrong),
      }))
      if (dispatched) navigation.navigate(ROUTES.ADD_QUESTION_SCREEN, {
        quizId: dispatched.payload.id,
      });
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <>
      <ScrollView
        style={{
          backgroundColor: '#fff',
          marginHorizontal: 16,
          borderRadius: 16,
          paddingBottom: 20,
        }}>
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
              marginLeft: 10,
              marginTop: 2,
            }}>
            <Text style={{ fontWeight: 'bold', color: COLORS.BLACK }}>
              Quiz Title
            </Text>
          </View>
          <View style={{ marginLeft: 6, paddingTop: 12 }}>
            <TextInput multiline={true} style={{ fontSize: 16 }} value={title} onChangeText={(t) => setTitle(t)} />
          </View>
        </View>

        {/* DEADLINE SECTION */}
        <View
          style={{
            marginHorizontal: 16,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View>
            <Text
              style={{ fontSize: 24, fontWeight: '500', color: COLORS.BLACK }}>
              Deadline
            </Text>
          </View>
          <TouchableOpacity
            onPress={showDatepicker}
            style={{
              backgroundColor: '#B3FFD9',
              paddingHorizontal: 20,
              paddingVertical: 4,
              borderRadius: 50,
            }}>
            <Text style={{ fontSize: 20, fontWeight: '500', color: '#000' }}>
              Day
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={showTimepicker}
            style={{
              backgroundColor: '#B3FFD9',
              paddingHorizontal: 20,
              paddingVertical: 4,
              borderRadius: 50,
            }}>
            <Text style={{ fontSize: 20, fontWeight: '500', color: '#000' }}>
              Time
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 20,
          }}>
          <Text style={{ marginHorizontal: 2, color: COLORS.BLACK }}>{String(deadline)}</Text>
        </View>

        <View style={{ marginTop: 20, marginLeft: 16 }}>
          <Text style={{ fontSize: 24, fontWeight: '500', color: COLORS.BLACK }}>
            Close on Deadline
          </Text>
        </View>

        <View

          style={styles.optionsViewContainer}>
          <TouchableOpacity
            onPress={() => setDeadlineSwitch(!deadlineSwitch)}
            style={
              deadlineSwitch
                ? styles.optionsViewActive
                : styles.optionsViewInactive
            }>
            <Text
              style={
                deadlineSwitch
                  ? styles.optionTextActive
                  : styles.optionTextInactive
              }>
              Yes
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setDeadlineSwitch(!deadlineSwitch)}
            style={
              deadlineSwitch
                ? styles.optionsViewInactive
                : styles.optionsViewActive
            }>
            <Text
              style={
                deadlineSwitch
                  ? styles.optionTextInactive
                  : styles.optionTextActive
              }>
              No
            </Text>
          </TouchableOpacity>
        </View>
        {/* INSTRUCTION */}
        <View
          style={{
            backgroundColor: 'transparent',
            marginHorizontal: 16,
            borderWidth: 1,
            borderColor: '#00CC66',
            borderRadius: 16,
            marginBottom: 24,
            marginTop: 30,
            height: 100

          }}>
          <View
            style={{
              position: 'absolute',
              marginLeft: 10,
              marginTop: 2,
            }}>
            <Text style={{ fontWeight: 'bold', color: COLORS.BLACK }}>
              Instruction
            </Text>
          </View>
          <View style={{ marginLeft: 6, paddingTop: 12 }}>
            <TextInput multiline={true} style={{ fontSize: 16 }} value={instructions} onChangeText={(text) => setInstructions(text)} />
          </View>
        </View>
        {/* POINTS PER RIGHT ANSWER */}
        <View
          style={{
            backgroundColor: 'transparent',
            marginHorizontal: 16,
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
              Points per right answer
            </Text>
          </View>
          <View style={{ marginLeft: 6, paddingTop: 6 }}>
            <TextInput keyboardType="number-pad" style={{ fontSize: 16 }} value={pointsPerRight} onChangeText={(text) => setPointsPerRight(text)} />
          </View>
        </View>

        {/* POINTS PER RIGHT ANSWER */}
        <View
          style={{
            backgroundColor: 'transparent',
            marginHorizontal: 16,
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
              Points per wrong answer
            </Text>
          </View>
          <View style={{ marginLeft: 6, paddingTop: 6 }}>
            <TextInput keyboardType="number-pad" style={{ fontSize: 16 }} value={pointsPerWrong} onChangeText={(text) => setPointsPerWrong(text)} />
          </View>
        </View>

        <Text
          style={{
            textAlign: 'center',
            fontSize: 10,
            fontStyle: 'italic',
            color: COLORS.BLACK,
          }}>{`(place a negative value for deduction every incorrect answer)`}</Text>
      </ScrollView>
      <Button
        text={'Next'}
        gradientColor={[COLORS.LIGHTGREEN, COLORS.MIDGREEN, COLORS.GREENNORMAL]}
        textStyle={{ paddingHorizontal: 20, textTransform: 'uppercase' }}
        containerStyle={{ marginHorizontal: 30, marginVertical: 20 }}
        onPress={handleCreateQuiz}
      />
    </>
  );
};

export default Quiz;

const styles = StyleSheet.create({
  optionsViewContainer: {
    flexDirection: 'row',
    backgroundColor: '#00CC66',
    alignSelf: 'center',
    marginTop: 10,
    width: 150,
    alignItems: 'center',
    justifyContent: 'space-around', padding: 4,
    borderRadius: 50,
  },
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
});
