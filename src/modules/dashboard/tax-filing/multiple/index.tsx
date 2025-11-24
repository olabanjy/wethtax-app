import FileTemplateUploader from "@/components/ui/file-template-uploader";
import clsx from "clsx";
import { useSearchQuery } from "@/hooks/use-search-query";
import { useFetch } from "@/hooks/use-fetch";

const MultipleFilling = ({
  uploadedFile,
  setUploadedFile,
  templateEndpoint,
  templateParams,
  accept = ".csv",
}: {
  uploadedFile: File | null;
  setUploadedFile: (file: File | null) => void;
  templateEndpoint?: string;
  templateParams?: Record<string, string | number>;
  accept?: string;
}) => {
  const { params } = useSearchQuery();
  const monthParam = (params.get("month") || "").toString().toUpperCase();
  const yearParam = Number(params.get("year") || new Date().getFullYear());

  const endpoint =
    templateEndpoint ??
    "/returns/company/monthly-returns/monthly-payee/template/";

  const computedParams =
    templateParams ??
    ({ year: yearParam, month: monthParam } as Record<string, string | number>);

  const { data } = useFetch<{ file: string }>(endpoint, {
    params: computedParams,
    hideToast: "all",
    retry: 1,
    enabled: Boolean(endpoint),
  });

  return (
    <div
      className={clsx(
        "w-full py-6 border-y border-[#B8B8B8]",
        "flex flex-col gap-6"
      )}
    >
      <p className="text-[#2A2A2A]">
        Get the returns template below for multiple entries
      </p>

      <FileTemplateUploader
        downloadHref={data?.file || "#"}
        value={uploadedFile}
        onChange={setUploadedFile}
        accept={accept}
      />
    </div>
  );
};

export default MultipleFilling;
