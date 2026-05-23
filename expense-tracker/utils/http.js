import axios from "axios";

const BACKEND_URL = 'https://react-native-expense-tra-9647e-default-rtdb.asia-southeast1.firebasedatabase.appa';

export async function storeExpense(expenseData) {
    const response = await axios.post(BACKEND_URL + '/expenses.json', expenseData);

    const id = response.data.name;
    return id;
}

export async function fetchExpenses() {
    const result = await axios.get(BACKEND_URL + '/expenses.json');
    const expenses = [];

    for (const key in result.data) {
        const expense = {
            id: key,
            amount: result.data[key].amount,
            date: new Date(result.data[key].date),
            description: result.data[key].description
        }
        expenses.push(expense)
    }

    return expenses;
};


export function updateExpense(id, expenseData) {
    return axios.put(BACKEND_URL + `/expenses/${id}.json`, expenseData);
}

export function deleteExpense(id) {
    return axios.delete(BACKEND_URL + `/expenses/${id}.json`)
}
