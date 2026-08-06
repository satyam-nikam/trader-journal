"use client";

import NextImage from "next/image";
import { ChangeEvent, DragEvent, useEffect, useRef, useState } from "react";
import { FiImage, FiUploadCloud, FiX } from "react-icons/fi";

const ACCEPTED_MIME_TYPES = ["image/jpeg", "image/png", "image/jpg"];
const ACCEPTED_EXTENSIONS = [".jpg", ".jpeg", ".png"];
const MAX_FILE_SIZE = 2 * 1024 * 1024;
const MAX_DIMENSION = 1000;

function getFileExtension(fileName: string) {
  return fileName.slice(fileName.lastIndexOf(".")).toLowerCase();
}

function isAcceptedFile(file: File) {
  const extension = getFileExtension(file.name);
  return ACCEPTED_MIME_TYPES.includes(file.type) || ACCEPTED_EXTENSIONS.includes(extension);
}

function validateImageFile(file: File) {
  return new Promise<string | null>((resolve) => {
    if (!isAcceptedFile(file)) {
      resolve("Only JPG, JPEG, and PNG images are allowed.");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      resolve("Image size must be 2 MB or less.");
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    const image = new window.Image();

    image.onload = () => {
      URL.revokeObjectURL(imageUrl);
      if (image.width > MAX_DIMENSION || image.height > MAX_DIMENSION) {
        resolve(`Image dimensions must not exceed ${MAX_DIMENSION} × ${MAX_DIMENSION}px.`);
        return;
      }

      resolve(null);
    };

    image.onerror = () => {
      URL.revokeObjectURL(imageUrl);
      resolve("The selected file could not be read as an image.");
    };

    image.src = imageUrl;
  });
}

type ImageUploadProps = {
  label?: string;
  name?: string;
  hint?: string;
  value?: string | File | null;
  onChange?: (file: File | null) => void;
  error?: string;
  disabled?: boolean;
  className?: string;
};

export default function ImageUpload({
  label = "Upload image",
  name,
  hint = "Add a crisp image for your record.",
  value,
  onChange,
  error,
  disabled = false,
  className = "",
}: ImageUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(() => {
    if (typeof value === "string") {
      return value;
    }

    return null;
  });
  const [validationError, setValidationError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (previewUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleFileSelection = async (selectedFile: File | null) => {
    if (!selectedFile) {
      setValidationError(null);
      setPreviewUrl(null);
      onChange?.(null);
      return;
    }

    const fileError = await validateImageFile(selectedFile);
    if (fileError) {
      setValidationError(fileError);
      onChange?.(null);
      return;
    }

    setValidationError(null);
    const nextPreviewUrl = URL.createObjectURL(selectedFile);

    setPreviewUrl((currentPreview) => {
      if (currentPreview?.startsWith("blob:")) {
        URL.revokeObjectURL(currentPreview);
      }
      return nextPreviewUrl;
    });

    onChange?.(selectedFile);
  };

  const handleInputChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] ?? null;
    await handleFileSelection(selectedFile);
    event.target.value = "";
  };

  const handleDrop = async (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(false);

    if (disabled) return;

    const droppedFile = event.dataTransfer.files?.[0] ?? null;
    await handleFileSelection(droppedFile);
  };

  const handleClear = () => {
    if (previewUrl?.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    setValidationError(null);
    onChange?.(null);
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label className="text-[13px] font-semibold uppercase tracking-wider text-slate-700">
        {label}
      </label>

      <div
        onDragOver={(event) => {
          event.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={(event) => {
          event.preventDefault();
          setDragActive(false);
        }}
        onDrop={handleDrop}
        className={`group relative overflow-hidden rounded-2xl border border-dashed p-4 transition-all duration-200 ${
          dragActive
            ? "border-blue-500 bg-blue-50 shadow-sm"
            : "border-slate-500 bg-slate-50/80 hover:border-blue-700 hover:bg-white"
        } ${disabled ? "cursor-not-allowed opacity-70" : "cursor-pointer"}`}
        onClick={() => {
          if (!disabled) inputRef.current?.click();
        }}
      >
        <input
          ref={inputRef}
          type="file"
          name={name}
          accept=".jpg,.jpeg,.png,image/jpeg,image/png"
          className="hidden"
          onChange={handleInputChange}
          disabled={disabled}
        />

        {previewUrl ? (
          <div className="flex items-center gap-3">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              <NextImage src={previewUrl} alt="Preview" width={80} height={80} className="h-full w-full object-cover" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-slate-800">Image ready to use</p>
              <p className="mt-1 text-xs text-slate-500">Tap to replace this image or remove it below.</p>
            </div>
          </div>
        ) : (
          <div className="flex h-20 flex-col items-center justify-center gap-2 py-6 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-blue-600 shadow-sm">
              <FiUploadCloud size={20} />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-800">Drop your image here</p>
              <p className="mt-1 text-xs text-slate-500">or click to browse from your device</p>
            </div>
          </div>
        )}

        {previewUrl && (
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              handleClear();
            }}
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:text-red-500"
            aria-label="Remove image"
          >
            <FiX size={16} />
          </button>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <p className="text-xs text-slate-500">{hint}</p>
        <div className="rounded-lg border border-slate-200 bg-white/70 px-3 py-2 text-[11.5px] leading-5 text-slate-600">
          <div className="flex items-center gap-2 font-medium text-slate-700">
            <FiImage size={14} />
            <span>Supported formats: JPG, JPEG, PNG</span>
          </div>
          <div>Maximum size: 2 MB</div>
          <div>Maximum dimensions: 1000 × 1000 px</div>
        </div>
      </div>

      {(error || validationError) && (
        <span className="text-[11.5px] text-red-500">{error ?? validationError}</span>
      )}
    </div>
  );
}
