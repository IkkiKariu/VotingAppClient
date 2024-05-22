import React from "react";
import {useEffect, useState} from 'react';
import {View, ScrollView, StyleSheet, Text, SafeAreaView} from 'react-native';
import { Pressable, useWindowDimensions } from "react-native";
import SurveyRepository from "../../api/repositories/surveyRepository";
import { TabView, SceneMap } from 'react-native-tab-view';
import UserRepository from "@/api/repositories/userRepository";
import {SurveyAnalyticsDTO} from "../../dto/surveyAnalyticsDto";
import SurveyService from "../../services/surveyService";
import {DecisionDTO} from "../../dto/surveyAnalyticsDto";
import { randomUUID } from "crypto";


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
            // console.log(response.data)
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

const SurveyDetailsScreen = () => {
    const surveyRepository: SurveyRepository = new SurveyRepository();
    const surveyService: SurveyService = new SurveyService(surveyRepository);

    const [surveyData, setSurveyData] = useState<any>(undefined);
    const [surveyDetails, setSurveyDetails] = useState<SurveyAnalyticsDTO|undefined>(undefined);

    const [decisions, setDecisions] = useState<React.JSX.Element[]>();

    useEffect(() => {
        surveyRepository.getSurvey('1|876GjJRxTrUMsCM0WbLlq2hmR7aKD8FVCWidBTy0d2613700', '663cbe4b2be151.28212116')
        .then((response) => {
            setSurveyData(response.data);
            setSurveyDetails(surveyService.explore(response.data));
            // console.log(surveyDetails?.decisions);
        })
        .catch((err) => {
            setSurveyData(undefined);
        });
    }, []);

    useEffect(() => {
        if(surveyDetails && surveyDetails.decisions) {
            let decisionAnalyticsFieldArray: Array<React.JSX.Element> = [];
            let i = 0;

            surveyDetails.decisions.forEach(decision => {
                decisionAnalyticsFieldArray.push(<DecisionAnalyticsField key={i} decisionAnalytics={decision} />);
                i++;
            });

            setDecisions(decisionAnalyticsFieldArray);
        }
    }, [surveyDetails])
    
    return (
        <SafeAreaView style={styles.mainContainer}>
            <ScrollView contentContainerStyle={{...styles.mainContainer, justifyContent: 'flex-start'}}>
                <View style={styles.blockSection}>
                    <View style={styles.sectionTitleContainer}>
                        <Text style={{fontWeight: "500", fontSize: 16}}>Создатель опроса</Text>
                    </View>
                    <View style={styles.creatorTextWrapper}>
                        <Text style={styles.creatorText}>{surveyDetails?.creator.username}</Text>
                        <Text style={styles.creatorText}>
                            {surveyDetails?.creator.bio ? surveyDetails?.creator.username : '*Обычно здесь информация о пользователе ^-^'}
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
                            <Text style={{color: 'green'}}>{surveyDetails?.voteCount}</Text>
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
                            surveyDetails?.participants.map((participant, i) => [<ParticipantListItem key={i}  username={participant} />])
                        }
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>    
    )
}

const renderScene = SceneMap({
    first: VotingScreen,
    second: SurveyDetailsScreen,
  });


const SurveyScreen = () => {
    const layout = useWindowDimensions();

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'first', title: 'Голосовать' },
        { key: 'second', title: 'Детали опроса' },
    ]);

    return(
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            // initialLayout={{ width: 200 }}
        />
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

export default SurveyScreen;