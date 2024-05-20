import React from "react";
import {useEffect, useState} from 'react';
import {View, ScrollView, StyleSheet, Text, SafeAreaView} from 'react-native';
import { Pressable } from "react-native";
import SurveyRepository from "../../api/repositories/surveyRepository";


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


const VotingScreen = () => {

    // const decisions: React.JSX.Element[] = [];
    const surveyRepository =  new SurveyRepository();

    const [decisions, setDecisions] = useState<React.JSX.Element[]>();
    const [surveyData, setSurveyData] = useState<any>({});

    useEffect(() => {
        surveyRepository.getSurvey('1|876GjJRxTrUMsCM0WbLlq2hmR7aKD8FVCWidBTy0d2613700', '663cbe4b2be151.28212116')
        .then((response) => {
            console.log(response.data)
            setSurveyData(response.data);
        })
        .catch((error) => {
            console.log(error);
            setSurveyData(undefined);
        });
    }, []);

    useEffect(() => {
        let decisionArray: React.JSX.Element[] = [];
        
        if(surveyData && surveyData.decisions) {
            surveyData.decisions.forEach((decision: any) => {
                decisionArray.push(<DecisionField text={decision.content} decisionId={decision.id} key={decision.id}/>);
            });

            setDecisions(decisionArray);
        }

        

    }, [surveyData]);

    return (
        <SafeAreaView style={styles.mainContainer}>
        <ScrollView contentContainerStyle={styles.mainContainer}>
            <View>
                <View style={styles.blockSection}>
                    <Text style={styles.titleText}>{ surveyData ? surveyData.title : 'Заголовок опроса' }</Text>
                </View>

                <View style={styles.blockSection}>
                    <Text style={styles.descryptionText}>{ surveyData ? surveyData.content : 'SurveyContent' }</Text>
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
        padding: 5,
        backgroundColor: '#e6e6e4',
        display: "flex",
        justifyContent: "space-around",
        flexGrow: 1,
    },
    blockSection: {
        padding: 5,
        // borderWidth: 1,
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
    }
});

export default VotingScreen;