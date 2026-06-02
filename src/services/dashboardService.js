import api from "./api";

export const getDashboardInfo = async () => {
  try {
    const response = await api.get(
      "/wallet/dashboard"
    );

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Failed get dashboard",
      status: error.response?.status,
    };
  }
};
