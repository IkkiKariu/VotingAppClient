import React from "react";
import {useEffect, useState} from 'react';
import {View, ScrollView, StyleSheet, Text, SafeAreaView, Pressable, FlatList} from 'react-native';
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

const SurveyItemList = (props: SurveyListItemProps) => {
    const onPressHandler = () => {

    }

    return (
        <View>
            <Pressable onPress={onPressHandler}>
                <Text>{props.data.survey.title}</Text>
            </Pressable>
        </View>
    )
}

const ParticipatedSurveysScreen = () => {
    const surveyRepository = new SurveyRepository();
    const [participatedSurveys, setParticipatedSurveys] = useState<any>();

    useEffect(() => {
        surveyRepository.getParticipatedSurveys("2|3d3kUOpUbs3X0H66MVzNYgLrf6tKh8cCuTbospSLd0ba1930")
        .then(response => {
            if(response.data.response_status == 'success') {
                console.log(response.data.data);
                setParticipatedSurveys(response.data.data);
            }
            else {
                setParticipatedSurveys(null);
            }
        })
        .catch(e => {
            console.log(e);
            setParticipatedSurveys(null);
        })
    });

    if(participatedSurveys) {
        return (
            <SafeAreaView style={styles.mainContainer}>
                {/* <ScrollView contentContainerStyle={styles.mainContainer}> */}
                    <View style={styles.blockSection}>
                        <FlatList 
                            data={participatedSurveys}
                            renderItem={item => <SurveyItemList data={item}/>}
                            keyExtractor={item => item.survey.public_uid}> 
                        </FlatList>
                    </View>
                {/* </ScrollView> */}
            </SafeAreaView>
        )
    }
}

export default ParticipatedSurveysScreen;

const styles = StyleSheet.create({
    mainContainer: {
        padding: 0,
        backgroundColor: '#e6e6e4',
        display: "flex",
        justifyContent: "space-around",
        flexGrow: 1,
    },
    blockSection: {
        // borderWidth: 1,
        padding: 5,
        margin: 10,
        display: 'flex',
        alignItems: "center"
    }
});