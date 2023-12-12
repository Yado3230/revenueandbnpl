import {
  ADD_DOMAIN,
  ADD_DOMAIN_ERROR,
  GET_DOMAIN,
  GET_DOMAIN_ERROR,
  SUCCESS_RESPONSE_SETTER,
  ERROR_RESPONSE_SETTER,
} from "../types";
import AuthService from "../../services/auth.service";
import DomainServices from "../../services/domain.services";
// import BankAccountServices from "../../services/bank-account.services";

export const addDomain =
  ({ user_id, name, url, interpretResponse }) =>
  async (dispatch) => {
    try {
      const addedUrls = await DomainServices.addUrls(user_id, name, url);
      if (addedUrls[1] === 200) {
        interpretResponse({
          response: "success",
          responseCode: addedUrls[1],
        });
      } else if (addedUrls[1] === 403) {
        interpretResponse({
          message: addedUrls[0].message,
          response: "error",
          responseCode: addedUrls[1],
        });
      } else if (addedUrls[1] === 401) {
        interpretResponse({
          message: addedUrls[0].message,
          response: "error",
          responseCode: addedUrls[1],
        });
      } else {
        interpretResponse({ response: "error" });
      }
      dispatch(getDomain(user_id));
      dispatch({
        type: ADD_DOMAIN,
        payload: addedUrls[0],
      });
    } catch (error) {
      dispatch({
        type: ADD_DOMAIN_ERROR,
        payload: error,
      });
    }
  };
export const getDomain = (id) => async (dispatch) => {
  try {
    const getBank = await DomainServices.getDomain(id);
    dispatch({
      type: GET_DOMAIN,
      payload: getBank,
    });
  } catch (error) {
    dispatch({
      type: GET_DOMAIN_ERROR,
      payload: error,
    });
  }
};
export const satResponse = (response) => async (dispatch) => {
  if (response === "success") {
    dispatch({
      type: SUCCESS_RESPONSE_SETTER,
      payload: response,
    });
  } else {
    dispatch({
      type: ERROR_RESPONSE_SETTER,
      payload: response,
    });
  }
};
