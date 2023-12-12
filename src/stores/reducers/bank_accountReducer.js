import {
  GET_ACCOUNTS,
  ACCOUNTS_ERROR,
  CREATE_BAK_ACCOUNT,
  SET_PRIMARY,
  NAME_ENQ_BY_ACCNO,
  NAME_ENQ_BY_ACCNO_ERROR,
  GET_ACCOUNTS_BY_PHONE,
  GET_ACCOUNTS_BY_PHONE_ERROR,
} from "../types";

const initialState = {
  bankAccounts: [],
  accounts: [],
  message: "",
  accountMessage: "",
  criteriaValue: "",
  loading: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ACCOUNTS:
      return {
        ...state,
        bankAccounts: action.payload,
        loading: false,
      };

    case CREATE_BAK_ACCOUNT:
      return {
        ...state,
        message: action.payload,
        loading: false,
      };

    case SET_PRIMARY:
      return {
        ...state,
        accountMessage: action.payload,
        loading: false,
      };
    case NAME_ENQ_BY_ACCNO:
      return {
        ...state,
        criteriaValue: action.payload,
        loading: false,
      };
    case GET_ACCOUNTS_BY_PHONE:
      return {
        ...state,
        accounts: action.payload,
        loading: false,
      };
    case ACCOUNTS_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    case NAME_ENQ_BY_ACCNO_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
