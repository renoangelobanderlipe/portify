"use client";

import { Upload, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useState } from "react";
import { type Accept, useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";

type UploadDropzoneProps = {
  multiple?: boolean;
  acceptedTypes: Accept;
  onChange?: (files: File[]) => void;
};

export const UploadDropzone = ({
  multiple = false,
  acceptedTypes,
  onChange,
}: UploadDropzoneProps) => {
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles = [...files, ...acceptedFiles];
      setFiles(newFiles);
      onChange?.(newFiles);
    },
    [files, onChange],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedTypes as Accept,
    multiple,
  });

  const removeFile = (file: File) => {
    const newFiles = files.filter((f) => f !== file);
    setFiles(newFiles);
    onChange?.(newFiles);
  };

  const removeAll = () => {
    setFiles([]);
    onChange?.([]);
  };

  return (
    <div className="rounded-xl text-white shadow-md">
      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={`rounded-lg border-2 border-dashed border-gray-600 p-10 text-center transition ${
          isDragActive
            ? "border-primary bg-gray-800"
            : "cursor-pointer hover:bg-gray-800"
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center">
          <Image
            src="/upload-illustration.svg"
            alt="Upload illustration"
            width={120}
            height={120}
            className="mb-4 opacity-80"
          />
          <p className="text-lg font-medium">Drop or select files</p>
          <p className="text-sm text-gray-400">
            Drag files here, or{" "}
            <span className="text-primary underline">browse</span> your device.
          </p>
        </div>
      </div>

      {/* Preview */}
      {files.length > 0 && (
        <div className="mt-6 grid grid-cols-[repeat(auto-fit,minmax(80px,1fr))] gap-3">
          {files.map((file) => (
            <div
              key={file.name}
              className="relative h-20 w-20 overflow-hidden rounded-lg border border-gray-700"
            >
              <Image
                src={URL.createObjectURL(file)}
                alt={file.name}
                fill
                className="object-cover"
              />
              <Button
                onClick={() => removeFile(file)}
                className="absolute top-1 right-1 rounded-full bg-black/60 p-1 hover:bg-black/80"
              >
                <X className="h-3 w-3 text-white" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {files.length > 0 && (
        <div className="mt-6 flex justify-end gap-2">
          <Button
            variant="outline"
            onClick={removeAll}
            disabled={files.length === 0}
          >
            Remove All
          </Button>
          <Button
            onClick={() => alert("Upload logic here")}
            disabled={files.length === 0}
          >
            <Upload className="mr-2 h-4 w-4" /> Upload
          </Button>
        </div>
      )}
    </div>
  );
};
