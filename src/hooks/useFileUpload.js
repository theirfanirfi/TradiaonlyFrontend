import { useState } from "react";

const useFileUpload = (uploadFunction, options = {}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState("");
  const [uploadedCount, setUploadedCount] = useState(0);
  const [totalFiles, setTotalFiles] = useState(0);
  const [error, setError] = useState(null);

  const {
    onSuccess,
    onError,
    onProgress,
    simulate = false,
    autoHideDelay = 3000,
  } = options;

  const simulateUpload = async (files) => {
    setTotalFiles(files.length);
    setUploadedCount(0);
    setUploadProgress(0);

    for (let i = 0; i < files.length; i++) {
      // Simulate file upload delay
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
      
      const currentCount = i + 1;
      const currentProgress = (currentCount / files.length) * 100;
      
      setUploadedCount(currentCount);
      setUploadProgress(currentProgress);
      
      if (onProgress) {
        onProgress(currentProgress, currentCount, files.length);
      }
    }
  };

  const startUpload = async (files) => {
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setUploadStatus("uploading");
    setError(null);
    setUploadProgress(0);
    setUploadedCount(0);
    setTotalFiles(files.length);

    try {
      if (simulate) {
        await simulateUpload(files);
      } else {
        // Real upload using the provided upload function
        const result = await uploadFunction(files, (progress) => {
          setUploadProgress(progress);
          // For single batch upload, we show progress but don't track individual files
          // The uploaded count will be set to total when complete
          if (onProgress) {
            onProgress(progress, progress === 100 ? files.length : 0, files.length);
          }
        });
        
        // Set uploaded count to total when complete
        setUploadedCount(files.length);
        setUploadProgress(100);
      }

      setUploadStatus("success");
      if (onSuccess) {
        onSuccess(files);
      }

      // Auto-hide after delay
      if (autoHideDelay > 0) {
        setTimeout(() => {
          reset();
        }, autoHideDelay);
      }
    } catch (err) {
      console.error("Upload error:", err);
      setUploadStatus("error");
      setError(err);
      if (onError) {
        onError(err);
      }
    }
  };

  const reset = () => {
    setIsUploading(false);
    setUploadStatus("");
    setUploadProgress(0);
    setUploadedCount(0);
    setTotalFiles(0);
    setError(null);
  };

  return {
    isUploading,
    uploadProgress,
    uploadStatus,
    uploadedCount,
    totalFiles,
    error,
    startUpload,
    reset,
  };
};

export default useFileUpload;