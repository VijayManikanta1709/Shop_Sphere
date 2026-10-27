# Anime Street Style – E-Commerce


# Working Url : "https://animestreetstyle.onrender.com/" 
## Introduction

Anime Street Style is a modern e-commerce platform inspired by anime culture, offering a seamless shopping experience for anime-themed products. Built with cutting-edge technologies, this application provides an intuitive interface for browsing, viewing details, and purchasing items. The platform features dynamic product generation, a responsive design, and persistent cart functionality to enhance user engagement.

## Tech Stack

- **Frontend Framework**: React
- **Build Tool**: Vite
- **Styling**: Bootstrap, Tailwind CSS
- **Icons**: Bootstrap Icons
- **Routing**: React Router DOM
- **State Management**: Context API (for Cart, Sidebar, and Product management)
- **Data Persistence**: LocalStorage (for persistent cart items)
- **HTTP Client**: Axios (for API calls)

## Features

- **Add to Cart**: Easily add products to the cart with a single click.
- **Sidebar Cart**: Interactive sidebar with open/close animations for managing cart items.
- **Persistent Cart**: Cart items are saved in the browser's local storage for continuity across sessions.
- **Product Details Page**: Detailed view of products with upgraded layout, price box, and gold-coin rupee icon.
- **Responsive Design**: Fully optimized for mobile, laptop, and desktop devices.
- **Modern UI/UX**: Hero section, footer with social links, loading spinners, and anime-themed styling.
- **Dynamic Data**: Products fetched dynamically from the FakeStore API.

## Project Evolution

### Old Version (2022-23)
- **Technology**: Simple HTML, CSS, and JavaScript application.
- **Product Support**: Limited to men's and women's products.
- **UI/UX**: Average design with basic styling.
- **Data Management**: All product data (images, titles, descriptions, prices) were manually added and hardcoded.

### New Version (2025 Upgrade)
- **Technology**: Rebuilt using React + Vite for a modern, efficient frontend.
- **UI/UX Improvements**: Enhanced with Bootstrap and Tailwind CSS for better responsiveness and aesthetics. Redesigned sidebar cart, product cards, hero section, footer, loaders, and overall styling.
- **Product Details**: Upgraded layout with price box, gold-coin rupee icon, and responsive design.
- **Data Source**: Shifted to dynamic data generation using the FakeStore API, eliminating manual data entry.

## API Reference (FakeStore API)

The application utilizes the [FakeStore API](https://fakestoreapi.com/) to fetch product data dynamically. This API provides a variety of product information, including:

- **Title**: Product name.
- **Price**: Product pricing.
- **Description**: Detailed product description.
- **Image**: Product image URL.
- **Category**: Product category (e.g., electronics, clothing).

Example API endpoint: `https://fakestoreapi.com/products`

The API allows for fetching all products or specific categories, enabling a dynamic and scalable product catalog.

## Folder Structure

```
ecommerce/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   └── react.svg
│   ├── components/
│   │   ├── CartItem.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── Product.jsx
│   │   └── SideBar.jsx
│   ├── context/
│   │   ├── CartContext.jsx
│   │   ├── ProductContext.jsx
│   │   └── SideBarContext.jsx
│   ├── img/
│   │   ├── download.jpg
│   │   └── Naruto.png
│   ├── pages/
│   │   ├── Home.jsx
│   │   └── ProductDetails.jsx
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
└── vite.config.js
```

## Installation & Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/anime-street-style-ecommerce.git
   cd anime-street-style-ecommerce
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run the Development Server**:
   ```bash
   npm run dev
   ```

4. **Build for Production**:
   ```bash
   npm run build
   ```

5. **Preview the Production Build**:
   ```bash
   npm run preview
   ```

Ensure you have Node.js and npm installed on your system before proceeding.

## Screenshots

- **Home Page**: [Placeholder - Add screenshot here]
- **Product Details Page**: [Placeholder - Add screenshot here]
- **Sidebar Cart**: [Placeholder - Add screenshot here]
- **Responsive Mobile View**: [Placeholder - Add screenshot here]

*Note: Screenshots will be added once the application is deployed or captured.*

## Future Enhancements

- **User Authentication**: Implement login/signup functionality for personalized experiences.
- **Wishlist Feature**: Allow users to save favorite products.
- **Search and Filters**: Enhance product discovery with search and category filters.
- **Admin Panel**: Create an admin interface for managing products and orders.

  


---

*This project is for educational purposes and demonstrates modern web development practices.*
