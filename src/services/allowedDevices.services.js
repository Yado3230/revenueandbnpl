import { NODE_API } from "../utils/API";
const getAllRegisteredDevices = async (id) => {
  return await NODE_API.get(`/device/all?user_id=${id}`).then((response) => {
    return response.data.allDevices;
  });
};
const getAllDevices = async () => {
  return await NODE_API.get(`/device/allDevices`).then((response) => {
    return response.data;
  });
};

const RegisteredDeviceServices = {
  getAllRegisteredDevices,
  getAllDevices,
};

export default RegisteredDeviceServices;
