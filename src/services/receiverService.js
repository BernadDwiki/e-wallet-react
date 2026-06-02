import api from "./api";

export const getReceivers = async ({
  search = "",
  page = 1,
  limit = 5,
}) => {
  try {
    const response = await api.get(
      "/user/receivers",
      {
        params: {
          search,
          page,
          limit,
        },
      }
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
        "Failed fetch receivers",
    };
  }
};
