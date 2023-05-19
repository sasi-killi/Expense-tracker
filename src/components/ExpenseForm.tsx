import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useState } from "react";
import { ExpenseObject } from "./ExpenseTable";

const formData = z.object({
  description: z
    .string()
    .min(3, { message: "Description should be of atleast 3 characters" }),
  amount: z.number({ invalid_type_error: "Amount is required" }),
  category: z.string().nonempty("Category is required"),
});

const requiredSchema = formData.required({
  amount: true,
  category: true,
});

type FormData = z.infer<typeof requiredSchema>;

export interface Props {
  updateExpense: Dispatch<SetStateAction<ExpenseObject[]>>;
  expenses: ExpenseObject[];
}

function ExpenseForm({ updateExpense, expenses }: Props) {
  const [lastId, setLastId] = useState(expenses[expenses.length - 1]?.id ?? 0);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(requiredSchema) });

  const recordExpense = (data: FormData) => {
    const expense = { ...data, id: lastId + 1 };
    setLastId(lastId + 1);
    updateExpense([...expenses, expense]);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(recordExpense)}>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <input
          {...register("description")}
          id="description"
          type="text"
          className="form-control"
        />
        {errors.description && (
          <p className="text-danger">{errors.description.message}</p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="amount" className="form-label">
          Amount
        </label>
        <input
          {...register("amount", { valueAsNumber: true })}
          id="amount"
          type="number"
          className="form-control"
        />
        {errors.amount && (
          <p className="text-danger">{errors.amount.message}</p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="category" className="form-label">
          Category
        </label>
        <select
          {...register("category")}
          id="category"
          className="form-select"
          aria-label="Default select example"
        >
          <option value=""></option>
          <option value="groceries">Groceries</option>
          <option value="utilities">Utilities</option>
          <option value="entertainment">Entertainment</option>
        </select>
        {errors.category && (
          <p className="text-danger">{errors.category.message}</p>
        )}
      </div>
      <button className="btn btn-primary" type="submit">
        Submit
      </button>
    </form>
  );
}

export default ExpenseForm;
