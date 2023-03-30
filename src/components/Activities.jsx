import React, { useState } from 'react';
import {
  PermissionsAndroid,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button } from './Buttons';
import { COLORS } from '../common/utils/colors';
import { openFile, reminder } from '../common/utils/utility';

import DocumentPicker from 'react-native-document-picker';
import { utils } from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
import { asyncThunkFullfiled, isValid } from '../common/validation';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { addActivity, setActivity } from '../services/redux/slice/activity';
import { ROUTES } from '../common/routes';

const Activities = ({
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
  const [points, setPoints] = useState("5")
  const [files, setFiles] = useState([])
  const dispatch = useDispatch();
  const navigation = useNavigation()
  const removeFileItem = (index) => {
    const tempFiles = [...files]
    tempFiles.splice(index, 1);
    setFiles(tempFiles)
  }
  const handleCreateActivity = async () => {
    const valid = isValid(title, instructions, Number(points))
    if (!valid) {
      setShowAlert(true);
      setAlertMessage("All fields are required");
      return
    }
    try {
      const dispatched = await dispatch(addActivity({
        title: title,
        deadline: deadline,
        closeOnDeadline: deadlineSwitch,
        instructions: instructions,
        points: Number(points),
        files: files
      }))
      if (asyncThunkFullfiled(dispatched)) {
        ToastAndroid.showWithGravity(
          'Activity posted!',
          ToastAndroid.LONG,
          ToastAndroid.CENTER,
        );
        navigation.navigate(ROUTES.HOME_SCREEN)
      } else {
        setShowAlert(true);
        setAlertMessage("Unable to post");
      }
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <>
      <View
        style={styles.formContainer}>
        <View
          style={styles.textInputContainer}>
          <View
            style={styles.labelContainer}>
            <Text style={styles.textInputtitle}>
              Activity Title
            </Text>
          </View>
          <View style={{ marginLeft: 6, paddingTop: 12 }}>
            <TextInput multiline={true} style={{ fontSize: 16 }} value={title} onChangeText={(text) => setTitle(text)} />
          </View>
        </View>

        {/* DEADLINE SECTION */}
        <View
          style={styles.deadlinePickerContainer}>
          <View>
            <Text
              style={styles.title}>
              Deadline
            </Text>
          </View>
          <TouchableOpacity
            onPress={showDatepicker}
            style={styles.datePicker}>
            <Text style={styles.datePickerText}>
              Day
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={showTimepicker}
            style={styles.datePicker}>
            <Text style={styles.datePickerText}>
              Time
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={styles.deadlineContainer}>
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
          style={styles.instructionsCard}>
          <View
            style={styles.instructionsContainer}>
            <Text style={styles.textInputtitle}>
              Instruction
            </Text>
          </View>
          <View style={{ marginLeft: 6, paddingTop: 12 }}>
            <TextInput multiline={true} style={{ fontSize: 16 }} value={instructions} onChangeText={(text) => setInstructions(text)} />
          </View>
        </View>
        <View
          style={styles.pointsContainer}>
          <View
            style={styles.pointsTextContainer}>
            <Text style={styles.textInputtitle}>
              Points for the activity
            </Text>
          </View>
          <View style={{ marginLeft: 6, paddingTop: 6 }}>
            <TextInput keyboardType="number-pad" style={{ fontSize: 16 }} value={points} onChangeText={(text) => setPoints(text)} />
          </View>
        </View>
      </View>
      <View style={{ marginTop: 20, marginBottom: 10 }}>
        <Text
          style={styles.reminder}>
          {reminder}
        </Text>
      </View>
      {files.length > 0 ? files.map((file, i) => {
        return (
          <TouchableOpacity key={i} style={styles.fileCard} onPress={() => removeFileItem(i)}>
            <Text style={styles.fileName}>{file.fileName}</Text>
          </TouchableOpacity>
        )
      }) : null}
      <Button
        text={'Upload file'}
        textStyle={{
          paddingHorizontal: 20,
          textTransform: 'uppercase',
          color: COLORS.BLACK,
        }}
        containerStyle={{
          marginHorizontal: 30,
          marginVertical: 10,
          backgroundColor: '#B3FFD9',
        }}
        onPress={() => openFile(setFiles)}
      />
      <Button
        text={'post activity'}
        gradientColor={[COLORS.LIGHTGREEN, COLORS.MIDGREEN, COLORS.GREENNORMAL]}
        textStyle={{ paddingHorizontal: 20, textTransform: 'uppercase' }}
        containerStyle={{ marginHorizontal: 30, marginBottom: 20 }}
        onPress={handleCreateActivity}
      />
    </>
  );
};


export default Activities;

const styles = StyleSheet.create({
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
  formContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    borderRadius: 16,
    paddingBottom: 20,
  },
  textInputContainer: {
    backgroundColor: 'transparent',
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: '#00CC66',
    borderRadius: 16,
    marginBottom: 24,
    marginTop: 30,
  },
  labelContainer: {
    position: 'absolute',
    marginLeft: 10,
    marginTop: 2,
  },
  deadlinePickerContainer: {
    marginHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deadlineContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  datePicker: {
    backgroundColor: '#B3FFD9',
    paddingHorizontal: 20,
    paddingVertical: 4,
    borderRadius: 50,
  },
  datePickerText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#000'
  },
  textInputtitle: { fontWeight: 'bold', color: COLORS.BLACK },
  title: { fontSize: 24, fontWeight: '500', color: COLORS.BLACK },
  instructionsCard: {
    backgroundColor: 'transparent',
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: '#00CC66',
    borderRadius: 16,
    marginBottom: 24,
    marginTop: 30,
  },
  instructionsContainer: {
    position: 'absolute',
    marginLeft: 10,
    marginTop: 2,
  },
  pointsContainer: {
    backgroundColor: 'transparent',
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: '#00CC66',
    borderRadius: 16,
    marginBottom: 10,
    marginTop: 10,
  },
  pointsTextContainer: {
    position: 'absolute',
    marginLeft: 10,
    marginTop: 2,
  },
  optionsViewContainer: {
    flexDirection: 'row',
    backgroundColor: '#00CC66',
    alignSelf: 'center',
    marginTop: 10, width: 150,
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 4,
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
  reminder: {
    textAlign: 'center',
    fontSize: 10,
    fontStyle: 'italic',
    color: COLORS.BLACK,
  },
});