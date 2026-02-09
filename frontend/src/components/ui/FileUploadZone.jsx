"use client";

import { useCallback, useState } from "react";
import { Upload, X, FileText } from "lucide-react";
import toast from "react-hot-toast";
import { useAnalysisUsage } from "@/features/analysis/useAnalysisUsage";

export default function FileUploadZone({
  onFileSelect,
  selectedFile,
  onRemove,
  disabled,
}) {
  const [isDragging, setIsDragging] = useState(false);

  const { data: usage, isLoading } = useAnalysisUsage();

  const handleDragIn = useCallback(
    (e) => {
      if (usage?.remaining === 0 || disabled) return;
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(true);
    },
    [usage?.remaining, disabled],
  );

  const handleDrag = useCallback(
    (e) => {
      if (usage?.remaining === 0 || disabled) return;
      e.preventDefault();
      e.stopPropagation();
    },
    [usage?.remaining, disabled],
  );

  const handleDragOut = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      if (usage?.remaining === 0 || disabled) {
        toast.error("Daily analysis limit reached. Please try again tomorrow.");
        return;
      }

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        const file = e.dataTransfer.files[0];

        if (file.type !== "application/pdf") {
          toast.error("Only PDF files are allowed.");
          return;
        }

        if (file.size > 2 * 1024 * 1024) {
          toast.error("Resume must be under 2MB.");
          return;
        }

        onFileSelect(file);
      }
    },
    [onFileSelect, usage?.remaining, disabled],
  );

  const handleFileInput = (e) => {
    if (usage?.remaining === 0)
      return toast.error(
        "Daily analysis limit reached. Please try again tomorrow.",
      );

    if (e.target.files && e.target.files.length > 0) {
      onFileSelect(e.target.files[0]);
    }
    if (e.target.files[0]?.size > 2 * 1024 * 1024) {
      toast.error("Resume must be under 2MB.");
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  return (
    <div className="w-full">
      {!selectedFile ? (
        <div
          onDragEnter={handleDragIn}
          onDragLeave={handleDragOut}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-xl transition-all duration-300 ${
            isDragging
              ? "border-primary bg-primary/5 scale-[1.02]"
              : "border-border hover:border-primary/50 hover:bg-accent/50"
          } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
          ${
            usage?.remaining === 0 || disabled
              ? "opacity-50 cursor-not-allowed pointer-events-none"
              : "cursor-pointer hover:border-primary/50 hover:bg-accent/50"
          }
          `}
        >
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileInput}
            disabled={usage?.remaining === 0 || disabled}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="flex flex-col items-center justify-center py-12 px-6 cursor-pointer"
          >
            <div
              className={`mb-4 p-4 rounded-full bg-primary/10 transition-transform duration-300 ${
                isDragging ? "scale-110" : "group-hover:scale-105"
              }`}
            >
              <Upload className="w-8 h-8 text-primary" />
            </div>
            <p className="text-lg font-medium text-foreground mb-2">
              {isDragging ? "Drop your resume here" : "Upload your resume"}
            </p>
            <p className="text-sm text-muted-foreground mb-1">
              Drag and drop or click to browse
            </p>
            <p className="text-xs text-muted-foreground">
              PDF files only • Max 10MB
            </p>
          </label>
        </div>
      ) : (
        <div className="border border-border rounded-xl p-6 bg-card hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
              <div className="p-3 rounded-lg bg-primary/10">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {selectedFile.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatFileSize(selectedFile.size)}
                </p>
              </div>
            </div>
            <button
              onClick={onRemove}
              disabled={disabled}
              className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Remove file"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
