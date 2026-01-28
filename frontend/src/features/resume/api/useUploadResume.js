import { useMutation } from '@tanstack/react-query';
import api from '../../../utils/axios/axios';

export function useUploadResume() {
  return useMutation({
    mutationFn: async (file) => {
      const formData = new FormData();
      formData.append('file', file);

      const res = await api.post('/resume/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return res.data;
    },
  });
}
