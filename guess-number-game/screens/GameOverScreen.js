import { Dimensions, Image, ScrollView, StyleSheet, Text, useWindowDimensions, View } from "react-native"
import Title from "../components/ui/Title"
import Colors from "../constants/colors";
import PrimaryButton from "../components/ui/PrimaryButton";

function GameOverScreen({ roundsNumber, userNumber, onStartNewGame }) {

    const { width, height } = useWindowDimensions();

    let imageSize = 300;
    if (width < 380) {
        imageSize = 300;
    };

    if (height < 400) {
        imageSize = 100
    };

    const imageStyle = {
        width: imageSize,
        height: imageSize,
        borderRadius: imageSize / 2,
        borderWidth: 3,
        borderColor: Colors.primary500,
    }

    return (
        <ScrollView style={{flex: 1}}>
            <View style={styles.rootContainer}>
                <Title> GAME OVER! </Title>
                <View style={styles.imageContainer}>
                    <Image source={require('../assets/images/success.png')} style={[styles.image, imageStyle]} />
                </View>
                <Text style={styles.summraryText}>
                    Your phone needed <Text style={styles.highlight}>{roundsNumber}</Text> rounds to guess the number <Text style={styles.highlight}>{userNumber}</Text>.
                </Text>
                <PrimaryButton onPress={onStartNewGame}>Start New Game</PrimaryButton>
            </View>
        </ScrollView>
    )
}

export default GameOverScreen;

// const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer: {
        // borderRadius: 150,
        // width: deviceWidth < 380 ? 150 : 300,
        // height: deviceWidth < 380 ? 150 : 300,
        // borderWidth: 3,
        // borderColor: Colors.primary500,
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
