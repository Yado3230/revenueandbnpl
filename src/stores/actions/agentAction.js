import {
  ADD_AGENT,
  ADD_AGENT_ERROR,
  GET_AGENT,
  GET_AGENT_ERROR,
  CREATE_NEDAJ_ENTRIES,
  CREATE_NEDAJ_ENTRIES_ERROR,
  CREATE_NEDAJ_PRICES,
  CREATE_NEDAJ_PRICES_ERROR,
  GET_NEDAJ_PRICES,
  GET_NEDAJ_PRICES_ERROR,
  GET_TOTAL_AMOUNT,
  GET_TOTAL_AMOUNT_ERROR,
  GET_DAILY_TOTAL_AMOUNT,
  GET_DAILY_TOTAL_AMOUNT_ERROR,
  CREATE_NEDAJ_STATION,
  CREATE_NEDAJ_STATION_ERROR,
  GET_NEDAJ_STATION,
  GET_NEDAJ_STATION_ERROR,
  CREATE_MANAGER,
  CREATE_MANAGER_ERROR,
  GET_MANAGER,
  GET_MANAGER_ERROR


} from "../types";
// import AuthService from "../../services/auth.service";

import AgentServices from "../../services/agent.services";
export const addAgent =
  ({ firstName, lastName, email, phoneNumber,manager_id,user_id ,station_id, role,interpretResponse }) =>
  async (dispatch) => {
    try {
      const addedAgent = await AgentServices.addAgents(
        firstName,
        lastName,
        email,
        phoneNumber,
        station_id,
        manager_id,
        user_id,
        role
      );

      if (addedAgent[1] == "200") {
        interpretResponse({
          password: addedAgent[0].password,
          email:addedAgent[0].email,
          response: "success",
          responseCode: addedAgent[1],
        });
      } else if (addedAgent[1] == "403") {
        interpretResponse({
          message: addedAgent[0].message,
          response: "error",
          responseCode: addedAgent[1],
        });
      } else {
        // dispatch(satResponse("error"));
        interpretResponse({ response: "error" });
      }
      dispatch(getAgent(manager_id, role));
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
export const addManager =
  ({ firstName, lastName, email, phoneNumber,manager_id,user_id, interpretResponse }) =>
  async (dispatch) => {
    try {
      const addedManager = await AgentServices.addManager(
        firstName,
        lastName,
        email,
        phoneNumber,
        manager_id,
        user_id,
        

      );

      if (addedManager[1] == "200") {
        
        interpretResponse({
          password: addedManager[0].password,
          email:addedManager[0].email,
          response: "success",
          responseCode: addedManager[1],
        });
      } else if (addedManager[1] == "403") {
        interpretResponse({
          message: addedManager[0].message,
          response: "error",
          responseCode: addedManager[1],
        });
      } else {
        // dispatch(satResponse("error"));
        interpretResponse({ response: "error" });
      }


      dispatch(getManager(user_id));
      dispatch({
        type: CREATE_MANAGER,
        payload: addedManager,
      });
    } catch (error) {
      dispatch({
        type: CREATE_MANAGER_ERROR,
        payload: error,
      });
    }
  };
export const createNewEntries =
  ({ nedaj_type, amount_in_litre, prices,id }) =>
  async (dispatch) => {
    try {
      const new_entries = await AgentServices.createNedajEntries(
        nedaj_type,
        amount_in_litre,
        prices,
        id

      );
      // dispatch(getAgent(id));
      dispatch({
        type: CREATE_NEDAJ_ENTRIES,
        payload: new_entries,
      });
    } catch (error) {
      dispatch({
        type: CREATE_NEDAJ_ENTRIES_ERROR,
        payload: error,
      });
    }
  };
export const createNedajPrices =
  ({ nedaj_type, prices,id }) =>
  async (dispatch) => {
    try {
      const new_prices = await AgentServices.createNedajPrices(
        nedaj_type,
        prices,
        id
      );
      dispatch(getNedajPrices(id));
      dispatch({
        type: CREATE_NEDAJ_PRICES,
        payload: new_prices,
      });
    } catch (error) {
      dispatch({
        type: CREATE_NEDAJ_PRICES_ERROR,
        payload: error,
      });
    }
  };
export const getNedajPrices =
  (id ) =>
  async (dispatch) => {
    try {  
      const new_prices = await AgentServices.getNedajPrices(
        id
      );
      dispatch({
        type: GET_NEDAJ_PRICES,
        payload: new_prices,
      });
    } catch (error) {
      dispatch({
        type: GET_NEDAJ_PRICES_ERROR,
        payload: error,
      });
    }
  };

export const getAgent = (id, role) => async (dispatch) => {
  try {
    const agents = await AgentServices.getAllAgents(id, role);
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

export const getManager = (id) => async (dispatch) => {
  try {
    const managers = await AgentServices.getAllManager(id);
    dispatch({
      type: GET_MANAGER,
      payload: managers,
    });
  } catch (error) {
    dispatch({
      type: GET_MANAGER_ERROR,
      payload: error,
    });
  }
};

export const getTotalAmount =
  (id ) =>
  async (dispatch) => {
    try {  
      
      const totalAmount = await AgentServices.getTotalAmount(
        id
      );
      // dispatch(getAgent(id));
      dispatch({
        type: GET_TOTAL_AMOUNT,
        payload: totalAmount.totalAmount,
      });
    } catch (error) {
      dispatch({
        type: GET_TOTAL_AMOUNT_ERROR,
        payload: error,
      });
    }
  };

export const getDailyTotalAmount =
  (id ) =>
  async (dispatch) => {
    try {  
      
      const dailyTotalAmount = await AgentServices.getDailyTotalAmount(
        id
      );
      // dispatch(getAgent(id));
      dispatch({
        type: GET_DAILY_TOTAL_AMOUNT,
        payload: dailyTotalAmount.totalAmount,
      });
    } catch (error) {
      dispatch({
        type: GET_DAILY_TOTAL_AMOUNT_ERROR,
        payload: error,
      });
    }
  };

  export const createNedajStation =
  (station_name, location,manager_id, role, id ) =>
  async (dispatch) => {
    try {
      const nedaj_station = await AgentServices.createNedajStation(
        station_name,
        location,
        manager_id,
        id
      );
      dispatch({
        type: CREATE_NEDAJ_STATION,
        payload: nedaj_station[0],
      });
      dispatch(getNedajStation(id, role));
    } catch (error) {
      dispatch({
        type: CREATE_NEDAJ_STATION_ERROR,
        payload: error,
      });
    }
  };

  export const getNedajStation =
  ( id,role ) =>
  async (dispatch) => {
    try {
      const nedaj_stations = await AgentServices.getNedajStation(
        id,role
      );
      dispatch({
        type: GET_NEDAJ_STATION,
        payload: nedaj_stations[0],
      });
    } catch (error) {
      dispatch({
        type: GET_NEDAJ_STATION_ERROR,
        payload: error,
      });
    }
  };