import FileTemplateUploader from "@/components/ui/file-template-uploader";
import clsx from "clsx";

const MultipleFilling = ({
  uploadedFile,
  setUploadedFile,
}: {
  uploadedFile: File | null;
  setUploadedFile: (file: File | null) => void;
}) => {
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
        downloadHref="#"
        value={uploadedFile}
        onChange={setUploadedFile}
        accept=".csv,.xlsx,.docx,.doc,.pdf"
      />
    </div>
  );
};

export default MultipleFilling;
