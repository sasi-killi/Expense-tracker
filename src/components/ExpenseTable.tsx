import { useState } from "react";
import CategoryFilter from "./CategoryFilter";
import { Props } from "./ExpenseForm";

export interface ExpenseObject {
  id: number;
  description?: string;
  amount: number;
  category: string;
}

function ExpenseTable({ expenses, updateExpense }: Props) {
  const [filterValue, setFilterValue] = useState("All");
  const handleDelete = (id: number) => {
    updateExpense(expenses.filter((expense) => expense.id !== id));
  };

  const filterExpenses = () => {
    if (filterValue !== "All")
      return expenses.filter((expense) => expense.category === filterValue);
    return expenses;
  };

  const displayExpenses = filterExpenses();

  const total = displayExpenses.reduce((acc, item) => {
    return acc + item.amount;
  }, 0);

  return (
    <>
      <CategoryFilter setFilterValue={setFilterValue} />
      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th scope="col">Description</th>
            <th scope="col">Amount</th>
            <th scope="col">Category</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {displayExpenses.map((expense) => (
            <tr key={expense.id}>
              <td>{expense.description}</td>
              <td>${expense.amount}</td>
              <td>{expense.category}</td>
              <td>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => handleDelete(expense.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        {Boolean(total) && (
          <tfoot>
            <tr>
              <td>Total</td>
              <td>${total.toFixed(2)}</td>
              <td> </td>
              <td> </td>
            </tr>
          </tfoot>
        )}
      </table>
    </>
  );
}

export default ExpenseTable;
