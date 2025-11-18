import { useCallback, useMemo, useRef } from "react";
import { Button } from "@/components/ui/button";
import { LucideDownload, LucidePencil, LucideUpload } from "lucide-react";

export type FileTemplateUploaderProps = {
  downloadHref?: string;
  downloadLabel?: string;
  uploadLabel?: string;
  editLabel?: string;
  accept?: string;
  value?: File | null;
  onChange?: (file: File | null) => void;
};

export default function FileTemplateUploader({
  downloadHref,
  downloadLabel = "Download Tax Form",
  uploadLabel = "Upload Tax Form",
  editLabel = "Edit File",
  accept,
  value,
  onChange,
}: FileTemplateUploaderProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handlePick = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const fileName = useMemo(() => value?.name ?? "", [value]);

  return (
    <div className="flex items-center gap-4">
      <Button
        asChild
        size="lg"
        className="w-[200px] bg-[#11AE16] hover:bg-[#118A53] text-white"
      >
        <a href={downloadHref ?? "#"} download className="text-sm">
          <LucideDownload />
          {downloadLabel}
        </a>
      </Button>

      {value == null ? (
        <Button
          variant="outline"
          size="lg"
          onClick={handlePick}
          className="w-[182px] border-[#8B8B8B] text-[#EDEDED]"
        >
          <LucideUpload color="#000000" />
          <span className="text-sm text-[#000000]">{uploadLabel}</span>
        </Button>
      ) : (
        <div className="flex items-center gap-3">
          <span className="font-medium text-[#5D5EBA]">{fileName}</span>

          <Button
            variant="outline"
            size="lg"
            onClick={handlePick}
            className="w-32 border-[#5D5EBA] text-[#5D5EBA] text-sm"
          >
            <LucidePencil />
            {editLabel}
          </Button>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0] ?? null;
          onChange?.(file);
        }}
      />
    </div>
  );
}
