import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { AuthService } from './auth';

// إنشاء instance من axios مع إعدادات مخصصة
const createApiClient = (): AxiosInstance => {
  const client = axios.create({
    baseURL: '/api',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // إضافة interceptor للطلبات لإرفاق التوكن تلقائياً
  client.interceptors.request.use(
    (config) => {
      const token = AuthService.getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      
      console.log('API Request:', {
        method: config.method?.toUpperCase(),
        url: config.url,
        headers: config.headers,
        data: config.data
      });
      
      return config;
    },
    (error) => {
      console.error('Request interceptor error:', error);
      return Promise.reject(error);
    }
  );

  // إضافة interceptor للاستجابات للتعامل مع الأخطاء
  client.interceptors.response.use(
    (response: AxiosResponse) => {
      console.log('API Response:', {
        status: response.status,
        statusText: response.statusText,
        data: response.data
      });
      return response;
    },
    (error) => {
      console.error('Response interceptor error:', error);
      
      // إذا كان الخطأ 401 (غير مصرح)، قم بتسجيل الخروج
      if (error.response?.status === 401) {
        console.log('Unauthorized access, logging out...');
        AuthService.logout();
        
        // إعادة توجيه إلى صفحة تسجيل الدخول
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
      }
      
      return Promise.reject(error);
    }
  );

  return client;
};

// إنشاء client للاستخدام العام
export const apiClient = createApiClient();

// إنشاء client مخصص للاتصال المباشر بـ NeoSend API
export const neoSendClient = axios.create({
  baseURL: 'https://neosending.com/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'text/plain',
    'User-Agent': 'NeoSend-Client/1.0'
  },
});

// إضافة interceptor لـ NeoSend client
neoSendClient.interceptors.request.use(
  (config) => {
    const token = AuthService.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    console.log('NeoSend API Request:', {
      method: config.method?.toUpperCase(),
      url: config.url,
      headers: config.headers
    });
    
    return config;
  },
  (error) => {
    console.error('NeoSend request error:', error);
    return Promise.reject(error);
  }
);

neoSendClient.interceptors.response.use(
  (response) => {
    console.log('NeoSend API Response:', {
      status: response.status,
      statusText: response.statusText,
      data: response.data
    });
    return response;
  },
  (error) => {
    console.error('NeoSend response error:', error);
    return Promise.reject(error);
  }
);

// دوال مساعدة للاستخدام السهل
export const api = {
  // طلبات GET
  get: <T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return apiClient.get(url, config);
  },
  
  // طلبات POST
  post: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return apiClient.post(url, data, config);
  },
  
  // طلبات PUT
  put: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return apiClient.put(url, data, config);
  },
  
  // طلبات DELETE
  delete: <T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return apiClient.delete(url, config);
  },
  
  // طلبات PATCH
  patch: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return apiClient.patch(url, data, config);
  }
};

// دوال للتعامل مع NeoSend API مباشرة
export const neoSendApi = {
  // طلبات GET
  get: <T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return neoSendClient.get(url, config);
  },
  
  // طلبات POST
  post: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return neoSendClient.post(url, data, config);
  },
  
  // طلبات PUT
  put: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return neoSendClient.put(url, data, config);
  },
  
  // طلبات DELETE
  delete: <T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return neoSendClient.delete(url, config);
  }
};

export default apiClient;
