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

export const createPin = async (pin) => {
  try {
    const response = await api.post("/user/create-pin", { pin });

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

export const changePin = async ({ currentPin, newPin }) => {
  try {
    const response = await api.put("/user/update-pin", {
      current_pin: currentPin,
      new_pin: newPin,
    });

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
        "Failed change PIN",
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

export const changePassword = async ({ currentPassword, newPassword }) => {
  try {
    const response = await api.put("/user/password", {
      current_password: currentPassword,
      new_password: newPassword,
    });

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
        "Failed change password",
      status: error.response?.status,
    };
  }
};

export const updateProfile = async ({ name, phone_number, profile_picture }) => {
  try {
    const formData = new FormData();

    if (name && name.trim() !== "") {
      formData.append("name", name.trim());
    }
    if (phone_number && phone_number.trim() !== "") {
      formData.append("phone_number", phone_number.trim());
    }
    if (profile_picture) {
      formData.append("profile_picture", profile_picture);
    }

    const response = await api.patch("/user/profile", formData);

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
        "Failed update profile",
      status: error.response?.status,
    };
  }
};
