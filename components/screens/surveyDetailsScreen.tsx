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

type SurveyDetailsScreenProps = {
    surveyData: any,
    setSurveyData: React.Dispatch<any>,
    surveyDetails: SurveyAnalyticsDTO|undefined,
    setSurveyDetails:  React.Dispatch<React.SetStateAction<SurveyAnalyticsDTO | undefined>>
}

type decisionAnalyticsFieldProps = {
    decisionAnalytics: DecisionDTO
}

const DecisionAnalyticsField = (props: decisionAnalyticsFieldProps) => {
    return (
        <View style={styles.decisionAnalyticsField}>
            <Text style={{fontWeight:'500', fontSize: 15}}>{props.decisionAnalytics.content}</Text>
            <View style={styles.statisticsSection}>
                <View style={styles.statisticsSectionContent}>
                    <Text>Голоса</Text>
                    <Text style={{color: 'green'}}>{props.decisionAnalytics.voteCount}</Text>
                </View>

                <View style={styles.statisticsSectionContent}>
                    <Text>Доля</Text>
                    <Text style={{color: 'green'}}>{props.decisionAnalytics.precentage + '%'}</Text>
                </View>
            </View>
        </View>
    )
}

type ParticipantListItemProps = {
    username: string;
}

const ParticipantListItem = (props: ParticipantListItemProps) => {
    return (
        <Text style={styles.participantListItem}>{props.username}</Text>
    )
}

const SurveyDetailsScreen = (props: SurveyDetailsScreenProps) => {

    const [decisions, setDecisions] = useState<React.JSX.Element[]>();

    useEffect(() => {
        console.log('SurveyDetailsScreen useEffect');
        if(props.surveyDetails && props.surveyDetails.decisions) {
            let decisionAnalyticsFieldArray: Array<React.JSX.Element> = [];
            let i = 0;

            props.surveyDetails.decisions.forEach(decision => {
                decisionAnalyticsFieldArray.push(<DecisionAnalyticsField key={i} decisionAnalytics={decision} />);
                i++;
            });

            setDecisions(decisionAnalyticsFieldArray);
        }
    }, [props.surveyDetails])
    
    return (
        <SafeAreaView style={styles.mainContainer}>
            <ScrollView contentContainerStyle={{...styles.mainContainer, justifyContent: 'flex-start'}}>
                <View style={styles.blockSection}>
                    <View style={styles.sectionTitleContainer}>
                        <Text style={{fontWeight: "500", fontSize: 16}}>Создатель опроса</Text>
                    </View>
                    <View style={styles.creatorTextWrapper}>
                        <Text style={styles.creatorText}>{props.surveyDetails?.creator.username}</Text>
                        <Text style={styles.creatorText}>
                            {props.surveyDetails?.creator.bio ? props.surveyDetails?.creator.username : '*Обычно здесь информация о пользователе ^-^'}
                        </Text>
                    </View>
                </View>

                <View style={styles.blockSection}>
                    <View style={styles.sectionTitleContainer}>
                        <Text style={{fontWeight: "500", fontSize: 16}}>Аналитика</Text>
                    </View>
                    <View style={styles.analyticsContainer}>
                        <View style={styles.analyticsItems}>
                            <Text>Голоса</Text>
                            <Text style={{color: 'green'}}>{props.surveyDetails?.voteCount}</Text>
                        </View>

                        <View style={styles.analyticsItems}>
                            <Text>Статус</Text>
                            <Text style={{color: 'green'}}>Активен</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.blockSection}>
                    <View style={styles.sectionTitleContainer}>
                        <Text style={{fontSize: 16, fontWeight: '500'}}>Решения</Text>
                    </View>

                    {decisions?.map(el => el)}
                </View>

                <View style={styles.blockSection}>
                    <View style={styles.sectionTitleContainer}>
                        <Text style={{fontSize: 16, fontWeight: '500'}}>Участники опроса</Text>
                    </View>
                    <View style={styles.participantList}> 
                        {
                            props.surveyDetails?.participants.map((participant, i) => [<ParticipantListItem key={i}  username={participant} />])
                        }
                    </View>
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
    analyticsContainer: {
        // borderWidth: 1,
        width: 320,
        minWidth: 320,
        maxWidth: 320,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    analyticsItems: {
        // borderWidth: 1,
        backgroundColor: 'white',
        width: 153,
        height: 65,
        borderRadius: 20,
        display: 'flex',
        padding: 10,
        paddingHorizontal: 22,
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },
    decisionAnalyticsField: {
        // borderWidth: 1,
        width: 320,
        minWidth: 320,
        maxWidth: 320,
        marginBottom: 25,
        borderRadius: 20,
        padding: 10,
        paddingStart: 25,
        backgroundColor: 'white'
    },
    statisticsSection: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "flex-start",
        marginTop: 10
    },
    statisticsSectionContent: {
        display: 'flex',
        justifyContent: 'flex-start',
        marginRight: 20
    },
    participantListItem: {
        // borderWidth: 1,
        backgroundColor: 'white',
        width: 280,
        minWidth: 280,
        maxWidth: 280,
        fontSize: 16,
        borderBottomWidth: 1,
        lineHeight: 40,
        borderColor: 'gray'
    },
    participantList: {
        
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 20
    }
});

export default SurveyDetailsScreen;