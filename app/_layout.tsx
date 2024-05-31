import { Stack } from "expo-router";
import RegistrationForm from "../components/forms/registrationForm";
import SurveyScreen from "../components/screens/surveyScreen";
import ParticipatedSurveysScreen from '../components/screens/participatedSurveysScreen';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {View, useWindowDimensions, SafeAreaView} from 'react-native';
import { useState } from "react";


export default function RootLayout() {
  

  return (
    // <Stack>
    //   <Stack.Screen name="index"/>
    // </Stack>

    // <SurveyScreen />
    <ParticipatedSurveysScreen />
    
  );
}
