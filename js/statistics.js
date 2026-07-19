const moneySpendBlock = document.querySelector(".money-wrapper");
const moneySpendSpan = moneySpendBlock.querySelector(".spend-money");

const countExpensesBlock = document.querySelector(".count-expenses");
const countExpensesValue = countExpensesBlock.querySelector(".count-number");

function updateAllExpenses(expensesArray) {
    const totalExpenses = expensesArray.reduce( (acc, object) => {
        return acc + object.cost;
    }, 0);
    
    moneySpendSpan.textContent = `${totalExpenses.toLocaleString("ru-RU")} ₽`;
}

function updateCountExpenses(expensesArray) {
    countExpensesValue.textContent = expensesArray.length;
}

export function updateStatistics(expensesArray) {
    updateAllExpenses(expensesArray);
    updateCountExpenses(expensesArray);
}