import { Image, StyleSheet, Text, View } from "react-native"
import Title from "../components/ui/Title"
import Colors from "../constants/colors";
import PrimaryButton from "../components/ui/PrimaryButton";

function GameOverScreen({roundsNumber, userNumber, onStartNewGame}) {


    return (
        <View style={styles.rootContainer}>
            <Title> GAME OVER! </Title>
            <View style={styles.imageContainer}>
                <Image source={require('../assets/images/success.png')} style={styles.image} />
            </View>
            <Text style={styles.summraryText}>
                Your phone needed <Text style={styles.highlight}>{roundsNumber}</Text> rounds to guess the number <Text style={styles.highlight}>{userNumber}</Text>.
            </Text>
            <PrimaryButton onPress={onStartNewGame}>Start New Game</PrimaryButton>
        </View>
    )
}

export default GameOverScreen;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        padding: 20,
        justifyContent:'center',
        alignItems: 'center'
    },
    imageContainer: {
        borderRadius: 150,
        width: 300,
        height: 300,
        borderWidth: 3,
        borderColor: Colors.primary500,
        overflow: 'hidden',
        margin: 36
    },
    image: {
        width: '100%',
        height: '100%'
    }, 
    summraryText: {
        fontFamily: 'open-sans',
        fontSize: 24,
        textAlign: 'center',
        color: 'white',
        marginBottom: 12
    },
    highlight: {
        fontFamily: 'open-sans-bold',
        color: Colors.primary500
    }
})
