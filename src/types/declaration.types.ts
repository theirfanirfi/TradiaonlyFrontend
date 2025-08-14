export type Declaration = {
  declaration_id: string;
  declaration_type: "import" | "export";
  schema_details: Record<string, unknown>;
  declaration_schema: Record<string, unknown>;
  process_id: string;
  created_at?: string;
  updated_at?: string;
};


