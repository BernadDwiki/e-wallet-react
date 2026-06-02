import api from "./api";

export const getTransactionReport = async (days = 7, flow = "both") => {
  try {
    const response = await api.get(
      "/wallet/transaction-report",
      {
        params: {
          days,
          flow,
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
        "Failed get report",
      status: error.response?.status,
    };
  }
};

export const getTransactionHistory = async ({
  page = 1,
  limit = 7,
  search = "",
}) => {
  try {
    const response = await api.get("/wallet/transactions", {
      params: {
        page,
        limit,
        search,
      },
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
        "Failed get transaction history",
    };
  }
};
