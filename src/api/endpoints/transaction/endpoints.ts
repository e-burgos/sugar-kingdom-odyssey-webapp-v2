export const transactionPost = (responseType?: number) => {
  return {
    endpoint: `/api/Transaction`,
    method: "GET",
    responseType,
  };
};
