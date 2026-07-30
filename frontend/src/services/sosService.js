import api from './api';

export const sosService = {
  triggerSOS: async (sosData) => {
    const response = await api.post('/sos', sosData);
    return response.data;
  },

  getSOSRequests: async () => {
    const response = await api.get('/sos');
    return response.data;
  },

  updateSOSStatus: async (id, data) => {
    const response = await api.put(`/sos/${id}`, data);
    return response.data;
  }
};
