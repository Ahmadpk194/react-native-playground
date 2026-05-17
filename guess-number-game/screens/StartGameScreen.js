import { Alert, Dimensions, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, useWindowDimensions, View } from "react-native"
import PrimaryButton from "../components/ui/PrimaryButton"
import { useState } from "react"
import Colors from "../constants/colors";
import Title from "../components/ui/Title";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";


function StartGameScreen({ onPickNumber }) {
    const [enteredNumber, setEneteredNumber] = useState('');

    const { width, height } = useWindowDimensions();

    function numberInputHandler(enterdText) {
        setEneteredNumber(enterdText)
    }

    function resetInputHandler() {
        setEneteredNumber('')
    }

    function confirmInputHandler() {
        const chosenNumber = parseInt(enteredNumber);

        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            // show alert
            Alert.alert('Invalid number', 'Number has to be a number between 1 and 99',
                [{ text: 'Okay', style: 'destructive', onPress: resetInputHandler }]
            )

        }

        onPickNumber(chosenNumber)
    }

    return (
        <ScrollView>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior="position">
                <View style={[styles.rootContainer]}>
                    <Title style={{ width: '80%', marginHorizontal: 'auto' }}>Guess my Number</Title>
                    <Card>
                        <InstructionText>Enter a number</InstructionText>
                        <TextInput style={styles.numberInput} maxLength={2}
                            keyboardType='number-pad' autoCapitalize="none"
                            autoCorrect={false} onChangeText={numberInputHandler}
                            value={enteredNumber} />

                        <View style={styles.buttonContainer}>
                            <View style={styles.button}>
                                <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
                            </View>
                            <View style={styles.button}>
                                <PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton>
                            </View>
                        </View>
                    </Card>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    )
}

export default StartGameScreen;

const deviceWidth = Dimensions.get('window').height;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        marginTop: deviceWidth < 380 ? 80 : 50,
        // alignItems: 'center'
    },
    instructionText: {
        color: Colors.accent,
        fontSize: 24,
        textAlign: 'center'
    },
    inputContainer: {
        backgroundColor: Colors.primary500,
        padding: 16,
        marginTop: 36,
        marginHorizontal: 24,
        borderRadius: 8,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 6 },
        shadowRadius: 6,
        shadowOpacity: 0.25,
    },
    numberInput: {
        height: 50,
        width: 55,
        fontSize: 32,
        borderBottomColor: Colors.accent,
        borderBottomWidth: 2,
        color: Colors.accent,
        marginVertical: 8,
        fontWeight: 'bold',
        textAlign: 'center',
        marginHorizontal: 'auto'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 4
    },
    button: {
        flex: 1
    }
})