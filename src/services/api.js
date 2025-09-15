//const API_BASE_URL = 'http://localhost:8000/api';
const API_BASE_URL = "https://reservation-hotel-backend-production.up.railway.app/api";



class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.token = localStorage.getItem('auth_token');
  }

  setToken(token) {
    this.token = token;
    localStorage.setItem('auth_token', token);
  }

  removeToken() {
    this.token = null;
    localStorage.removeItem('auth_token');
  }

  getHeaders() {
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    return headers;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: this.getHeaders(),
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Une erreur est survenue');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Auth methods
  async login(email, password) {
    const response = await this.request('/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    if (response.token) {
      this.setToken(response.token);
    }
    
    return response;
  }

  async register(name, email, password, password_confirmation) {
    const response = await this.request('/register', {
      method: 'POST',
      body: JSON.stringify({ 
        name, 
        email, 
        password, 
        password_confirmation 
      }),
    });
    
    if (response.token) {
      this.setToken(response.token);
    }
    
    return response;
  }

  async logout() {
    const response = await this.request('/logout', {
      method: 'POST',
    });
    
    this.removeToken();
    return response;
  }

  async getProfile() {
    return this.request('/profile');
  }

  // Hotel methods
  async getHotels(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString ? `/hotels?${queryString}` : '/hotels';
    return this.request(endpoint);
  }

  async getHotel(id) {
    return this.request(`/hotels/${id}`);
  }

  async createHotel(hotelData) {
    const isFormData = hotelData instanceof FormData;
    const headers = isFormData 
      ? { 'Authorization': `Bearer ${this.token}` } 
      : this.getHeaders();

    const response = await fetch(`${this.baseURL}/hotels`, {
      method: 'POST',
      headers: headers,
      body: isFormData ? hotelData : JSON.stringify(hotelData)
    });

    const data = await response.json();
    
    if (!response.ok) {
      const error = new Error(data.message || 'Erreur lors de la création de l\'hôtel');
      error.response = data;
      throw error;
    }

    return data;
  }

  async updateHotel(id, hotelData) {
    return this.request(`/hotels/${id}`, {
      method: 'PUT',
      body: JSON.stringify(hotelData),
    });
  }

  async deleteHotel(id) {
    return this.request(`/hotels/${id}`, {
      method: 'DELETE',
    });
  }

  // Reservation methods
  async getReservations() {
    return this.request('/reservations');
  }

  async getReservation(id) {
    return this.request(`/reservations/${id}`);
  }

  async createReservation(reservationData) {
    return this.request('/reservations', {
      method: 'POST',
      body: JSON.stringify(reservationData),
    });
  }

  async updateReservation(id, reservationData) {
    return this.request(`/reservations/${id}`, {
      method: 'PUT',
      body: JSON.stringify(reservationData),
    });
  }

  async deleteReservation(id) {
    return this.request(`/reservations/${id}`, {
      method: 'DELETE',
    });
  }
}

export default new ApiService();
