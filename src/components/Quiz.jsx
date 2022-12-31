import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button} from './Buttons';
import {COLORS} from '../common/utils/colors';
import {ScrollView} from 'react-native';

const Quiz = ({day, date, pst, setDeadlineSwitch, deadlineSwitch}) => {
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
            <Text style={{fontWeight: 'bold', color: COLORS.BLACK}}>
              Quiz Title
            </Text>
          </View>
          <View style={{marginLeft: 6, paddingTop: 12}}>
            <TextInput multiline={true} style={{fontSize: 16}} />
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
              style={{fontSize: 24, fontWeight: '500', color: COLORS.BLACK}}>
              Deadline
            </Text>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: '#B3FFD9',
              paddingHorizontal: 20,
              paddingVertical: 4,
              borderRadius: 50,
            }}>
            <Text style={{fontSize: 20, fontWeight: '500', color: '#000'}}>
              Day
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: '#B3FFD9',
              paddingHorizontal: 20,
              paddingVertical: 4,
              borderRadius: 50,
            }}>
            <Text style={{fontSize: 20, fontWeight: '500', color: '#000'}}>
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
          <Text style={{marginHorizontal: 2, color: COLORS.BLACK}}>{day}</Text>
          <Text style={{marginHorizontal: 2, color: COLORS.BLACK}}>{date}</Text>
          <Text style={{marginHorizontal: 2, color: COLORS.BLACK}}>{pst}</Text>
        </View>

        <View style={{marginTop: 20, marginLeft: 16}}>
          <Text style={{fontSize: 24, fontWeight: '500', color: COLORS.BLACK}}>
            Close on Deadline
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
            padding: 4,
            borderRadius: 50,
          }}>
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
          }}>
          <View
            style={{
              position: 'absolute',
              marginLeft: 10,
              marginTop: 2,
            }}>
            <Text style={{fontWeight: 'bold', color: COLORS.BLACK}}>
              Instruction
            </Text>
          </View>
          <View style={{marginLeft: 6, paddingTop: 12}}>
            <TextInput multiline={true} style={{fontSize: 16}} />
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
            <Text style={{fontWeight: 'bold', color: COLORS.BLACK}}>
              Points per right answer
            </Text>
          </View>
          <View style={{marginLeft: 6, paddingTop: 6}}>
            <TextInput keyboardType="number-pad" style={{fontSize: 16}} />
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
            <Text style={{fontWeight: 'bold', color: COLORS.BLACK}}>
              Points per right answer
            </Text>
          </View>
          <View style={{marginLeft: 6, paddingTop: 6}}>
            <TextInput keyboardType="number-pad" style={{fontSize: 16}} />
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
        text={'Upload file'}
        gradientColor={[COLORS.LIGHTGREEN, COLORS.MIDGREEN, COLORS.GREENNORMAL]}
        textStyle={{paddingHorizontal: 20, textTransform: 'uppercase'}}
        containerStyle={{marginHorizontal: 30, marginVertical: 20}}
        onPress={() => {}}
      />
    </>
  );
};

export default Quiz;

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
    color: '#d9d9d9',
  },
});
