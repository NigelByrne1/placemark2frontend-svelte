import axios from "axios";
import type { Session, User, Category, Placemark } from "$lib/types/placemark-types"
import { loggedInUser, currentPlacemarks, currentCategorys, currentUsers } from "$lib/runes.svelte";
import { computeByCategory, computeByUser } from "./placemark-utils";


export const placemarkService = {
  baseUrl: "http://localhost:3000",


  async signup(user: User): Promise<boolean> {
    try {
      const response = await axios.post(`${this.baseUrl}/api/users`, user);
      return response.status >= 200 && response.status < 300;
    } catch (error) {
      console.log("Signup error:", error);
      return false;
    }
  },

  async login(email: string, password: string): Promise<Session | null> {
    try {
      const response = await axios.post(`${this.baseUrl}/api/users/authenticate`, {
        email,
        password
      });
      if (response.data.success) {
        axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
        const session: Session = {
          name: response.data.name,
          token: response.data.token,
          _id: response.data._id
        };
        this.saveSession(session, email);
        await this.refreshPlacemarkInfo();
        return session;
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  },


  async getCategorys(token: string): Promise<Category[]> {
    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      const response = await axios.get(this.baseUrl + "/api/categorys");
      return response.data;
    } catch (e) {
      console.log("error fetching categorys:", e);
      return [];
    }
  },

  async addPlacemark(categoryId: string, placemark: Placemark, token: string): Promise<boolean> {
  try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      const response = await axios.post(`${this.baseUrl}/api/categorys/${categoryId}/placemarks`, placemark);
      if (response.status >= 200 && response.status < 300) {
        await this.refreshPlacemarkInfo(); 
        return true;
      }
      return false;
    } catch (e) {
      console.log("error adding placemark:", e);
      return false;
  }
  },

  async addCategory(category: Category, token: string): Promise<boolean> {
  try {
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    const response = await axios.post(`${this.baseUrl}/api/categorys`, category);
    return response.status >= 200 && response.status < 300;
  } catch (e) {
    console.log("error adding category:", e);
    return false;
  }
  },

  async getPlacemarks(token: string): Promise<Placemark[]> {
    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      const response = await axios.get(`${this.baseUrl}/api/placemarks`);
      return response.data;
    } catch (e) {
      console.log("error fetching placemarks:", e);
      return [];
    }
  },

  async getUsers(token: string): Promise<User[]> {
  try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      const response = await axios.get(`${this.baseUrl}/api/users`);
      return response.data;
    } catch (error) {
      console.log("Error fetching users:", error);
      return [];
    }
  },


  async refreshPlacemarkInfo() {
    if (loggedInUser.token) {
      console.log(" Fetching updated placemarks and categorys...");
      
      currentCategorys.categorys = await this.getCategorys(loggedInUser.token);
      currentPlacemarks.placemarks = await this.getPlacemarks(loggedInUser.token);
      currentUsers.users = await this.getUsers(loggedInUser.token); 

      computeByCategory(currentPlacemarks.placemarks, currentCategorys.categorys);
      computeByUser(currentPlacemarks.placemarks, currentCategorys.categorys, currentUsers.users);

      console.log(" Categories:", currentCategorys.categorys);
      console.log(" Placemark:", currentPlacemarks.placemarks);
      console.log(" Users:", currentUsers.users);
    }
  },

  saveSession(session: Session, email: string) {
    loggedInUser.email = email;
    loggedInUser.name = session.name;
    loggedInUser.token = session.token;
    loggedInUser._id = session._id;
    localStorage.donation = JSON.stringify(loggedInUser);
  },

  async restoreSession() {
    const savedLoggedInUser = localStorage.donation;
    if (savedLoggedInUser) {
      const session = JSON.parse(savedLoggedInUser);
      loggedInUser.email = session.email;
      loggedInUser.name = session.name;
      loggedInUser.token = session.token;
      loggedInUser._id = session._id;
    }
    await this.refreshPlacemarkInfo();
  },

  clearSession() {
    currentPlacemarks.placemarks = [];
    currentCategorys.categorys = [];
    loggedInUser.email = "";
    loggedInUser.name = "";
    loggedInUser.token = "";
    loggedInUser._id = "";
    localStorage.removeItem("donation");
  },
}