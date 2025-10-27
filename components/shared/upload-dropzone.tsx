"use client";

import { Upload, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useState } from "react";
import { type Accept, useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { cn, keyRandomizer } from "@/lib/utils";

export type UploadDropzoneProps = {
  multiple?: boolean;
  acceptedTypes: Accept;
  value?: File | File[];
  onChange?: (files: File[]) => void;
  showAction?: boolean;
};

export const UploadDropzone = ({
  multiple = false,
  acceptedTypes,
  value,
  onChange,
  showAction = false,
}: UploadDropzoneProps) => {
  const [files, setFiles] = useState<File[]>(
    Array.isArray(value) ? value : value ? [value] : [],
  );

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles = multiple ? [...files, ...acceptedFiles] : acceptedFiles;
      setFiles(newFiles);
      onChange?.(newFiles);
    },
    [files, onChange, multiple],
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
    <div className="rounded-xl text-white">
      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={cn(
          "cursor-pointer rounded-lg border-2 border-dashed p-10 text-center transition-colors duration-200",
          "border-muted-foreground/50 hover:bg-muted/40 dark:hover:bg-muted/20",
          isDragActive
            ? "border-primary bg-muted dark:bg-muted/20"
            : "bg-transparent",
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center">
          <Image
            src="/cuate.svg"
            alt="Upload illustration"
            width={120}
            height={120}
            className="mb-4 opacity-80"
          />
          <p className="text-lg font-medium">Drop or select files</p>
          <p className="text-sm text-gray-400">
            Drag files here, or
            <span className="text-primary ml-1 underline">browse</span> your
            device.
          </p>
        </div>
      </div>

      {/* Preview */}
      {files.length > 0 && (
        <div className="mt-6 flex flex-wrap items-start gap-3">
          {files.map((file) => (
            <div
              key={keyRandomizer(
                `${file.name}-${file.size}-${file.lastModified}`,
              )}
              className="relative h-20 w-20 overflow-hidden rounded-lg"
            >
              <Image
                src={URL.createObjectURL(file)}
                alt={file.name}
                fill
                className="object-cover"
              />
              <Button
                type="button"
                onClick={() => removeFile(file)}
                className="absolute top-1 right-1 cursor-pointer rounded-full bg-black/60 p-1 hover:bg-black/80"
              >
                <X className="h-3 w-3 text-white" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {files.length > 0 && showAction && (
        <div className="mt-6 flex justify-end gap-2">
          <Button variant="outline" onClick={removeAll}>
            Remove All
          </Button>
          <Button onClick={() => alert("Upload logic here")}>
            <Upload className="mr-2 h-4 w-4" /> Upload
          </Button>
        </div>
      )}
    </div>
  );
};
