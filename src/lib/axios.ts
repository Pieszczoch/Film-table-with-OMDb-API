import Axios from 'axios';
import qs from 'qs';
import { showNotification } from '@mantine/notifications';
import { API_URL } from '@/consts';

const axios = Axios.create({
  baseURL: `${API_URL}`,
  withCredentials: false,
  paramsSerializer: (params: Record<string, unknown>) => {
    return qs.stringify(params, { arrayFormat: 'brackets' });
  },
});

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 500) {
      showNotification({
        title: 'Error',
        message:
          error?.response?.message ?? error?.response?.data?.message ?? 'Internal server error',
        color: 'red',
      });
      return;
    }
    if (error.response.status === 512) {
      showNotification({
        title: 'Warning',
        message:
          error?.response?.message ?? error?.response?.data?.message ?? 'Update completed but...',
        color: 'orange',
      });
      throw error;
    }
    if (error.response.status === 422) {
      try {
        const errors = error.response.data.errors;
        const messages = Object.values(errors).flat() as string[];
        messages.forEach((message) => {
          showNotification({
            title: 'Error',
            message: message,
            color: 'red',
          });
        });
      } catch (e) {
        showNotification({
          title: 'Error',
          message: error.response.data.message ?? error.message,
          color: 'red',
        });
      }
      throw error;
    }

    showNotification({
      title: 'Error',
      message:
        typeof error.response.data === 'string'
          ? error.response.data
          : (error.response.data.message ?? error.message),
      color: 'red',
    });
    throw error;
  }
);

const unauthAxios = Axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
  withCredentials: true,
});

unauthAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 500) {
      showNotification({
        title: 'Error',
        message: 'Internal server error ',
        color: 'red',
      });
      return;
    }
    if (error.response.status === 401) {
      return;
    }
    if (error.response.status === 422) {
      try {
        const errors = error.response.data.errors;

        const messages = Object.values(errors).flat() as string[];
        messages.forEach((message) => {
          showNotification({
            title: 'Error',
            message: message,
            color: 'red',
          });
        });
      } catch (e) {
        showNotification({
          title: 'Error',
          message: error.response.data.message ?? error.message,
          color: 'red',
        });
      }
      throw error;
    }
    showNotification({
      title: 'Error',
      message: error?.response?.data?.message ?? error?.message ?? 'Internal server error',
      color: 'red',
    });
    throw error;
  }
);
export { axios, unauthAxios };
