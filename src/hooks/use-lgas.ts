import { useMemo } from "react";
import { useFetch } from "@/hooks/use-fetch";
import type { SelectOption } from "@/components/ui/select";

type LgaItem = {
  id: number;
  name: string;
  icode?: string;
  is_active?: boolean;
};

export const useLgas = (stateId?: string) => {
  const { data, isLoading, isError } = useFetch<LgaItem[]>(
    stateId ? `/location/countries/${stateId}/lgas/` : "",
    {
      hideToast: "all",
      retry: 1,
      enabled: Boolean(stateId),
      select: (d) => {
        const arr = (d as any)?.results ?? d;
        return Array.isArray(arr) ? (arr as LgaItem[]) : [];
      },
    }
  );

  const options: SelectOption[] = useMemo(() => {
    return (data ?? [])
      .filter((l) => l && l.name)
      .map((l) => ({ label: l.name, value: String(l.id) }));
  }, [data]);

  return {
    options,
    isLoading,
    isError,
    raw: data ?? [],
  };
};


