import { useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseTable, { ExpenseObject } from "./components/ExpenseTable";
import CategoryFilter from "./components/CategoryFilter";
import { Expenses } from "./constants";

function App() {
  const [expenses, setExpenses] = useState<ExpenseObject[]>(Expenses);
  const [filterValue, setFilterValue] = useState("All");

  const getExpenses = () => {
    if (filterValue !== "All")
      return expenses.filter((expense) => expense.category === filterValue);
    return expenses;
  };

  return (
    <>
      <ExpenseForm updateExpense={setExpenses} expenses={expenses} />
      <CategoryFilter setFilterValue={setFilterValue} />
      <ExpenseTable expenses={getExpenses()} updateExpense={setExpenses} />
    </>
  );
}

export default App;
