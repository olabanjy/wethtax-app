import { PenIcon, UploadIcon } from "lucide-react";

const FileUpload = ({
  value,
  setValue,
}: {
  value: FileList | File | null;
  setValue: (value: FileList | null) => void;
}) => {
  return (
    <div className="flex items-center gap-4">
      {value && (
        <p className="text-indigo-500 font-medium">
          {value instanceof FileList
            ? `${value.length} files selected`
            : value.name}
        </p>
      )}
      <label
        htmlFor="file-upload"
        className="w-full max-w-[13.2rem] h-9 flex items-center gap-2 cursor-pointer justify-center border border-indigo-400 rounded-xl"
      >
        {value ? (
          <>
            <PenIcon color="#3C3E8D" size={13} />
            <span className="text-sm font-medium text-indigo-700">
              Edit File
            </span>
          </>
        ) : (
          <>
            <UploadIcon color="#3C3E8D" size={13} />
            <span className="text-sm font-medium text-indigo-700">
              Choose file to upload
            </span>
          </>
        )}

        <input
          type="file"
          className="hidden"
          id="file-upload"
          onChange={(e) => setValue(e.target.files)}
        />
      </label>
    </div>
  );
};

export default FileUpload;
