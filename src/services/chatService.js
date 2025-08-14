// src/services/chatService.js
import axios from "./axiosInstance";

/**
 * Send message to chat (new or existing), chatId included in FormData
 * @param {FormData} formData
 * @returns {Promise<{ chatId: string, messages: Array }>}
 */
export const sendMessage = async (formData) => {
  const response = await axios.post("/chat", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};

/**
 * Get chat by ID
 * @param {string} chatId
 * @returns {Promise<{ messages: Array }>}
 */
// export const getChatById = async (chatId) => {
//   const response = await axios.get(`/chats/${chatId}`);
//   return response.data;
// };
