import { useState } from 'react';
import { Button, FlatList, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [modalVisible, setModalVisible] = useState(false)
  const [courseGoals, setCourseGoals] = useState([]);

  function onAddGoal(enteredGoalText) {
    if (enteredGoalText.length <= 0) return;
    setCourseGoals(prev => [...prev, { text: enteredGoalText, id: Math.random().toString() }])
    hideAddGoalModal(false)
  }

  function deleteHandler(id) {
    setCourseGoals(currGoals => {
      return currGoals.filter(goal => goal.id !== id)
    })
  }

  function showAddGoalModal() {
    setModalVisible(true)
  }

  function hideAddGoalModal() {
    setModalVisible(false)
  }

  return (
    <>
    <StatusBar style='light'/>
      <View style={styles.appContainer}>
        <Button title='Add new goal' color='#5eoacc'
          onPress={showAddGoalModal} color='#c361e4' />
        {modalVisible && <GoalInput onAddGoal={onAddGoal}
          onCancelModal={hideAddGoalModal} />}

        <View style={styles.goalContainer}>
          <FlatList data={courseGoals} renderItem={itemData => {
            return <GoalItem id={itemData.item.id} text={itemData.item.text} onDelete={deleteHandler} />
          }} alwaysBounceVertical={false} keyExtractor={(item, i) => {
            return item.id;
          }} />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
    backgroundColor: '#1e085a',
  },

  goalContainer: {
    flex: 4
  },
});
