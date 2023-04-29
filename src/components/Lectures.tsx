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
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { asyncThunkFullfiled, isValid } from '../common/validation';
import { ToastAndroid } from 'react-native';
import { openFile } from '../common/utils/utility';
import { reminder } from '../common/utils/utility';
import { addLecture } from '../services/redux/slice/activity';
import { LectureType } from '../common/types';
import { ROUTES } from '../common/routes';

const Lectures = ({
  setShowAlert,
  setAlertMessage,
}) => {
  const [title, setTitle] = useState("")
  const [instructions, setInstructions] = useState("")
  const [points, setPoints] = useState("5")
  const [files, setFiles] = useState([]);
  const navigation = useNavigation()
  const dispatch = useDispatch();
  const removeFileItem = (index) => {
    const tempFiles = [...files]
    tempFiles.splice(index, 1);
    setFiles(tempFiles)
  }
  const handleCreateLectures = async () => {
    const valid = isValid(title, instructions, Number(points))
    if (!valid) {
      setShowAlert(true);
      setAlertMessage("All fields are required");
      return
    }
    try {
      const data: LectureType = {
        id: '',
        title: title,
        instructions: instructions,
        datePosted: new Date(),
        files: files
      }
      // @ts-ignore
      const dispatched = dispatch(addLecture(data))
      if (dispatched) {
        ToastAndroid.showWithGravity(
          'Activity posted!',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
        );
        navigation.navigate(ROUTES.HOME_SCREEN)
      }
      else {
        setShowAlert(true);
        setAlertMessage("Unable to post");
      }
    } catch (error) {
      console.error("errory: ", error)
    }
  }
  return (
    <>
      <View
        style={styles.formContainer}>
        <View style={{ marginLeft: 16, marginTop: 10 }}>
          <Text style={{ fontSize: 26, fontWeight: '600', color: COLORS.BLACK }}>
            Lecture Title
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
              style={{ fontSize: 16, textAlign: 'left', paddingLeft: 10 }}
              placeholder="Lecture 1"
              value={title} onChangeText={(text) => setTitle(text)}
            />
          </View>
        </View>
        <View style={{ marginLeft: 16, marginTop: 10 }}>
          <Text style={{ fontSize: 26, fontWeight: '600', color: COLORS.BLACK }}>
            Instruction
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
              style={{ fontSize: 16, textAlign: 'left', paddingLeft: 10 }}
              placeholder="Read each question carefully"
              value={instructions} onChangeText={(text) => setInstructions(text)}
            />
          </View>
        </View>
      </View>
      <View style={{ marginTop: 20, marginBottom: 10 }}>
        <Text
          style={styles.reminder}>
          {reminder}
        </Text>
      </View>
      {files.length > 0 ? files.map((file: any, i) => {
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
        onPress={handleCreateLectures}
      />
    </>
  );
};

export default Lectures;

const styles = StyleSheet.create({
  fileCard: {
    marginBottom: 5,
    marginHorizontal: 16,
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
    height: 100
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