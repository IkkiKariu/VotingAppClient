import React from "react";
import {useEffect, useState} from 'react';
import {View, ScrollView, StyleSheet, Text, SafeAreaView} from 'react-native';
import { Pressable } from "react-native";
import SurveyRepository from "../../api/repositories/surveyRepository";
import SurveyService from "../../services/surveyService";

type VotingScreenProps = {
    surveyData: any,
    setSurveyData: React.Dispatch<any>,
    isVoted: boolean|undefined,
    setIsVoted: React.Dispatch<boolean>,
    surveyPublicUid: string
}

type DecisionFieldProps = {
    text: string,
    decisionId: number,
    isVoted: boolean|undefined,
    setIsVoted: React.Dispatch<boolean>,
    surveyPublicUid: string
}

// type ResetButtonProps = {
//     isVoted: boolean|undefined
// }

const DecisionField = (props: DecisionFieldProps) => {

    const surveyService: SurveyService = new SurveyService(new SurveyRepository());

    const onPressHandler = () => {
        surveyService.vote({surveyPublicUid: props.surveyPublicUid, decisionId: props.decisionId})
        .then((response) => {
            // console.log(`createVote response_status: ${response.data.response_status}`);
            let requestStatus = response.data.response_status === 'success' ? true : false
            if(requestStatus) {
                props.setIsVoted(true);
            }
        })
        .catch(e => {
            console.log(e);
        });
    }
    
    if(!props.isVoted) {
        return (
            <Pressable style={styles.decisionField} onPress={onPressHandler}>
                <Text style={styles.resetVoicesButtonText}>{props.text}</Text>
            </Pressable>
        )
    }
    else {
        return (
            <Pressable style={styles.decisionFieldDisabled} disabled={true}>
                <Text style={styles.resetVoicesButtonText}>{props.text}</Text>
            </Pressable>
        )
    }
}

type ResetVoicesButtonProps = {
    isVoted: boolean|undefined,
    setIsVoted: React.Dispatch<boolean>, 
    surveyData: any
}

const ResetVoicesButton = (props: ResetVoicesButtonProps) => {
    const surveyRepository = new SurveyRepository();
    
    let decisionIdList: Array<number> = [];
    
    if(props.surveyData && props.surveyData.decisions) {
        props.surveyData.decisions.forEach(decision => {
            decisionIdList.push(decision.id)
        });

        // console.log(decisionIdList);
    }
    console.log(`voted: ${typeof(props.isVoted)}`);

    const onPressHandler = () => {
        surveyRepository.deleteVotes(
            '1|876GjJRxTrUMsCM0WbLlq2hmR7aKD8FVCWidBTy0d2613700', 
            '663cbe4b2be151.28212116',
            decisionIdList 
        ).then(response => {
            console.log(`Reset votes response: ${response.data.response_status}`)
            if(response.data.response_status == 'success'){
                props.setIsVoted(false);
            }
        }).catch(e => {
            console.log(e);
        });
    }

    if(props.isVoted) {
        return (
            <Pressable style={styles.resetVoicesButton} onPress={onPressHandler}>
                <Text style={styles.resetVoicesButtonText}>Сбросить голоса</Text>
            </Pressable>
        )
    }
    else {
        return (
            <Pressable style={styles.resetVoicesButtonDisabled} disabled={true}>
                <Text style={styles.resetVoicesButtonDisabledText}>Сбросить голоса</Text>
            </Pressable>
        )
    }
}

const VotingScreen = (props: VotingScreenProps) => {

    const surveyRepository =  new SurveyRepository();
    const [decisions, setDecisions] = useState<React.JSX.Element[]>();

    useEffect(() => {
        console.log('VotingScreen useEffect');
        let decisionArray: React.JSX.Element[] = [];

        if(props.surveyData && props.surveyData.decisions) {
            props.surveyData.decisions.forEach((decision: any) => {
                decisionArray.push(<DecisionField text={decision.content} decisionId={decision.id} key={decision.id}
                isVoted={props.isVoted} surveyPublicUid={props.surveyPublicUid} setIsVoted={props.setIsVoted}/>);
            });

            setDecisions(decisionArray);
        }
    }, [props.surveyData]);

    const handleDecisionButtonOnPress = () => {

    }

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
                {decisions?.map(el => { return el })}
            </View>

            <View style={styles.blockSection}>
                <ResetVoicesButton isVoted={props.isVoted} surveyData={props.surveyData} setIsVoted={props.setIsVoted}/>
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
        borderRadius: 25,
        display: 'flex',
        justifyContent: 'center'
    },
    resetVoicesButtonDisabled: {
        backgroundColor: 'gray',
        height: 50,
        maxHeight: 50,
        minHeight: 50,
        width: 310,
        minWidth: 310,
        maxWidth: 310,
        borderRadius: 25,
        display: 'flex',
        justifyContent: 'center'
    },
    resetVoicesButtonText: {
        // borderWidth: 1,
        textAlign: 'center',
        fontSize: 17,
    },
    resetVoicesButtonDisabledText: {
        // borderWidth: 1,
        textAlign: 'center',
        fontSize: 17,
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
    decisionFieldDisabled: {
        backgroundColor: 'gray',
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