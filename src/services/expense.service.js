import { NODE_API } from "../utils/API";

const registerExpense = async (data, setUpdated, updated) => {
  return await NODE_API.post("/rb/expense/register", data).then((response) => {
    setUpdated(!updated);
    return response.data;
  });
};
const editExpense = async (data, setUpdated, updated) => {
  console.log(data);
  return await NODE_API.post(
    `/rb/expense/update?expense_id=${data?.expense_id}`,
    data
  ).then((response) => {
    setUpdated(!updated);
    return response.data;
  });
};

const getAllExpenses = async () => {
  return await NODE_API.get("/rb/expense/getExpense").then(
    (response) => response.data
  );
};

const ExpenseService = {
  registerExpense,
  editExpense,
  getAllExpenses,
};

export default ExpenseService;
