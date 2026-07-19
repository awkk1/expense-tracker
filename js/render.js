import { createExpenseCard } from "./expense.js";

const findExpenseForm = document.querySelector(".find-expense");
const inputFindExpense = findExpenseForm.querySelector(".find");
const selectFindExpense = findExpenseForm.querySelector(".sort-expense");
const expensesList = document.querySelector(".expenses-list");

function renderExpenses(dataArray) {
    expensesList.innerHTML = "";

    dataArray.forEach( expense => {
        const card = createExpenseCard(expense);
        expensesList.append(card);
    });
}

function filterArray(array) {
    const inputFindValue = inputFindExpense.value.trim().toLowerCase();

    const filteredArray = array.filter((expense) => {
        const expenseLower = expense.name.toLowerCase();
        return expenseLower.includes(inputFindValue);
    });

    return filteredArray;
}

function sortExpense(array) {
    const selectValue = selectFindExpense.value;

    if (selectValue === "new") {
        array.sort((a, b) => b.id - a.id);
    } else {
        array.sort((a, b) => a.id - b.id);
    }
}

export function updateExpensesList(expenses) {
    const currentArray = filterArray(expenses);
    sortExpense(currentArray);
    renderExpenses(currentArray);
}