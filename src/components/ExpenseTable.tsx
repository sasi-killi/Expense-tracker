import { Props } from "./ExpenseForm";

export interface ExpenseObject {
  id: number;
  description?: string;
  amount: number;
  category: string;
}

function ExpenseTable({ expenses, updateExpense }: Props) {
  const handleDelete = (id: number) => {
    updateExpense(expenses.filter((expense) => expense.id !== id));
  };

  const total = expenses.reduce((acc, item) => {
    return acc + item.amount;
  }, 0);

  return (
    <>
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
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td>{expense.description}</td>
              <td>{expense.amount}</td>
              <td>{expense.category}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(expense.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {Boolean(total) && (
            <tr>
              <td>Total</td>
              <td>{total}</td>
              <td> </td>
              <td> </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}

export default ExpenseTable;
