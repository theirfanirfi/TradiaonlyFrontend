import axios from "axios";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://3.27.231.129:8000";

const api = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Surface backend error messages when present
    if (error?.response?.data?.message) {
      // eslint-disable-next-line no-console
      console.error("API Error:", error.response.data.message);
    }
    return Promise.reject(error);
  }
);

const ProcessAPI = {
  async list() {
    const { data } = await api.get("/api/process/");
    console.log(data);
    return data;
  },
  async create(payload) {
    const formData = new FormData();
    formData.append("name", payload.process_name);
    formData.append("declaration_type", payload.declaration_type);
    const { data } = await api.post("/api/process/create", formData, {
      headers: { "Content-Type": "application/json" }
      }) ;
    return data;
  },
  async get(processId) {
    const { data } = await api.get(`/api/process/${processId}`);
    return data;
  },
  async status(processId) {
    const { data } = await api.get(`/api/process/${processId}/status`);
    return data;
  },
};

const DocumentsAPI = {
  async upload(processId, files, onUploadProgress) {
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    const { data } = await api.post(`/api/documents/upload/${processId}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: (evt) => {
        if (!onUploadProgress || !evt.total) return;
        const progress = Math.round((evt.loaded * 100) / evt.total);
        onUploadProgress(progress);
      },
    });
    console.log('uploading data', data);
    return data;
  },
  async list(processId) {
    const { data } = await api.get(`/api/documents/${processId}`);
    return data;
  },
  async remove(documentId) {
    const { data } = await api.delete(`/api/documents/${documentId}`);
    return data;
  },

  async get_invoice_items(invoiceId){
    const { data } = await api.get(`/api/documents/${invoiceId}/items`);
    console.log('invoice items', data);
    return data;
  },

  async get_invoice_pdf(invoiceId){
    const { data } = await api.get(`/api/documents/${invoiceId}/pdf`, {
      responseType: "blob",
    });
    
    return new Blob([data], { type: "application/pdf" });
  },

  async retry_document_extraction(documentId) {
    const { data } = await api.post(`/api/documents/retry-item-extraction/${documentId}`, {});  
    console.log('retry document extraction data', data);
    return data;
  },


};

const ItemsAPI = {
  async list(processId) {
    const { data } = await api.get(`/api/items/${processId}`);
    return data;
  },
  async update(itemId, payload) {
    const { data } = await api.put(`/api/items/${itemId}`, payload);
    return data;
  },
  async remove(itemId) {
    const { data } = await api.delete(`/api/items/${itemId}`);
    return data;
  },
  async reassign_hscode(itemId){
    const { data } = await api.post(`/api/items/${itemId}/reprocess`);  
    console.log('reassign hscode data', data);
    return data;
  }
};

const DeclarationAPI = {
  async get(processId) {
    const { data } = await api.get(`/api/declaration/${processId}`);
    return data;
  },
  async update(processId, payload) {
    const { data } = await api.put(`/api/declaration/${processId}/update`, payload);
    return data;
  },
  async generatePdf(processId) {
    const { data } = await api.post(`/api/declaration/${processId}/generate-pdf`, {});
    return data;
  },
};

export {
  api,
  ProcessAPI,
  DocumentsAPI,
  ItemsAPI,
  DeclarationAPI,
};