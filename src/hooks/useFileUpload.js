import { useState } from "react";

const useFileUpload = (uploadFunction,checkInvoiceStatus, options = {}) => {
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
    autoHideDelay = 0,
  } = options;

  const startUpload = async (files) => {
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setUploadStatus("uploading");
    setError(null);
    setUploadProgress(0);
    setUploadedCount(0);
    setTotalFiles(files.length);

    try {
        // Real upload using the provided upload function
        const result = await uploadFunction(files, (progress) => {
          // setUploadProgress(progress);
          // For single batch upload, we show progress but don't track individual files
          // The uploaded count will be set to total when complete
          // if (onProgress) {
          //   onProgress(progress, progress === 100 ? files.length : 0, files.length);
          // }
        });

        //after each 10 seconds, check the invoice status
        const interval = setInterval(async () => {
          const processStatus = await checkInvoiceStatus();
          if(!processStatus){
          setUploadStatus("error");
          clearInterval(interval);
          reset();
          }


          console.log("Current invoice status:", processStatus);
          if (processStatus.status === "Done") {
            clearInterval(interval);
            setIsUploading(false);
            setUploadStatus(processStatus.status);
            setUploadedCount(files.length);
            setUploadProgress(100);
            onSuccess(files);
            reset();
          }else if (processStatus.status === "Created") {
          
          setUploadStatus(processStatus.status);
          setUploadProgress(10);
          }
          
          else if (processStatus.status === "Extracting") {
          
          setUploadStatus(processStatus.status);
          setUploadProgress(30);
          }else if (processStatus.status === "Understanding") {
          setUploadStatus(processStatus.status);
          setUploadProgress(60);
          }else if (processStatus.status === "Generating") {
          setUploadStatus(processStatus.status);
          setUploadProgress(80);
          }else {
          setUploadStatus("error");
          clearInterval(interval);
          reset();
        }
        }, 10000); // Check every 10 seconds
        
      //   // Set uploaded count to total when complete
      //   setUploadedCount(files.length);
      //   setUploadProgress(100);
      

      // setUploadStatus("success");
      
      // if (onSuccess) {
      //   onSuccess(files);
      // }

      // // Auto-hide after delay
      // if (autoHideDelay > 0) {
      //   setTimeout(() => {
      //     reset();
      //   }, autoHideDelay);
      // }
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