[![placemark](https://i.ibb.co/ZzhQHp9x/placemark.png)](logo-placemark)


# Placemark Frontend (SvelteKit)

This project is the **frontend implementation** of the Placemark web application, built using **SvelteKit**. It connects to a pre-built Hapi backend from Assignment 1, offering an intuitive, dynamic, and responsive interface for managing placemarks categorized by location and type.

Users can register, log in, add placemarks (with name, description, category, and coordinates), and visualize them on an interactive map.

---

## Features

### User Accounts

- Sign up, login, logout, and session restoration
- JWT-based session persistence using localStorage

### Placemark Management

- Add, view, and delete placemarks
- Add and select categories dynamically
- Input validation and user feedback
- Sanitation of user input using DOMPurify

### Interactive Map

- Leaflet integration to display placemarks on a map
- Popups and auto-centering to latest placemark
- Checkbox filters to show/hide placemarks by category

### Charts & Reporting

- Data visualizations with Frappe Charts
- Includes a **bar chart** for placemarks per category or user
- Includes a **pie chart** for placemark distribution
- Geo-data visualizations using Leaflet

---

## Testing & Data Integrity

- Tested against the existing Hapi backend API
- Runtime validation with TypeScript
- Structured data flow with reactive `$state` stores
