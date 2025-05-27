import axios from "axios";
import type { Session, User, Category, Placemark } from "$lib/types/placemark-types"

export const placemarkService = {
  baseUrl: "http://localhost:3000",


  async signup(user: User): Promise<boolean> {
    try {
      const response = await axios.post(`${this.baseUrl}/api/users`, user);
      return response.data.success === true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  async login(email: string, password: string): Promise<Session | null> {
    try {
      const response = await axios.post(`${this.baseUrl}/api/users/authenticate`, { email, password });
      if (response.data.success) {
        axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
        const session: Session = {
          name: response.data.name,
          token: response.data.token,
          _id: response.data._id
        };
        return session;
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  },


   async getCategories(): Promise<Category[]> {
    try {
      const response = await axios.get(`${this.baseUrl}/api/categories`);
      return response.data;
    } catch (e) {
      console.log(e);
      return [];
    }
  },

  async addPlacemark(categoryId: string, placemark: Placemark): Promise<boolean> {
    try {
      const response = await axios.post(`${this.baseUrl}/api/categories/${categoryId}/placemarks`, placemark);
      return response.status === 200;
    } catch (e) {
      console.log(e);
      return false;
    }
  },

  async getPlacemarks(): Promise<Placemark[]> {
    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      const response = await axios.get(`${this.baseUrl}/api/placemarks`);
      return response.data;
    } catch (e) {
      console.log(e);
      return [];
    }
  }
};