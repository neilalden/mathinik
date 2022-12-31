import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Screen from '../../components/Screen';
import {useNavigation, useRoute} from '@react-navigation/native';
import Icon from '../../components/Icon';
import {IMAGES} from '../../common/images';
import CheckBox from '@react-native-community/checkbox';
import {Button} from '../../components/Buttons';
import {COLORS} from '../../common/utils/colors';
import {ROUTES} from '../../common/routes';
import {ScrollView} from 'react-native-gesture-handler';

const AddQuestionScreen = () => {
  // to get current route name
  const route = useRoute();
  // to navigate pages
  const navigation = useNavigation();
  const [options, setOptions] = useState(false);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const handleOnPress = route => {
    navigation.navigate(route);
  };
  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <ScrollView style={{backgroundColor: '#E0EBEB'}}>
      <View style={{marginVertical: 30, marginLeft: 24}}>
        <Icon source={IMAGES.ic_arrowBack} onPress={handleBack} size={50} />
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
              marginLeft: 10,
              marginTop: 2,
            }}>
            <Text style={{fontWeight: 'bold', color: '#000'}}>Question</Text>
          </View>
          <View style={{marginLeft: 6, paddingTop: 12}}>
            <TextInput
              multiline={true}
              style={{fontSize: 16, color: '#000'}}
              placeholder="Problems..."
            />
          </View>
        </View>
        {/*END OF TEXT INPUT VIEW  */}
        <View style={{marginLeft: 16}}>
          <Text style={{fontSize: 26, fontWeight: '600', color: '#000'}}>
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
            onPress={() => setOptions(!options)}
            style={
              options ? styles.optionsViewActive : styles.optionsViewInactive
            }>
            <Text
              style={
                options ? styles.optionTextActive : styles.optionTextInactive
              }>
              Option
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setOptions(!options)}
            style={
              options ? styles.optionsViewInactive : styles.optionsViewActive
            }>
            <Text
              style={
                options ? styles.optionTextInactive : styles.optionTextActive
              }>
              Write
            </Text>
          </TouchableOpacity>
        </View>

        {options ? (
          <>
            <View style={{marginLeft: 16, marginTop: 28}}>
              <Text style={{fontSize: 26, fontWeight: '600', color: '#000'}}>
                Correct Answer
              </Text>
            </View>
            {/* CHECK BOX AND TEXTINPUT */}
            <View style={{marginTop: 10, flexDirection: 'row'}}>
              <View
                style={{
                  padding: 1,
                  backgroundColor: 'transparent',
                  marginLeft: 16,
                  borderRadius: 10,
                  alignSelf: 'center',
                  width: 30,
                  borderWidth: 1,
                  borderColor: '#000',
                  height: 30,
                }}></View>
              <View
                style={{
                  marginHorizontal: 16,

                  borderWidth: 1,
                  flex: 1,
                  borderColor: '#00CC66',
                  borderRadius: 16,
                }}>
                <TextInput
                  multiline={true}
                  style={{fontSize: 16, textAlign: 'center', color: '#000'}}
                  placeholder="Write the correct answer here"
                />
              </View>
            </View>
            {/* CHECK BOX AND TEXTINPUT */}

            <View style={{marginLeft: 16, marginTop: 28}}>
              <Text style={{fontSize: 26, fontWeight: '600', color: '#000'}}>
                Add Option
              </Text>
            </View>
            {/* CHECK BOX AND TEXTINPUT */}
            <View style={{marginTop: 10, flexDirection: 'row'}}>
              <View
                style={{
                  padding: 1,
                  backgroundColor: 'transparent',
                  marginLeft: 16,
                  borderRadius: 10,
                  alignSelf: 'center',
                  width: 30,
                  borderWidth: 1,
                  borderColor: '#000',
                  height: 30,
                }}></View>
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
                  style={{fontSize: 16, textAlign: 'center', color: '#000'}}
                  placeholder="Write the correct answer here"
                />
              </View>
            </View>
            {/* CHECK BOX AND TEXTINPUT */}
            <Button
              text={'ADD OPTION'}
              textStyle={{paddingHorizontal: 20, color: 'black', fontSize: 16}}
              containerStyle={{
                marginHorizontal: 16,
                marginVertical: 20,
                backgroundColor: '#B3FFD9',
              }}
              onPress={() => {}}
            />
            <View style={{marginLeft: 16, marginTop: 8}}>
              <Text style={{fontSize: 26, fontWeight: '600', color: '#000'}}>
                Added Option
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: '#000',
                  textAlign: 'center',
                  marginTop: 10,
                }}>
                No options added yet.
              </Text>
            </View>
          </>
        ) : (
          <>
            <View style={{marginLeft: 16, marginTop: 20}}>
              <Text
                style={{fontSize: 26, fontWeight: '600', color: COLORS.BLACK}}>
                Correct Answer
              </Text>
            </View>

            <View style={{marginTop: 10}}>
              <View
                style={{
                  marginHorizontal: 16,

                  borderWidth: 1,
                  borderColor: '#00CC66',
                  borderRadius: 16,
                }}>
                <TextInput
                  multiline={true}
                  style={{fontSize: 16, textAlign: 'center', color: '#000'}}
                  placeholder="Write the correct answer here"
                />
              </View>
            </View>
          </>
        )}

        <Button
          text={'ADD QUESTION'}
          gradientColor={[
            COLORS.LIGHTGREEN,
            COLORS.MIDGREEN,
            COLORS.GREENNORMAL,
          ]}
          textStyle={{paddingHorizontal: 20, color: '#FFF', fontSize: 16}}
          containerStyle={{marginHorizontal: 16, marginVertical: 20}}
          onPress={() => {}}
        />
      </View>

      <View style={{marginLeft: 30, marginTop: 8}}>
        <Text style={{fontSize: 26, fontWeight: '600', color: '#000'}}>
          Quiz Items
        </Text>
        <Text
          style={{
            fontSize: 12,
            color: '#000',
            textAlign: 'center',
            marginTop: 10,
          }}>
          No Quiz items yet.
        </Text>
      </View>
      <Button
        text={'POST QUIZ'}
        gradientColor={[COLORS.LIGHTGREEN, COLORS.MIDGREEN, COLORS.GREENNORMAL]}
        textStyle={{paddingHorizontal: 20, color: '#000', fontSize: 16}}
        containerStyle={{marginHorizontal: 30, marginVertical: 10}}
        onPress={() => {}}
      />
      <Button
        text={'Continue Create Todo SC'}
        gradientColor={[COLORS.GREEN300, COLORS.GREEN500]}
        textStyle={{paddingHorizontal: 20}}
        containerStyle={{marginHorizontal: 30, marginVertical: 10}}
        onPress={() => handleOnPress(ROUTES.CREATE_TODO_SCREEN)}
      />
    </ScrollView>
  );
};

export default AddQuestionScreen;

const styles = StyleSheet.create({
  optionsViewActive: {
    backgroundColor: '#00FF80',
    paddingHorizontal: 6,
    borderRadius: 16,
  },
  optionsViewInactive: {
    backgroundColor: '#00CC66',
    paddingHorizontal: 6,

    borderRadius: 16,
  },
  optionTextActive: {
    fontSize: 20,
    color: '#000',
    padding: 4,
  },
  optionTextInactive: {
    fontSize: 20,
    padding: 4,
    color: 'white',
  },
});
