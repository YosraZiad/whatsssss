import axios from 'axios';

export interface LoginCredentials {
  userNameOrEmailAddress: string;
  password: string;
  rememberMe: boolean;
}

export interface LoginResponse {
  success: boolean;
  result?: {
    accessToken: string;
    encryptedAccessToken: string;
    expireInSeconds: number;
    userId: number;
    user: {
      id: number;
      userName: string;
      name: string;
      surname: string;
      emailAddress: string;
      isActive: boolean;
    };
  };
  error?: {
    code: number;
    message: string;
    details: string;
  };
}

export class AuthService {
  private static readonly BASE_URL = '/api';
  private static readonly TOKEN_KEY = 'authToken';
  private static readonly USER_KEY = 'userInfo';

  static async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      const response = await axios.post(`${this.BASE_URL}/auth/login`, {
        userNameOrEmailAddress: credentials.userNameOrEmailAddress,
        password: credentials.password,
        rememberMe: credentials.rememberMe
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      return response.data;
    } catch (error: any) {
      console.error('AuthService login error:', error);
      throw new Error(
        error.response?.data?.error?.message || 
        'فشل في الاتصال بالخادم'
      );
    }
  }

  static saveToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.TOKEN_KEY, token);
    }
  }

  static getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(this.TOKEN_KEY);
    }
    return null;
  }

  static saveUser(user: any): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    }
  }

  static getUser(): any | null {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem(this.USER_KEY);
      return user ? JSON.parse(user) : null;
    }
    return null;
  }

  static logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.TOKEN_KEY);
      localStorage.removeItem(this.USER_KEY);
    }
  }

  static isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  static getAuthHeaders(): { [key: string]: string } {
    const token = this.getToken();
    return token ? {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    } : {
      'Content-Type': 'application/json'
    };
  }
}

// Axios interceptor لإضافة التوكن تلقائياً
axios.interceptors.request.use(
  (config) => {
    const token = AuthService.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Axios interceptor للتعامل مع انتهاء صلاحية التوكن
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      AuthService.logout();
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);
