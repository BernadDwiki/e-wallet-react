import api from "./api";

export const registerUser = async (data) => {
  try {
    const response = await api.post("/auth/register", data);

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message ||
        error.message ||
        "Something went wrong",
      status: error.response?.status,
    };
  }
};

export const loginUser = async (data) => {
  try {
    const response = await api.post("/auth/login", data);

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message ||
        error.message ||
        "Something went wrong",
      status: error.response?.status,
    };
  }
};

export const logoutUser = async () => {
  try {
    const response = await api.delete("/auth/logout");

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Logout failed",
      status: error.response?.status,
    };
  }
};

export const setPin = async (pin) => {
  try {
    const response = await api.post("/user/set-pin", { pin });

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Something went wrong",
      status: error.response?.status,
    };
  }
};

export const getProfile = async () => {
  try {
    const response = await api.get("/user/profile");

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Failed get profile",
      status: error.response?.status,
    };
  }
};
