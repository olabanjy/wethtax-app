import { useMemo } from "react";
import { useFetch } from "@/hooks/use-fetch";
import type { SelectOption } from "@/components/ui/select";

type StateItem = {
  id: number;
  name: string;
  icode?: string;
  is_active?: boolean;
};

export const useStates = () => {
  const { data, isLoading, isError } = useFetch<StateItem[]>(
    "/tenant/lagos/api/v1/location/countries/nigeria/states/",
    {
      hideToast: "all",
      retry: 1,
      select: (d) => {
        // Some backends return { results: [] }, normalize if needed
        const arr = (d as any)?.results ?? d;
        return Array.isArray(arr) ? (arr as StateItem[]) : [];
      },
    }
  );

  const options: SelectOption[] = useMemo(() => {
    return (data ?? [])
      .filter((s) => s && s.name)
      .map((s) => ({ label: s.name, value: String(s.id) }));
  }, [data]);

  return {
    options,
    isLoading,
    isError,
    raw: data ?? [],
  };
};


