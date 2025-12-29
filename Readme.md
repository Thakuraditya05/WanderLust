# ✈️ Wanderlust

<div align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white" />
  <img src="https://img.shields.io/badge/Mapbox-000000?style=for-the-badge&logo=mapbox&logoColor=white" />
</div>

<br />

**Wanderlust** is a full-stack web application inspired by Airbnb. It allows users to list rental properties, view details, upload images, write reviews, and view property locations on a map. The project follows the **MVC (Model-View-Controller)** architectural pattern and implements secure user authentication and server-side validation.

---

## 🌟 Key Features

* **Property Listings (CRUD):** Users can Create, Read, Update, and Delete property listings.
* **Image Uploads:** Seamless image uploading and storage using **Cloudinary** and **Multer**.
* **Interactive Maps:** Integration with **Mapbox** to display exact property locations (Geocoding).
* **Reviews & Ratings:** Users can leave star ratings and comments on listings.
* **Authentication & Authorization:** * Secure login and signup using **Passport.js**.
    * **Authorization Middleware:** Only the owner of a listing can edit/delete it. Only the author of a review can delete their review.
* **Robust Validation:** Server-side validation using **Joi** to prevent invalid data entry.
* **MVC Architecture:** Clean codebase separating Models, Views, and Routes/Controllers.
* **Flash Messages:** Interactive feedback for success and error actions.

---

## 🛠️ Technologies Used

### Frontend
* **EJS (Embedded JavaScript):** Templating engine for dynamic content.
* **EJS-Mate:** For layouts and partials.
* **Bootstrap 5:** For responsive styling and UI components.
* **Mapbox GL JS:** For rendering interactive maps.

### Backend
* **Node.js:** Runtime environment.
* **Express.js:** Web application framework.
* **Mongoose:** ODM for MongoDB interaction.
* **Joi:** Schema description language and data validator.
* **Passport.js:** Authentication middleware.
* **Connect-Flash:** For temporary messages.

### Cloud & Storage
* **MongoDB Atlas:** Cloud database service.
* **Cloudinary:** Cloud storage for image management.

---

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites
* Node.js installed on your machine.
* A MongoDB Atlas account.
* A Cloudinary account.
* A Mapbox account.

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/Thakuraditya05/WanderLust.git
    cd majorproject
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**
    Create a `.env` file in the root directory and add the following credentials:
    ```env
    CLOUD_NAME=your_cloudinary_cloud_name
    CLOUD_API_KEY=your_cloudinary_api_key
    CLOUD_API_SECRET=your_cloudinary_api_secret
    MAP_TOKEN=your_mapbox_public_token
    ATLASDB_URL=your_mongodb_connection_string
    SECRET=your_session_secret_string
    ```

4.  **Start the application**
    ```bash
    node app.js
    # or
    npm start
    ```

5.  **Visit the App**
    Open your browser and go to `http://localhost:8080`.

---

## 📂 Project Structure

```bash
MAJORPROJECT
├── models/             # Database Schemas (Listing, Review, User)
├── routes/             # Express Routes (listings.js, reviews.js, user.js)
├── public/             # Static files (CSS, JS, Images)
├── utils/              # Utility functions (WrapAsync, ExpressError)
├── views/              # EJS Templates
│   ├── includes/       # Partials (navbar, footer, flash)
│   ├── layouts/        # Base layout (boilerplate)
│   ├── listings/       # Listing views
│   └── users/          # Auth views
├── app.js              # Entry point
├── cloudConfig.js      # Cloudinary configuration
├── middleware.js       # Auth and Validation Middleware
├── schema.js           # Joi Validation Schemas
└── package.json        # Dependencies
