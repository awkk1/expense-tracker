import { saveExpenses, loadExpenses } from "./storage.js";
import { updateStatistics } from "./statistics.js";
import { createExpense } from "./expense.js";
import { updateExpensesList } from "./render.js";

const formProduct = document.querySelector(".add-expense");
const inputNameProduct = formProduct.querySelector("#name");
const inputCostProduct = formProduct.querySelector("#cost");
const selectCategoryProduct = formProduct.querySelector("#category");

const expensesList = document.querySelector(".expenses-list");

const findExpenseForm = document.querySelector(".find-expense");
const inputFindExpense = findExpenseForm.querySelector(".find");
const selectFindExpense = findExpenseForm.querySelector(".sort-expense");

const expenses = [];

formProduct.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const nameValue = inputNameProduct.value.trim();
    const costValue = Number(inputCostProduct.value);
    const categoryValue = selectCategoryProduct.value;

    const currentExpense = createExpense(nameValue, costValue, categoryValue);
    if (!currentExpense) return;
    expenses.push(currentExpense);

    formProduct.reset();

    saveExpenses(expenses);
    updateExpensesList(expenses);
    updateStatistics(expenses);
});

expensesList.addEventListener('click', (evt) => {
    const deleteButton = evt.target.closest(".expense-delete");

    if (!deleteButton) return;

    const currentCard = deleteButton.closest(".expense-item");
    const cardId = Number(currentCard.dataset.expenseId);
    const expenseIndex = expenses.findIndex( object => {
        return object.id === cardId;
    });

    if (expenseIndex === -1) return;

    expenses.splice(expenseIndex, 1);

    saveExpenses(expenses);
    updateExpensesList(expenses);
    updateStatistics(expenses);
});

inputFindExpense.addEventListener('input', () => {
    updateExpensesList(expenses);
});

selectFindExpense.addEventListener('change', () => {
    updateExpensesList(expenses);
});

loadExpenses(expenses);
updateExpensesList(expenses);
updateStatistics(expenses);