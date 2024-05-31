// import React from 'react';
import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, TextInput, Text} from 'react-native';
// import { blue } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';
import {Button, View, Alert } from 'react-native';
  
const Knopka = () =>{
    return(
        <View style={styles.fixToText}><Button title='Войти' color="#000000" onPress={() => Alert.alert('На данный момент не рабочая кнопка')}/></View>
    )
};
  

const RegistrationScreen = () => {
    const bodyText = 'Вы здесь впервые? \nЗарегестрируйтесь!';
    const [text, onChangeText] = React.useState('');
    const [number, onChangeNumber] = React.useState('');

    return (
      <SafeAreaView>
        <Text style={styles.textstyle}>{bodyText}</Text>
        <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
            placeholder="Введите имя"
            keyboardType="numeric"
        />
        <TextInput
            style={styles.input2}
            onChangeText={onChangeNumber}
            value={number}
            placeholder="Введите логин"
            keyboardType="numeric"
        />
        <TextInput
            style={styles.input3}
            onChangeText={onChangeNumber}
            value={number}
            placeholder="Введите пароль"
            keyboardType="numeric"
        />

        <Knopka />
      </SafeAreaView>
    );
};  

export default RegistrationScreen;

const styles = StyleSheet.create({
    input: {
        top: 180,
        height: 40,
        margin: 15,
        borderWidth: 2,
        padding: 10,
        display:'flex',
        flexDirection: 'column',
},  
    input2:{
        top: 180,
        height: 40,
        margin: 15,
        borderWidth: 2,
        padding: 10,
        display:'flex',
        flexDirection: 'column',
    },
    input3:{
        top: 180,
        height: 40,
        margin: 15,
        borderWidth: 2,
        padding: 10,
        display:'flex',
        flexDirection: 'column',
    },
    textstyle:{
        display:'flex',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 15,
        textAlign: 'center',
        fontSize: 20,
        color: '#454544'
    },
    fixToText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        top: 430,
        left:150, 
      }
});