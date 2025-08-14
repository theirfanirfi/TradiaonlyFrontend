"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { DeclarationAPI } from "@/lib/api";

export function useDeclaration(processId?: string) {
  const queryClient = useQueryClient();

  const declarationQuery = useQuery({
    queryKey: ["declaration", processId],
    queryFn: () => DeclarationAPI.get(processId as string),
    enabled: Boolean(processId),
  });

  const updateMutation = useMutation({
    mutationFn: (payload: unknown) => DeclarationAPI.update(processId as string, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["declaration", processId] }),
  });

  const generatePdfMutation = useMutation({
    mutationFn: () => DeclarationAPI.generatePdf(processId as string),
  });

  return { declarationQuery, updateMutation, generatePdfMutation };
}


