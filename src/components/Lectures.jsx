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

const Lectures = () => {
  return (
    <>
      <View
        style={{
          backgroundColor: '#fff',
          marginHorizontal: 16,
          borderRadius: 16,
          paddingBottom: 20,
        }}>
        <View style={{marginLeft: 16, marginTop: 10}}>
          <Text style={{fontSize: 26, fontWeight: '600', color: COLORS.BLACK}}>
            Lecture Title
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
              style={{fontSize: 16, textAlign: 'left', paddingLeft: 10}}
              placeholder="Lecture 1"
            />
          </View>
        </View>
        <View style={{marginLeft: 16, marginTop: 10}}>
          <Text style={{fontSize: 26, fontWeight: '600', color: COLORS.BLACK}}>
            Instruction
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
              style={{fontSize: 16, textAlign: 'left', paddingLeft: 10}}
              placeholder="Read each question carefully"
            />
          </View>
        </View>
      </View>
      <View style={{marginTop: 10, marginBottom: 160}}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 10,
            fontStyle: 'italic',
            color: COLORS.BLACK,
          }}>
          {`Reminder: Most devices only support images, videos,
text, and PDF files. Any other file types would  require
 students to have the necessary application to open 
them.`}
        </Text>
      </View>
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
        onPress={() => {}}
      />
      <Button
        text={'post activity'}
        gradientColor={[COLORS.LIGHTGREEN, COLORS.MIDGREEN, COLORS.GREENNORMAL]}
        textStyle={{paddingHorizontal: 20, textTransform: 'uppercase'}}
        containerStyle={{marginHorizontal: 30, marginBottom: 20}}
        onPress={() => {}}
      />
    </>
  );
};

export default Lectures;
