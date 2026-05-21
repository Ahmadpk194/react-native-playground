import { Text } from "react-native"
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput"
import { useContext } from "react"
import { ExpensesContext } from "../store/expenses-context"
import { getDateMinusDays } from "../utils/date";

function RecentExpenses() {
  const expensesCtx = useContext(ExpensesContext);

  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    const expenseDate = new Date(expense.date);

    return  (expenseDate >= date7DaysAgo) && (expenseDate < today);
  })

  return (
    <ExpensesOutput expenses={recentExpenses} expensesPeriod="Last 7 days" fallbackText="No Expense for last 7 days." />
  )
}

export default RecentExpenses
