import { categoryNames, months } from "./data.js";

export function createExpense(nameValue, costValue, categoryValue) {
    if (nameValue === "") return;
    if (costValue <= 0) return;

    const id = Date.now();

    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = months[currentDate.getMonth()];
    const year = currentDate.getFullYear();

    const date = `${day} ${month} ${year}`;

    return {
        id,
        name: nameValue,
        cost: costValue,
        category: categoryValue,
        date
    };
}

export function createExpenseCard(dataObject) {
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