const formProduct = document.querySelector(".add-expense");
const inputNameProduct = formProduct.querySelector("#name");
const inputCostProduct = formProduct.querySelector("#cost");
const selectCategoryProduct = formProduct.querySelector("#category");

const expensesList = document.querySelector(".expenses-list");

const moneySpendBlock = document.querySelector(".money-wrapper");
const moneySpendSpan = moneySpendBlock.querySelector(".spend-money");

const countExpensesBlock = document.querySelector(".count-expenses");
const countExpensesValue = countExpensesBlock.querySelector(".count-number");

const categoryNames = {
    food: "Еда",
    transport: "Транспорт",
    entertainment: "Развлечения",
    shopping: "Покупки",
    health: "Здоровье",
    other: "Другое",
};

const months = ["января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря"
];

const expenses = [];

function createExpenseCard(dataObject) {
    const li = document.createElement("li");
    const icon = document.createElement("span");
    const expenseName = document.createElement("p");
    const expenseCategory = document.createElement("p");
    const cost = document.createElement("span");
    const expenseDate = document.createElement("p");
    const deleteButton = document.createElement("button");

    li.classList.add("expense-item");
    icon.classList.add("expense-icon");
    expenseName.classList.add("expense-name");
    expenseCategory.classList.add("expense-category");
    cost.classList.add("expense-cost");
    expenseDate.classList.add("expense-date");
    deleteButton.classList.add("expense-delete");

    expenseName.textContent = dataObject.name;

    cost.textContent = `${dataObject.cost.toLocaleString("ru-RU")} ₽`;

    const selectedCategory = categoryNames[dataObject.category];

    expenseCategory.textContent = selectedCategory;

    expenseDate.textContent = dataObject.date;

    deleteButton.type = "button";
    deleteButton.textContent = "X";

    li.dataset.expenseId = dataObject.id;
    li.append(icon, expenseName, expenseCategory, cost, expenseDate, deleteButton);

    return li;
}

function updateAllExpenses() {
    const totalExpenses = expenses.reduce( (acc, object) => {
        return acc + object.cost;
    }, 0);
    
    moneySpendSpan.textContent = `${totalExpenses.toLocaleString("ru-RU")} ₽`;
}

function updateCountExpenses() {
    countExpensesValue.textContent = expenses.length;
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

function updateStatistics() {
    updateAllExpenses();
    updateCountExpenses();
}

formProduct.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const currentExpense = createExpense();

    if (!currentExpense) return;

    expenses.push(currentExpense);

    const currentCard = createExpenseCard(currentExpense);

    if (!currentCard) return;

    expensesList.append(currentCard);

    formProduct.reset();

    updateStatistics();
});

expensesList.addEventListener('click', (evt) => {
    const deleteButton = evt.target.closest(".expense-delete");

    if (!deleteButton) return;

    const currentCard = deleteButton.closest(".expense-item");
    const cardId = Number(currentCard.dataset.expenseId);
    const expenseIndex = expenses.findIndex( object => {
        return object.id === cardId;
    });

    if (exspenseIndex === -1) return;

    currentCard.remove();

    expenses.splice(exspenseIndex, 1);

    updateStatistics();
});

updateStatistics()