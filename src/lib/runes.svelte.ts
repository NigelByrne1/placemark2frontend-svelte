import type { User } from "./types/placemark-types";

export const subTitle = $state({ text: "" });
export const loggedInUser = $state({ 
    email: "",
    name: "",
    token: "",
    _id: ""
 });
export const currentPlacemarks = $state({ placemarks: [] });
export const currentCategorys = $state({ categorys: [] });
export const currentUsers = $state({ users: [] as User[] });

export const currentDataSets = $state({
  placemarksByCategory: {
    labels: [],
    datasets: [{ values: [] }]
  },
  placemarksByUser: {
    labels: [],
    datasets: [{ values: [] }]
  }
});
