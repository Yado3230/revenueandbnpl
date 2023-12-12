import {
  ADD_AGENT,
  ADD_AGENT_ERROR,
  GET_AGENT,
  GET_AGENT_ERROR,
} from "../types";
// import AuthService from "../../services/auth.service";

import AgentServices from "../../services/agent.services";
export const addAgent =
  ({ firstName, lastName, email, phoneNumber, interpretResponse }) =>
  async (dispatch) => {
    try {
      // const user = AuthService.getCurrentUser();
      const addedAgent = await AgentServices.addAgents(
        firstName,
        lastName,
        email,
        phoneNumber
      );

      if (addedAgent[1] === "200") {
        // dispatch(satResponse("success"));
        interpretResponse({
          message: addedAgent[0].message,
          response: "success",
          responseCode: addedAgent[1],
        });
      } else if (addedAgent[1] === "403") {
        interpretResponse({
          message: addedAgent[0].message,
          response: "error",
          responseCode: addedAgent[1],
        });
      } else {
        // dispatch(satResponse("error"));
        interpretResponse({ response: "error" });
      }

      dispatch({
        type: ADD_AGENT,
        payload: addedAgent,
      });
    } catch (error) {
      dispatch({
        type: ADD_AGENT_ERROR,
        payload: error,
      });
    }
  };

export const getAgent = () => async (dispatch) => {
  try {
    const agents = await AgentServices.getAllAgents();
    dispatch({
      type: GET_AGENT,
      payload: agents,
    });
  } catch (error) {
    dispatch({
      type: GET_AGENT_ERROR,
      payload: error,
    });
  }
};
