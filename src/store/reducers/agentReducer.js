import {
  ADD_AGENT,
  ADD_AGENT_ERROR,
  GET_AGENT,
  GET_AGENT_ERROR,
} from "../types";

const initialState = {
  agents: [],
  addedagent: {},
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_AGENT:
      return {
        ...state,
        addedagent: action.payload,
        loading: false,
      };
    case GET_AGENT:
      return {
        ...state,
        agents: action.payload,
        loading: false,
      };
    case ADD_AGENT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case GET_AGENT_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
