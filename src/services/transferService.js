import api from "./api";

export const createTransfer = async ({ receiver_id, amount, note, pin }) => {
  try {
    const response = await api.post("/wallet/transfer", {
      receiver_id,
      amount,
      note,
      pin,
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
        "Transfer failed",
    };
  }
};
