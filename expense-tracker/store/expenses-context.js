import { createContext, useReducer } from "react";

const DUMMY_EXPENSES = [
    { id: 'e1', description: 'A pair of chappal', amount: 59.99, date: new Date('2021-12-19') },
    { id: 'e2', description: 'Formal black trousers', amount: 39.99, date: new Date('2022-01-05') },
    { id: 'e3', description: 'JavaScript programming book', amount: 15.99, date: new Date('2022-12-01') },
    { id: 'e4', description: 'Fresh bananas (1 dozen)', amount: 3.49, date: new Date('2026-05-18') },
    { id: 'e5', description: 'Wireless mouse', amount: 12.99, date: new Date('2026-05-20') },
    { id: 'e6', description: 'Notebook set (3 pcs)', amount: 6.99, date: new Date('2022-04-10') },
    { id: 'e7', description: 'Mobile charger cable', amount: 8.5, date: new Date('2022-05-15') },
    { id: 'e8', description: 'School backpack', amount: 22.75, date: new Date('2026-05-21') },
    { id: 'e9', description: 'LED study lamp', amount: 18.25, date: new Date('2022-07-14') },
    { id: 'e10', description: 'Running shoes', amount: 49.99, date: new Date('2022-08-09') }
]


export const ExpensesContext = createContext({
    expenses: [],
    addExpense: ({ description, amount, date }) => { },
    deleteExpense: (id) => { },
    updateExpense: (id, { description, amount, date }) => { },
});

function expensesReducer(state, action) {
    console.log(action)
    switch (action.type) {
        case 'ADD':
            const id = new Date().toString() + Math.random().toString()
            return [{ ...action.payload, id }, ...state]

        case 'UPDATE':
            const updateableExpenseIdx = state.findIndex((expense) => expense.id === action.payload.id);
            const updateableExpense = state[updateableExpenseIdx];
            const updateItem = {...updateableExpense, ...action.payload.data}
            const updatedExpenses = [...state];
            updatedExpenses[updateableExpenseIdx] = updateItem;
            return updatedExpenses;

        case 'DELETE':
            return state.filter(expense => expense.id !== action.payload)

        default:
            return state;
    }
}

function ExpensesContextProvider({ children }) {
    const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

    function addExpense(expenseData) {
        dispatch({ type: 'ADD', payload: expenseData });
    };

    function deleteExpense(id) {
        dispatch({ type: 'DELETE', payload: id })
    }

    function updateExpense(id, expenseData) {
        dispatch({ type: 'UPDATE', payload: { id: id, data: expenseData } })
    }

    const value = {
        expenses: expensesState,
        addExpense: addExpense,
        updateExpense: updateExpense,
        deleteExpense: deleteExpense
    }

    return <ExpensesContext.Provider value={value}>
        {children}
    </ExpensesContext.Provider>
};

export default ExpensesContextProvider;