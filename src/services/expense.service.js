import { NODE_API } from "../utils/API";

const registerExpense = async (data, setUpdated, updated) => {
  return await NODE_API.post("/rb/expense/register", data).then((response) => {
    setUpdated(!updated);
    return response.data;
  });
};

const getAllExpenses = async () => {
  return await NODE_API.get("/rb/expense/getExpenses").then(
    (response) => response.data
  );
};

const ExpenseService = {
  registerExpense,
  getAllExpenses,
};

export default ExpenseService;
