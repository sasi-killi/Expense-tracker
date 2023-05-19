import { useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseTable, { ExpenseObject } from "./components/ExpenseTable";
import { Expenses } from "./constants";

function App() {
  const [expenses, setExpenses] = useState<ExpenseObject[]>(Expenses);

  return (
    <>
      <ExpenseForm updateExpense={setExpenses} expenses={expenses} />
      <ExpenseTable expenses={expenses} updateExpense={setExpenses} />
    </>
  );
}

export default App;
