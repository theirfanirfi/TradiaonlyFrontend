export type UserProcess = {
  process_id: string;
  user_id?: string;
  process_name: string;
  status: "created" | "extracting" | "understanding" | "generating" | "done" | "error";
  created_at?: string;
  updated_at?: string;
};

export type UserDocument = {
  document_id: string;
  document_name: string;
  document_type: string;
  file_path: string;
  ocr_text?: string;
  llm_response?: unknown;
  process_id: string;
  created_at?: string;
  processed_at?: string | null;
};

export type UserProcessItem = {
  item_id: string;
  process_id: string;
  item_title: string;
  item_description?: string;
  item_type?: string;
  item_weight?: number;
  item_weight_unit?: string;
  item_price?: number;
  item_currency?: string;
  created_at?: string;
  updated_at?: string;
};


