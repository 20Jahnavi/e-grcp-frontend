import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://dummyjson.com",
  timeout: 5000,
});

apiClient.interceptors.request.use(
  (config) => {
    console.log("Request Sent");
    return config;
  }
);

apiClient.interceptors.response.use(
  (response) => {
    console.log("Response Received");
    return response;
  }
);

export default apiClient;