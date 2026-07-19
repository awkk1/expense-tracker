export function saveExpenses(expensesArray) {
    const arrayJSON = JSON.stringify(expensesArray);
    localStorage.setItem("expenses", arrayJSON);
}

export function loadExpenses(expensesArray) {
    const savedExpenses = JSON.parse(localStorage.getItem("expenses"));

    if (savedExpenses === null) return;

    expensesArray.push(...savedExpenses);
}