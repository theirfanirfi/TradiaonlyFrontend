"use client";

import { useEffect, useRef } from "react";
import { useProcessStore } from "@/stores/processStore";
// import { getWebSocketUrl } from "@/lib/websocket";
import { ProcessAPI } from "@/lib/api";

export function useProcessStatus(processId?: string) {
  const { status, progress, setStatus, setProgress } = useProcessStore();


  const get_process_status = async () => {
    let response = await ProcessAPI.status(processId);
    setStatus(response.status)
    setProgress(response.progress)
  }
  useEffect(() => {
    if (!processId) return;

    get_process_status()
  }, [processId, setProgress, setStatus]);

  return { status, progress };
}


