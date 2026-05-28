import { useState } from "react"
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native"
import { COLORS } from "../../constants/colors";
import ImagePicker from "./ImagePicker";

function PlaceForm() {
  const [enteredTitle, setEnteredTitle] = useState('');

  function changeTitleHandler(enteredText) {
    setEnteredTitle(enteredText)
  }

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.lable}>Title</Text>
        <TextInput style={styles.input} onChangeText={changeTitleHandler} value={enteredTitle} />
      </View>
      <ImagePicker />
    </ScrollView>
  )
}

export default PlaceForm;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24
  },
  lable: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: COLORS.primary500,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: COLORS.primary700,
    borderBottomWidth: 2,
    backgroundColor: COLORS.primary100
  }
})
