import api from "./api";

export const createTopUp = async ({ amount, note, payment_method_id }) => {
  try {
    const response = await api.post("/wallet/top-up", {
      amount,
      note,
      payment_method_id,
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
        "Top up failed",
    };
  }
};
