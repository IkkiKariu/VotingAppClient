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
            return <VotingScreen surveyData={surveyData} setSurveyData={setSurveyData} isVoted={isVoted} setIsVoted={setIsVoted} surveyPublicUid={'663cbe4b2be151.28212116'}/>;
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
                setIsVoted(data.data.is_participated);
            }
        });
    }, [isVoted]);

    console.log(`survey is voted: ${typeof(isVoted)}`)
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