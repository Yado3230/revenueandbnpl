import { SET_EXPENSES } from "../types";
// import AuthService from "../../services/auth.service";

import ExpenseService from "../../services/expense.service";
export const getAllMerchantExpenses = () => async (dispatch) => {
  try {
    const expenseData = await ExpenseService.getAllExpenses();
    dispatch({
      type: SET_EXPENSES,
      payload: expenseData,
    });
  } catch (error) {
    return error;
  }
};
