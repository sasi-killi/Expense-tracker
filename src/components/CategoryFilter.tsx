import { Dispatch, SetStateAction } from "react";

interface Props {
  setFilterValue: Dispatch<SetStateAction<string>>;
}

function CategoryFilter({ setFilterValue }: Props) {
  return (
    <select
      id="category"
      className="form-select mt-5"
      aria-label="Default select example"
      onChange={(e) => setFilterValue(e.target.value)}
    >
      <option value="All">All categories</option>
      <option value="groceries">Groceries</option>
      <option value="utilities">Utilities</option>
      <option value="entertainment">Entertainment</option>
    </select>
  );
}

export default CategoryFilter;
