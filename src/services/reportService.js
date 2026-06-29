import apiClient from "./apiClient";

export const fetchReports = async () => {

  const response =
    await apiClient.get("/products");

  return response.data;
};