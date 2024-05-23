import React from "react";
import {useEffect, useState} from 'react';
import {View, ScrollView, StyleSheet, Text, SafeAreaView} from 'react-native';
import { useWindowDimensions } from "react-native";
import SurveyRepository from "../../api/repositories/surveyRepository";
import { TabView, SceneMap } from 'react-native-tab-view';
import {SurveyAnalyticsDTO} from "../../dto/surveyAnalyticsDto";
import SurveyService from "../../services/surveyService";
import VotingScreen from "./votingScreen"
import SurveyDetailsScreen from "./surveyDetailsScreen";

// type VotingScreenProps = {
//     surveyData: any,
//     setSurveyData: React.Dispatch<any>
// }

// type SurveyDetailsScreenProps = {
//     surveyData: any,
//     setSurveyData: React.Dispatch<any>,
//     surveyDetails: SurveyAnalyticsDTO|undefined,
//     setSurveyDetails:  React.Dispatch<React.SetStateAction<SurveyAnalyticsDTO | undefined>>
// }


// type DecisionFieldProps = {
//     text: string,
//     decisionId: string
// }

// const DecisionField = (props: DecisionFieldProps) => {
//     return (
//         <Pressable style={styles.decisionField}>
//             <Text style={styles.resetVoicesButtonText}>{props.text}</Text>
//         </Pressable>
//     )
// }


// const VotingScreen = (props: VotingScreenProps) => {

//     const surveyRepository =  new SurveyRepository();
//     const [decisions, setDecisions] = useState<React.JSX.Element[]>();

//     useEffect(() => {
//         console.log('VotingScreen useEffect');
//         let decisionArray: React.JSX.Element[] = [];
        
//         if(props.surveyData && props.surveyData.decisions) {
//             props.surveyData.decisions.forEach((decision: any) => {
//                 decisionArray.push(<DecisionField text={decision.content} decisionId={decision.id} key={decision.id}/>);
//             });

//             setDecisions(decisionArray);
//         }
//     }, [props.surveyData]);

//     return (
//         <SafeAreaView style={styles.mainContainer}>
//         <ScrollView contentContainerStyle={styles.mainContainer}>
//             <View>
//                 <View style={styles.blockSection}>
//                     <Text style={styles.titleText}>{ props.surveyData ? props.surveyData.title : 'Заголовок опроса' }</Text>
//                 </View>

//                 <View style={styles.blockSection}>
//                     <Text style={styles.descryptionText}>{ props.surveyData ? props.surveyData.content : 'SurveyContent' }</Text>
//                 </View>
//             </View>

//             <View style={styles.blockSection}>
//                 {decisions?.map(el => { return el})}
//             </View>

//             <View style={styles.blockSection}>
//                 <Pressable style={styles.resetVoicesButton}>
//                     <Text style={styles.resetVoicesButtonText}>Сбросить голоса</Text>
//                 </Pressable>
//             </View>

//         </ScrollView>
//         </SafeAreaView>
//     )
// }

// type decisionAnalyticsFieldProps = {
//     decisionAnalytics: DecisionDTO
// }

// const DecisionAnalyticsField = (props: decisionAnalyticsFieldProps) => {
//     return (
//         <View style={styles.decisionAnalyticsField}>
//             <Text style={{fontWeight:'500', fontSize: 15}}>{props.decisionAnalytics.content}</Text>
//             <View style={styles.statisticsSection}>
//                 <View style={styles.statisticsSectionContent}>
//                     <Text>Голоса</Text>
//                     <Text style={{color: 'green'}}>{props.decisionAnalytics.voteCount}</Text>
//                 </View>

//                 <View style={styles.statisticsSectionContent}>
//                     <Text>Доля</Text>
//                     <Text style={{color: 'green'}}>{props.decisionAnalytics.precentage + '%'}</Text>
//                 </View>
//             </View>
//         </View>
//     )
// }

// type ParticipantListItemProps = {
//     username: string;
// }

// const ParticipantListItem = (props: ParticipantListItemProps) => {
//     return (
//         <Text style={styles.participantListItem}>{props.username}</Text>
//     )
// }

// const SurveyDetailsScreen = (props: SurveyDetailsScreenProps) => {

//     const [decisions, setDecisions] = useState<React.JSX.Element[]>();

//     useEffect(() => {
//         console.log('SurveyDetailsScreen useEffect');
//         if(props.surveyDetails && props.surveyDetails.decisions) {
//             let decisionAnalyticsFieldArray: Array<React.JSX.Element> = [];
//             let i = 0;

