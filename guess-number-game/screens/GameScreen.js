import { Alert, FlatList, StyleSheet, Text, View } from "react-native"
import Title from "../components/ui/Title";
import { useEffect, useState } from "react";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import { Ionicons } from "@expo/vector-icons";
import GuessLogItem from "../components/game/GuessLogItem";

function generateRandomBetween(min, max, exclude) {
    const rndNum = Math.floor(Math.random() * (max - min)) + min;

    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }
}

let minBoundary = 1;
let maxBoundary = 100;

const GameScreen = ({ userNumber, onGameOver }) => {
    const initialGuess = generateRandomBetween(1, 100, userNumber);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [guessRounds, setGuessRounds] = useState([initialGuess])

    useEffect(() => {
        if (currentGuess === userNumber) {
            onGameOver(guessRounds.length)
        }
    }, [currentGuess, userNumber, onGameOver]);

    useEffect(() => {
        minBoundary = 1;
        maxBoundary = 100
    }, [])

    function nextGuesHandler(direction) {    // direction => 'lower','greater'
        if ((direction === 'lower' && currentGuess < userNumber) ||
            (direction === 'greater' && currentGuess > userNumber)) {
            Alert.alert("Don't lie!", 'You know this is wrong...',
                [{ text: 'Sorry!', style: 'cancel' }]);
            return;
        }
        if (direction === 'lower') {
            maxBoundary = currentGuess;
        } else {
            minBoundary = currentGuess + 1;
        }

        const newRndNumber = generateRandomBetween(minBoundary, maxBoundary, currentGuess)
        setCurrentGuess(newRndNumber)
        setGuessRounds(prev => [newRndNumber, ...prev])
    }

    const guressRoundListLength = guessRounds.length;


    return (
        <View style={styles.screen}>
            <Title style={styles.title}>Opponent's Guess</Title>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card>
                <InstructionText style={{ marginBottom: 20 }}>Higher or lower</InstructionText>
                <View style={styles.buttonsContainer}>
                    <View style={styles.button}>
                        <PrimaryButton onPress={() => nextGuesHandler('greater')}>
                            <Ionicons name="add" size={24} color="white" />
                        </PrimaryButton>
                    </View>
                    <View style={styles.button}>
                        <PrimaryButton onPress={() => nextGuesHandler('lower')}>
                            <Ionicons name="remove" size={24} color="white" />
                        </PrimaryButton>
                    </View>
                </View>
            </Card>


            <View style={styles.listContainer}>
                {/* {
                    guessRounds.map((round, i) => <Text key={round}>{round}</Text>)
                } */}
                <FlatList data={guessRounds} renderItem={
                    (data) => <GuessLogItem roundNumber={guressRoundListLength - data.index} guess={data.item} />
                } keyExtractor={(item) => item} />
            </View>
        </View>
    )
}

export default GameScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 12,
    },
    buttonsContainer: {
        flexDirection: 'row',
        gap: 4
    },
    button: {
        flex: 1
    },
    listContainer: {
        flex: 1,
        paddingBottom: 16
    }

})
