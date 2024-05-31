import React from 'react';
import {SafeAreaView, StyleSheet, TextInput} from 'react-native';
import {Button, View, Alert } from 'react-native';

const Knopka = () =>{
    return(
        <View style={styles.fixToText}><Button title='Войти' color="#000000" onPress={() => Alert.alert('На данный момент не рабочая кнопка')}/></View>
    )
};

const TextInputExample = () => {
  const [text, onChangeText] = React.useState('');
  const [number, onChangeNumber] = React.useState('');

  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder="Введите логин"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input2}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="Введите пароль"
        keyboardType="numeric"
      />

      <Knopka />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    top: 200,
    height: 40,
    margin: 15,
    borderWidth: 2,
    padding: 10,
    display:'flex',
    flexDirection: 'column',
},
  input2:{
    top: 230,
    height: 40,
    margin: 15,
    borderWidth: 2,
    padding: 10,
    display:'flex',
    flexDirection: 'column'
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    top: 430,
    left:150, 
}
});





export default TextInputExample
