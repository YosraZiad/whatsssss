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
    tokenType?: string;
    expiresIn?: number;
    refreshToken?: string;
    scope?: string;
    encryptedAccessToken?: string;
    expireInSeconds?: number;
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
    code: number | string;
    message: string;
    details?: string;
  };
}

export class AuthService {
  private static readonly BASE_URL = '/api';
  private static readonly TOKEN_KEY = 'authToken';
  private static readonly REFRESH_TOKEN_KEY = 'refreshToken';
  private static readonly TOKEN_EXPIRY_KEY = 'tokenExpiry';
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

  static saveToken(token: string, refreshToken?: string, expiresIn?: number): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.TOKEN_KEY, token);
      
      if (refreshToken) {
        localStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken);
      }
      
      if (expiresIn) {
        const expiryTime = Date.now() + (expiresIn * 1000);
        localStorage.setItem(this.TOKEN_EXPIRY_KEY, expiryTime.toString());
      }
    }
  }

  static getToken(): string | null {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem(this.TOKEN_KEY);
      
      // تحقق من انتهاء صلاحية التوكن
      if (token && this.isTokenExpired()) {
        console.log('Token expired, attempting refresh...');
        // يمكن هنا محاولة تجديد التوكن تلقائياً
        // this.refreshToken();
      }
      
      return token;
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
      localStorage.removeItem(this.REFRESH_TOKEN_KEY);
      localStorage.removeItem(this.TOKEN_EXPIRY_KEY);
      localStorage.removeItem(this.USER_KEY);
    }
  }

  static getRefreshToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(this.REFRESH_TOKEN_KEY);
    }
    return null;
  }

  static isTokenExpired(): boolean {
    if (typeof window !== 'undefined') {
      const expiryTime = localStorage.getItem(this.TOKEN_EXPIRY_KEY);
      if (expiryTime) {
        return Date.now() > parseInt(expiryTime);
      }
    }
    return false;
  }

  static getTokenExpiryTime(): number | null {
    if (typeof window !== 'undefined') {
      const expiryTime = localStorage.getItem(this.TOKEN_EXPIRY_KEY);
      return expiryTime ? parseInt(expiryTime) : null;
    }
    return null;
  }

  static isAuthenticated(): boolean {
    const token = this.getToken();
    return token !== null && !this.isTokenExpired();
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
