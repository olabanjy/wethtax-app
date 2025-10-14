import { useStore } from "@/store";
import axios, { type CreateAxiosDefaults } from "axios";
import { toast } from "sonner";

let isRedirecting = false;

export const createApiClient = (params?: {
  baseUrl?: string;
  useAuth?: boolean;
}) => {
  const { baseUrl, useAuth = true } = params || {};
  const baseURL = baseUrl || (import.meta.env.VITE_API as string);

  const subscription = useStore.subscribe(() => {});

  subscription();

  const { auth } = useStore.getState();

  const config: CreateAxiosDefaults = { baseURL };

  if (useAuth) {
    config["headers"] = {
      ...config?.["headers"],
      Authorization: `Bearer ${auth.token}`,
    };
  }

  const client = axios.create(config);

  client.interceptors.response.use(
    function (response) {
      return response.config.method === "get" ? response.data : response;
    },
    function (error) {
      const status = error.response?.status;
      const message = error.response?.data?.message;

      if (
        status === 401 &&
        !isRedirecting &&
        message === "Your session has expired. Please log in again."
      ) {
        toast.error("Session Expired", {
          description: "Your session has expired. Please log in again.",
        });

        isRedirecting = true;
        setTimeout(() => {
          window.location.href = "/auth/login";
          setTimeout(() => {
            isRedirecting = false;
          }, 1000);
        }, 1500);
      }

      return Promise.reject(error);
    }
  );

  const setBaseURL = (url: string) => {
    client.defaults.baseURL = url;
  };

  return { client, setBaseURL };
};
