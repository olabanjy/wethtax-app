import { useSearchParams } from "react-router-dom";

export const useSearchQuery = () => {
  const [params, setParams] = useSearchParams();

  const onSetParams = (query: Record<string, string | number>) => {
    setParams((prev) => {
      Object.entries(query).forEach(([key, value]) => {
        prev.set(key, value.toString());
      });
      return prev;
    });
  };

  return {
    params,
    onSetParams,
    setParams,
  };
};
