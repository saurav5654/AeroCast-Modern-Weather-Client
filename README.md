AeroCast is a sleek, responsive, single-page application (SPA) designed to display real-time, current weather data for any location worldwide. This project was built to demonstrate proficiency in modern frontend development, focusing on complex UI implementation, API integration, and strong JavaScript logic.

---

## ✨ Key Features

* **Real-Time Data Fetching:** Fetches and displays current temperature, weather condition, wind speed, and humidity using an external REST API.
* **Intuitive City Search:** Allows users to dynamically search for any city, updating the main dashboard instantly.
* **Modern UI/UX Implementation:** Features a highly modern, two-column layout with smooth **CSS Gradients** (for the stats card), custom typography (Poppins), and strong visual hierarchy.
* **Dynamic UI Elements:** Updates the main weather icon based on the current weather condition using API-provided icon URLs.
* **Robust Error Handling:** Provides user-friendly feedback if the searched city is not found or if the API request fails (e.g., "No matching location found.").
* **Simulated Hourly Forecast:** Includes a simulated hourly forecast list to showcase component-based rendering and data manipulation skills (requires the `/forecast.json` endpoint for real data, currently simulated with `/current.json`).

---

## 🛠️ Technology Stack

| Technology | Role in Project |
| :--- | :--- |
| **HTML5** | Semantic structure and accessibility. |
| **CSS3** | Layout using **Flexbox** and **CSS Grid**, and advanced styling with **CSS Gradients**. |
| **Vanilla JavaScript (ES6+)** | Core application logic, **`async/await`** for API calls, and DOM manipulation. |
| **WeatherAPI** | External REST API used for all weather data fetching (`/current.json` endpoint). |

---

## ⚙️ Project Setup and Installation

Follow these steps to get a copy of the project running on your local machine.

### 1. Prerequisites

You only need a modern web browser.

### 2. File Structure

Ensure your file structure matches this layout:

### 3. Running the Application

1.  **Clone the repository** (once uploaded to GitHub):
    ```bash
    git clone [https://github.com/YourUsername/AeroCast-Modern-Weather-Client.git](https://github.com/YourUsername/AeroCast-Modern-Weather-Client.git)
    ```
2.  **Open the file** `index.html` in your web browser. (Using a VS Code extension like **Live Server** is recommended for local development).

---

## 💡 Customization & API Key

* The current code uses a hardcoded API key (`2d7679ae429545edb1e50816251412`) for demonstration. For best practice, you should replace this with an environment variable or a local configuration file if you plan to extend the project.
* The `hourly-list` is currently simulated. To integrate a true hourly forecast, you would need to use WeatherAPI's `/forecast.json` endpoint and update the `fetchWeatherData` function accordingly.

---
