import { createApiClient } from "@/lib/api";
import {
  type UndefinedInitialDataOptions,
  useQuery,
} from "@tanstack/react-query";
import { useCallback, useEffect } from "react";
import { toast } from "sonner";
import { AxiosError } from "axios";

export interface IFetchOptions<T>
  extends Omit<UndefinedInitialDataOptions, "queryKey" | "select"> {
  params?: unknown;
  useAuth?: boolean;
  baseUrl?: string;
  onSuccess?: (data: T) => void;
  hideToast?: "none" | "success" | "error" | "all";
  successMessage?: string;
  errorMessage?: string;
  onError?: (error: Error) => void;
  select?: (data: unknown) => T;
}

export const useFetch = <T>(url: string, options: IFetchOptions<T> = {}) => {
  const {
    params,
    useAuth = true,
    baseUrl,
    onSuccess,
    successMessage,
    errorMessage,
    onError,
    select,
    hideToast = "none",
    ...others
  } = options;
  const { client } = createApiClient({ useAuth, baseUrl });
  const queryFn = useCallback(async () => {
    return await client.get<string, T>(url, { params });
  }, [client, params, url]);
  const normalizedUrl = url.replace(/\/+$/, "");
  const query = useQuery({
    queryKey: [normalizedUrl, params, useAuth],
    queryFn,
    select,
    ...others,
  });

  useEffect(() => {
    if (query.isSuccess && !query.isLoading) {
      if (!["success", "all"].includes(hideToast))
        toast.success(
          successMessage ?? (query.data as { message: string })?.message
        );
      onSuccess?.(query.data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.data, query.isLoading, query.isSuccess]);

  useEffect(() => {
    if (query.isError && !query.isLoading) {
      const error = query.error as AxiosError<{
        message: string;
        error: string;
        statusCode: number;
      }>;
      const axiosError = error?.response?.data?.message;
      const axiosErrorMessage = errorMessage ?? axiosError ?? "An error occurred";
      if (!["error", "all"].includes(hideToast)) toast.error(axiosErrorMessage);
      onError?.(query.error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.data, query.isLoading, query.isError]);

  return { ...query };
};
