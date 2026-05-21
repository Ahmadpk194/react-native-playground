import { useContext, useLayoutEffect } from "react";
import { View } from "react-native";
import { Text } from "react-native"
import IconButton from "../components/ui/IconButton";
import { GlobalStyles } from "../constants/styles";
import { StyleSheet } from "react-native";
import Button from "../components/ui/Button";
import { ExpensesContext } from "../store/expenses-context";

function ManageExpense({ route, navigation }) {
  const expensesCtx = useContext(ExpensesContext)

  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense'
    })
  }, [isEditing, navigation]);

  function deleteExpenseHandler() {
    expensesCtx.deleteExpense(editedExpenseId)
    navigation.goBack();
  }

  function cancelHandler() {
    navigation.goBack();
  }

  function confirmHandler() {
    if (isEditing) {
      expensesCtx.updateExpense(editedExpenseId, { description: 'Test!!!', amount: 9.99, date: new Date('2026-05-20') });
    } else {
      expensesCtx.addExpense({ description: 'Test!!!', amount: 9.99, date: new Date('2026-05-20') })
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        <Button style={styles.button} mode={'flat'} onPress={cancelHandler}>Cancel</Button>
        <Button style={styles.button} onPress={confirmHandler}>{isEditing ? 'Update' : 'Add'}</Button>
      </View>

      {isEditing && <View style={styles.deleteContainer}>
        <IconButton icon={'trash'} color={GlobalStyles.colors.error500} size={36} onPress={deleteExpenseHandler} />
      </View>}
    </View>
  )
}

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8
  },
  deleteContainer: {
    margin: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center'
  }
})
