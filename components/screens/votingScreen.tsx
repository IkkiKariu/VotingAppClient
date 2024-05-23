import React from "react";
import {useEffect, useState} from 'react';
import {View, ScrollView, StyleSheet, Text, SafeAreaView} from 'react-native';
import { Pressable } from "react-native";
import SurveyRepository from "../../api/repositories/surveyRepository";

type VotingScreenProps = {
    surveyData: any,
    setSurveyData: React.Dispatch<any>
}

type DecisionFieldProps = {
    text: string,
    decisionId: string
}

const DecisionField = (props: DecisionFieldProps) => {
    return (
        <Pressable style={styles.decisionField}>
            <Text style={styles.resetVoicesButtonText}>{props.text}</Text>
        </Pressable>
    )
}

const VotingScreen = (props: VotingScreenProps) => {

    const surveyRepository =  new SurveyRepository();
    const [decisions, setDecisions] = useState<React.JSX.Element[]>();

    useEffect(() => {
        console.log('VotingScreen useEffect');
        let decisionArray: React.JSX.Element[] = [];
        
        if(props.surveyData && props.surveyData.decisions) {
            props.surveyData.decisions.forEach((decision: any) => {
                decisionArray.push(<DecisionField text={decision.content} decisionId={decision.id} key={decision.id}/>);
            });

            setDecisions(decisionArray);
        }
    }, [props.surveyData]);

    return (
        <SafeAreaView style={styles.mainContainer}>
        <ScrollView contentContainerStyle={styles.mainContainer}>
            <View>
                <View style={styles.blockSection}>
                    <Text style={styles.titleText}>{ props.surveyData ? props.surveyData.title : 'Заголовок опроса' }</Text>
                </View>

                <View style={styles.blockSection}>
                    <Text style={styles.descryptionText}>{ props.surveyData ? props.surveyData.content : 'SurveyContent' }</Text>
                </View>
            </View>

            <View style={styles.blockSection}>
                {decisions?.map(el => { return el})}
            </View>

            <View style={styles.blockSection}>
                <Pressable style={styles.resetVoicesButton}>
                    <Text style={styles.resetVoicesButtonText}>Сбросить голоса</Text>
                </Pressable>
            </View>

        </ScrollView>
        </SafeAreaView>
    )
}


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
    },
    descryptionText: {
        // borderWidth: 1,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 15,
        textAlign: 'center',
        lineHeight: 20,
        minHeight: 120,
        maxWidth: 310,
        minWidth: 310,
        fontSize: 16,
        color: '#454544',
    },
    titleText: {
        // borderWidth: 1,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 15,
        textAlign: 'center',
        lineHeight: 20,
        minHeight: 70,
        maxHeight: 70,
        width: 250,
        minWidth: 250,
        maxWidth: 250,
        fontSize: 16,
        color: '#454544'
    },
    resetVoicesButton: {
        backgroundColor: 'white',
        height: 50,
        maxHeight: 50,
        minHeight: 50,
        width: 310,
        minWidth: 310,
        maxWidth: 310,
        borderRadius: 15,
        display: 'flex',
        justifyContent: 'center'
    },
    resetVoicesButtonText: {
        // borderWidth: 1,
        textAlign: 'center',
        fontSize: 15
    },
    decisionField: {
        backgroundColor: 'white',
        height: 50,
        maxHeight: 50,
        minHeight: 50,
        width: 310,
        minWidth: 310,
        maxWidth: 310,
        borderRadius: 15,
        display: 'flex',
        justifyContent: 'center',
        margin: 10
    },
    creatorText: {
        backgroundColor: 'white',
        fontSize: 16
    },
    creatorTextWrapper: {
        // borderWidth: 1,
        display: 'flex',
        alignItems: 'flex-start',
        backgroundColor: 'white',
        width: 320,
        minWidth: 320,
        maxWidth: 320,
        height: 110,
        minHeight: 110,
        borderRadius: 15,
        justifyContent: 'space-between',
        padding: 20,
        paddingHorizontal: 30 
    },
    sectionTitleContainer: {
        // borderWidth: 1,
        marginBottom: 15,
        width: 320,
        minWidth: 320,
        maxWidth: 320,
        display: 'flex',
        alignItems: "flex-start",
        paddingLeft: 15
    },
});

export default VotingScreen;