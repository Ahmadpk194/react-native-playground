import { Pressable, StyleSheet, Text } from 'react-native';

const GoalItem = ({ id,text, onDelete }) => {

  return (
    <Pressable onPress={() => onDelete(id)} style={({pressed}) => {
      return pressed && styles.pressedItem;
    }}>
      <Text style={styles.goalItem}>
        {text}
      </Text>
    </Pressable>
  );
};

export default GoalItem;

const styles = StyleSheet.create({
  goalItem: {
    margin: 8,
    borderRadius: 6,
    backgroundColor: '#5e0acc',
    padding: 8,
    color: 'white',
  },
  pressedItem: {
    color: 'white',
    opacity: 0.5
  }
});