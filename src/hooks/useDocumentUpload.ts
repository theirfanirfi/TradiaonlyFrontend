"use client";

import { useState } from "react";
import { DocumentsAPI } from "@/lib/api";

export function useDocumentUpload(processId?: string) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  async function upload(files: File[]) {
    if (!processId || files.length === 0) return;
    setUploading(true);
    setProgress(0);
    try {
      await DocumentsAPI.upload(processId, files, (p) => setProgress(p));
    } finally {
      setUploading(false);
    }
  }

  return { uploading, progress, upload };
}


