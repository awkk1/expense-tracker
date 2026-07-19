import { categoryNames, months } from "./data.js";
import { saveExpenses, loadExpenses } from "./storage.js";
import { updateStatistics } from "./statistics.js";

const formProduct = document.querySelector(".add-expense");
const inputNameProduct = formProduct.querySelector("#name");
const inputCostProduct = formProduct.querySelector("#cost");
const selectCategoryProduct = formProduct.querySelector("#category");

const expensesList = document.querySelector(".expenses-list");

const findExpenseForm = document.querySelector(".find-expense");
const inputFindExpense = findExpenseForm.querySelector(".find");
const selectFindExpense = findExpenseForm.querySelector(".sort-expense");

const expenses = [];

function createExpenseCard(dataObject) {
    const { id, name, cost, category, date } = dataObject;

    const expenseItem = document.createElement("li");
    const icon = document.createElement("span");
    const expenseName = document.createElement("p");
    const expenseCategory = document.createElement("p");
    const costSpan = document.createElement("span");
    const expenseDate = document.createElement("p");
    const deleteButton = document.createElement("button");

    expenseItem.classList.add("expense-item");
    icon.classList.add(
        "expense-icon",
        `expense-icon--${category}`    
    );
    expenseName.classList.add("expense-name");
    expenseCategory.classList.add("expense-category");
    costSpan.classList.add("expense-cost");
    expenseDate.classList.add("expense-date");
    deleteButton.classList.add("expense-delete");

    expenseName.textContent = name;

    costSpan.textContent = `${cost.toLocaleString("ru-RU")} ₽`;

    const selectedCategory = categoryNames[category];

    expenseCategory.textContent = selectedCategory;

    expenseDate.textContent = date;

    deleteButton.type = "button";
    deleteButton.textContent = "X";

    expenseItem.dataset.expenseId = id;
    expenseItem.append(icon, expenseName, expenseCategory, costSpan, expenseDate, deleteButton);

    return expenseItem;
}

function createExpense() {
    const nameValue = inputNameProduct.value.trim();
    const costValue = Number(inputCostProduct.value);

    if (nameValue === "") return;
    if (costValue <= 0) return;

    const categoryValue = selectCategoryProduct.value;
    const id = Date.now();

    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = months[currentDate.getMonth()];
    const year = currentDate.getFullYear();

    const date = `${day} ${month} ${year}`;

    return {
        id: id,
        name: nameValue,
        cost: costValue,
        category: categoryValue,
        date: date
    };
}

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

function updateExpensesList() {
    const currentArray = filterArray(expenses);
    sortExpense(currentArray);
    renderExpenses(currentArray);
}

formProduct.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const currentExpense = createExpense();
    if (!currentExpense) return;
    expenses.push(currentExpense);

    formProduct.reset();

    saveExpenses(expenses);
    updateExpensesList();
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
    updateExpensesList();
    updateStatistics(expenses);
});

inputFindExpense.addEventListener('input', () => {
    updateExpensesList();
});

selectFindExpense.addEventListener('change', () => {
    updateExpensesList();
});

loadExpenses(expenses);
updateExpensesList();
updateStatistics(expenses);