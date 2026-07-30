import api from './api';

export const hospitalService = {
  getHospitals: async () => {
    const response = await api.get('/hospitals');
    return response.data;
  },

  updateBeds: async (id, data) => {
    const response = await api.put(`/hospitals/${id}/beds`, data);
    return response.data;
  }
};
