import { useState } from 'react';
import { Button, Image, Modal, StyleSheet, TextInput, View } from 'react-native'

const GoalInput = ({ onAddGoal, showModal, onCancelModal }) => {
  const [enteredGoalText, setEnteredGoalText] = useState('');

  function goalInputHandler(enteredText) {
    setEnteredGoalText(enteredText)
  }


  function addGoalHandler() {
    onAddGoal(enteredGoalText)
    setEnteredGoalText('')
  }


  return (
    <Modal visible={showModal} animationType='slide'>
      <View style={styles.inputContainer}>
        <Image source={require('../assets/images/goal.png')} style={styles.image} />
        <TextInput placeholder='Your course goal!' style={styles.textInput} value={enteredGoalText} onChangeText={goalInputHandler} />
        <View style={styles.buttonsContainer}>
          <View style={styles.button}>
            <Button title='Add Goal' onPress={addGoalHandler} color={'#ae7dee'} />
          </View>
          <View style={styles.button}>
            <Button title='Cancel' onPress={onCancelModal} color={'red'} />
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default GoalInput


const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16, 
    backgroundColor: '#311b6b'
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    width: '100%',
    padding: 8,
    borderRadius: 6,
    padding: 16,
    backgroundColor: '#bfa1e9',
  },
  image: {
    width: 100,
    height: 100,
    margin: 20
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 8
  },
  button:{
    marginHorizontal: 8
  }
});