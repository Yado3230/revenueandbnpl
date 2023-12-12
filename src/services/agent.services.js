import axios from "axios";
const agentUrl = process.env.REACT_APP_API_SPRING_URLS;

const getAllAgents = async (id) => {
  return await axios.get(agentUrl + `get`).then((response) => {
    return response.data.allDevices;
  });
};
const addAgents = async (firstname, lastname, email, password) => {
  return await axios
    .post(agentUrl + `register`, {
      firstname,
      lastname,
      email,
      password,
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};

const addManager = async (
  fname,
  lname,
  email_address,
  phone,
  manager_id,
  user_id
) => {
  let phone_number = "0" + phone;
  return await axios
    .post(agentUrl + `api/manager/register`, {
      fname,
      lname,
      email_address,
      phone_number,
      manager_id,
      user_id,
    })
    .then((response) => {
      const manager = jwt(response.data.token);
      const password = response.data.defaultPassword;
      return [
        { phone_number: manager.manager.phone_number, password: password },
        response.status,
      ];
    })
    .catch((err) => {
      if (err.response) {
        return [err.response.data, err.response.status];
      } else if (err.request) {
        return err.request;
      }
    });
};

const getAllManager = async (id) => {
  return await axios
    .get(agentUrl + `api/user/${id}/manager`)
    .then((response) => {
      return response.data;
    });
};

const createNedajEntries = async (nedaj_type, amount_in_litre, prices, id) => {
  return await axios
    .post(
      agentUrl + `api/agent/create`,
      {
        nedaj_type,
        amount_in_litre,
        prices,
        id,
      },
      { withCredentials: true, credentials: "include" }
    )
    .then((response) => {
      return [response.data, response.status];
    })
    .catch((err) => {
      if (err.response) {
        return [err.response.data, err.response.status];
      } else if (err.request) {
        return err.request;
      }
    });
};
const createNedajPrices = async (nedaj_type, prices, id) => {
  return await axios
    .post(
      agentUrl + `api/user/${id}/configration`,
      {
        nedaj_type,
        prices,
        id,
      },
      { withCredentials: true, credentials: "include" }
    )
    .then((response) => {
      return [response.data, response.status];
    })
    .catch((err) => {
      if (err.response) {
        return [err.response.data, err.response.status];
      } else if (err.request) {
        return err.request;
      }
    });
};
const getNedajPrices = async (id) => {
  return await axios
    .get(agentUrl + `api/user/${id}/configration`, {
      withCredentials: true,
      credentials: "include",
    })
    .then((response) => {
      return response.data.entries;
    })
    .catch((err) => {
      if (err.response) {
        return [err.response.data, err.response.status];
      } else if (err.request) {
        return err.request;
      }
    });
};

const login = async (phone_number, password) => {
  const response = await axios.post(
    process.env.REACT_APP_API_NODE_URLS + "api/agent/login",
    {
      phone_number,
      password,
    },
    { withCredentials: true, credentials: "include" }
  );
  if (response.data.token) {
    const user = jwt(response.data.token);
    localStorage.setItem("user", JSON.stringify(user));
    return user;
  }
};

const getTotalAmount = async (id) => {
  return await axios
    .get(agentSpringUrl + `totalAmountByMerchantId/${id}`)
    .then((response) => {
      return response.data.TotalAmountByMerchantIdResponse;
    })
    .catch((err) => {
      if (err.response) {
        return [err.response.data, err.response.status];
      } else if (err.request) {
        return err.request;
      }
    });
};
const getDailyTotalAmount = async (id) => {
  return await axios
    .get(agentSpringUrl + `currentTotalAmountByMerchantId/${id}`)
    .then((response) => {
      return response.data.CurrentTotalAmountResponse;
    })
    .catch((err) => {
      if (err.response) {
        return [err.response.data, err.response.status];
      } else if (err.request) {
        return err.request;
      }
    });
};

const createNedajStation = async (
  station_name,
  location,
  manager_id,
  user_id
) => {
  return await axios
    .post(agentUrl + `api/user/station/create`, {
      station_name,
      location,
      manager_id,
      user_id,
    })
    .then((response) => {
      return [response.data, response.status];
    })
    .catch((err) => {
      if (err.response) {
        return [err.response.data, err.response.status];
      } else if (err.request) {
        return err.request;
      }
    });
};
const getNedajStation = async (id, role) => {
  return await axios
    .get(agentUrl + `api/user/${id}/station`, { params: { role: role } })
    .then((response) => {
      return [response.data, response.status];
    })
    .catch((err) => {
      if (err.response) {
        return [err.response.data, err.response.status];
      } else if (err.request) {
        return err.request;
      }
    });
};

const AgentServices = {
  getAllAgents,
  addAgents,
  login,
  createNedajEntries,
  createNedajPrices,
  getNedajPrices,
  getTotalAmount,
  getDailyTotalAmount,
  createNedajStation,
  getNedajStation,
  addManager,
  getAllManager,
};

export default AgentServices;
