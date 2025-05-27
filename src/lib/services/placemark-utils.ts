import { currentDataSets } from "$lib/runes.svelte";
import type { Category, Placemark, User } from "$lib/types/placemark-types";

export function computeByCategory(placemarks: Placemark[], categories: Category[]) {
  currentDataSets.placemarksByCategory.labels = [];
  currentDataSets.placemarksByCategory.datasets[0].values = [];

  categories.forEach((category) => {
    currentDataSets.placemarksByCategory.labels.push(category.title);
    const count = placemarks.filter(p => p.categoryid === category._id).length;
    currentDataSets.placemarksByCategory.datasets[0].values.push(count);
  });
}

export function computeByUser(placemarks: Placemark[], categories: Category[], users: User[]) {
  currentDataSets.placemarksByUser.labels = [];
  currentDataSets.placemarksByUser.datasets[0].values = [];

  users.forEach((user) => {
    currentDataSets.placemarksByUser.labels.push(`${user.firstName} ${user.lastName}`);
    const userCategoryIds = categories.filter(c => c.userid === user._id).map(c => c._id);
    const count = placemarks.filter(p => userCategoryIds.includes(p.categoryid)).length;
    currentDataSets.placemarksByUser.datasets[0].values.push(count);
  });
}