//             props.surveyDetails.decisions.forEach(decision => {
//                 decisionAnalyticsFieldArray.push(<DecisionAnalyticsField key={i} decisionAnalytics={decision} />);
//                 i++;
//             });

//             setDecisions(decisionAnalyticsFieldArray);
//         }
//     }, [props.surveyDetails])
    
//     return (
//         <SafeAreaView style={styles.mainContainer}>
//             <ScrollView contentContainerStyle={{...styles.mainContainer, justifyContent: 'flex-start'}}>
//                 <View style={styles.blockSection}>
//                     <View style={styles.sectionTitleContainer}>
//                         <Text style={{fontWeight: "500", fontSize: 16}}>Создатель опроса</Text>
//                     </View>
//                     <View style={styles.creatorTextWrapper}>
//                         <Text style={styles.creatorText}>{props.surveyDetails?.creator.username}</Text>
//                         <Text style={styles.creatorText}>
//                             {props.surveyDetails?.creator.bio ? props.surveyDetails?.creator.username : '*Обычно здесь информация о пользователе ^-^'}
//                         </Text>
//                     </View>
//                 </View>

//                 <View style={styles.blockSection}>
//                     <View style={styles.sectionTitleContainer}>
//                         <Text style={{fontWeight: "500", fontSize: 16}}>Аналитика</Text>
//                     </View>
//                     <View style={styles.analyticsContainer}>
//                         <View style={styles.analyticsItems}>
//                             <Text>Голоса</Text>
//                             <Text style={{color: 'green'}}>{props.surveyDetails?.voteCount}</Text>
//                         </View>

//                         <View style={styles.analyticsItems}>
//                             <Text>Статус</Text>
//                             <Text style={{color: 'green'}}>Активен</Text>
//                         </View>
//                     </View>
//                 </View>

//                 <View style={styles.blockSection}>
//                     <View style={styles.sectionTitleContainer}>
//                         <Text style={{fontSize: 16, fontWeight: '500'}}>Решения</Text>
//                     </View>

//                     {decisions?.map(el => el)}
//                 </View>

//                 <View style={styles.blockSection}>
//                     <View style={styles.sectionTitleContainer}>
//                         <Text style={{fontSize: 16, fontWeight: '500'}}>Участники опроса</Text>
//                     </View>
//                     <View style={styles.participantList}> 
//                         {
//                             props.surveyDetails?.participants.map((participant, i) => [<ParticipantListItem key={i}  username={participant} />])
//                         }
//                     </View>
//                 </View>
//             </ScrollView>
//         </SafeAreaView>    
//     )
// }

const SurveyScreen = () => {
    
    const surveyRepository =  new SurveyRepository();
    const surveyService: SurveyService = new SurveyService(surveyRepository);

    const [isVoted, setIsVoted] = useState<boolean>();

    const [surveyData, setSurveyData] = useState<any>({});
    const [surveyDetails, setSurveyDetails] = useState<SurveyAnalyticsDTO|undefined>(undefined);

    const layout = useWindowDimensions();

    const renderScene = ({ route  }) => {
        switch (route.key) {
          case 'first':
            return <VotingScreen surveyData={surveyData} setSurveyData={setSurveyData} isVoted={isVoted}/>;
          case 'second':
            return <SurveyDetailsScreen surveyData={surveyData} setSurveyData={setSurveyData} surveyDetails={surveyDetails} setSurveyDetails={setSurveyDetails}/>;
          default:
            return null;
        }
      };

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'first', title: 'Голосовать' },
        { key: 'second', title: 'Детали опроса' },
    ]);

    useEffect(() => {
        surveyRepository.getSurvey('1|876GjJRxTrUMsCM0WbLlq2hmR7aKD8FVCWidBTy0d2613700', '663cbe4b2be151.28212116')
        .then((response) => {
            setSurveyData(response.data);
            setSurveyDetails(surveyService.explore(response.data));
        })
        .catch((error) => {
            console.log(error);
            setSurveyData(undefined);
        });

        surveyRepository.isVoted('1|876GjJRxTrUMsCM0WbLlq2hmR7aKD8FVCWidBTy0d2613700', '663cbe4b2be151.28212116')
        .then((response) => {
            const data: any = response.data;
            
            if(data && data.response_status === 'success' && data.data) {
                setIsVoted(data.data.is_paricipated);
            }
        });
    }, []);

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