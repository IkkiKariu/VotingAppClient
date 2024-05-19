import React from "react";
import {useEffect, useState} from 'react';
import {View, ScrollView, StyleSheet, Text, SafeAreaView} from 'react-native';
import { Pressable } from "react-native";

type DecisionFieldProps = {
    text: string
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

    const [decisions, setDecisions] = useState<React.JSX.Element[]>();

    useEffect(() => {
        let decisionArray: React.JSX.Element[] = [];

        for(let i = 1; i < 4; i++) {
            decisionArray.push(<DecisionField text={"Вариант " + i} key={i}/>)
        }

        setDecisions(decisionArray);

    }, [])

    return (
        <SafeAreaView style={styles.mainContainer}>
        <ScrollView>
            <View>
                <View style={styles.blockSection}>
                    <Text style={styles.titleText}>Заголовок опроса</Text>
                </View>

                <View style={styles.blockSection}>
                    <Text style={styles.descryptionText}>
                        Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. 
                        Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. 
                        В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов,
                        используя Lorem Ipsum для распечатки образцов.
                    </Text>
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