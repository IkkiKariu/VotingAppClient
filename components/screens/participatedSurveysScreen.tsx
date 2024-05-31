import React from "react";
import {useEffect, useState} from 'react';
import {View, ScrollView, StyleSheet, Text, SafeAreaView} from 'react-native';
import { useWindowDimensions } from "react-native";
import SurveyRepository from "../../api/repositories/surveyRepository";
import { TabView, SceneMap } from 'react-native-tab-view';
import {SurveyAnalyticsDTO} from "../../dto/surveyAnalyticsDto";
import SurveyService from "../../services/surveyService";
import {DecisionDTO} from "../../dto/surveyAnalyticsDto";
import VotingScreen from "./votingScreen"


type SurveyListItemProps = {
    data: any
}

const ParticipatedSurveysScreen = () => {
    const surveyRepository = new SurveyRepository();

    useEffect(() => {

    })

    return (
        <View></View>
    )
}

export default ParticipatedSurveysScreen;