import axios from "axios";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://13.210.208.42:8000";


const api = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true,
});

// Attach Bearer token to all requests except login and register
api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('access_token');
    // Only add Authorization header if not login or register
    if (
      token &&
      config.url &&
      !config.url.includes('/api/auth/login') &&
      !config.url.includes('/api/auth/register')
    ) {
      config.headers = config.headers || {};
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

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
    const { data } = await api.get(`/api/declaration/import/${processId}/section_a`);
    return data;
  },
  async update(processId, payload, section) {
    // let formData = {
    //   'section_a': payload
    // }
    // console.log('formData',formData);

    const { data } = await api.put(`/api/declaration/import/${processId}/update/${section}`, payload, {
      headers: { "Content-Type": "application/json" }
    });
    return data;
  },
  async generatePdf(processId) {
    const { data } = await api.post(`/api/declaration/${processId}/generate-pdf`, {});
    return data;
  },
};

const AuthAPI = {
  async register(formData) {
    const  {data}  = await api.post(`/api/auth/register`, formData, {
      headers: { "Content-Type": "application/json" }
    });
    console.log('register api', data);
    return data;
  },
    async login(formData) {
    const  {data}  = await api.post(`/api/auth/login`, formData, {
      headers: { "Content-Type": "application/json" }
    });
    console.log('login api', data);
    return data;
  },
  // async update(itemId, payload) {
  //   const { data } = await api.put(`/api/items/${itemId}`, payload);
  //   return data;
  // },
  // async remove(itemId) {
  //   const { data } = await api.delete(`/api/items/${itemId}`);
  //   return data;
  // },
  // async reassign_hscode(itemId){
  //   const { data } = await api.post(`/api/items/${itemId}/reprocess`);  
  //   console.log('reassign hscode data', data);
  //   return data;
  // }
};

export {
  api,
  ProcessAPI,
  DocumentsAPI,
  ItemsAPI,
  DeclarationAPI,
  AuthAPI
};